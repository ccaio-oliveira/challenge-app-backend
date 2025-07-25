import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './challenge.entity';
import { Repository } from 'typeorm';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Injectable()
export class ChallengeService {
    constructor(
        @InjectRepository(Challenge)
        private challengeRepository: Repository<Challenge>,
    ) {}

    async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
        const challenge = this.challengeRepository.create(createChallengeDto);
        return this.challengeRepository.save(challenge);
    }

    async findAll(): Promise<Challenge[]> {
        return this.challengeRepository.find({ order: { createdAt: 'DESC' } });
    }
}
