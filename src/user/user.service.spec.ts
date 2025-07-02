import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';

const mockUserRepository = () => ({
    create: jest.fn(),
    save: jest.fn(),
});

describe('UserService', () => {
    let service: UserService;
    let userRepository: jest.Mocked<Repository<User>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useFactory: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        userRepository = module.get(getRepositoryToken(User));
    });

    it('should hash the password and create a user', async () => {
        const createUserDto = {
            name: 'Test User',
            email: 'test@example.com',
            password: '123456',
        };

        const createdUser = { ...createUserDto, password: 'hashedPassword' };
        userRepository.create.mockReturnValue(createdUser as any);
        userRepository.save.mockResolvedValue({
            ...createdUser,
            id: 1,
        } as any);

        jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);

        const result = await service.create(createUserDto);

        expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10);
        expect(userRepository.create).toHaveBeenCalledWith({
            ...createUserDto,
            password: 'hashedPassword',
        });
        expect(userRepository.save).toHaveBeenCalledWith(createdUser);
        expect(result.password).toBe('hashedPassword');
        expect(result.name).toBe('Test User');
        expect(result.email).toBe('test@example.com');
    });
});