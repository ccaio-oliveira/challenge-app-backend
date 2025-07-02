import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        return this.userRepository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({ where: { email } });
        return user || undefined;
    }
}
