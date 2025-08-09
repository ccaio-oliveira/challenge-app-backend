import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: Partial<UserService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    userService = {
      findByEmail: jest.fn(),
    };
    jwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should validate user and return user data if credentials are correct', async () => {
    const user = {
      id: 1,
      email: 'test@gmail.com',
      password: 'hashed',
      name: 'Test',
      isAdmin: false,
    };
    (userService.findByEmail as jest.Mock).mockResolvedValue(user);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

    const result = await service.validateUser(user.email, 'plaintext');

    expect(result).toMatchObject({
      id: 1,
      email: 'test@gmail.com',
      name: 'Test',
      isAdmin: false,
    });
  });

  it('should throw if user not found', async () => {
    (userService.findByEmail as jest.Mock).mockResolvedValue(undefined);
    await expect(
      service.validateUser('wrong@email.com', 'pw'),
    ).rejects.toThrow();
  });

  it('should throw if password is invalid', async () => {
    (userService.findByEmail as jest.Mock).mockResolvedValue({
      email: 'a',
      password: 'hash',
    });
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

    await expect(service.validateUser('a', 'pw')).rejects.toThrow();
  });

  it('should return JWT and user on login()', async () => {
    const user = {
      id: 1,
      email: 'a',
      password: 'hash',
      name: 'T',
      isAdmin: false,
    };
    (service as any).validateUser = jest.fn().mockResolvedValue(user);
    (jwtService.sign as jest.Mock).mockReturnValue('jwt.token.here');

    const result = await service.login('a', 'pw');

    expect(result).toMatchObject({
      access_token: 'jwt.token.here',
      user: { id: 1, email: 'a', name: 'T', isAdmin: false },
    });
  });
});
