import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { Repository } from 'typeorm';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { ChallengeTask } from './entities/challenge-task.entity';
import { ChallengeTaskCompletion } from './entities/challenge-task-completion.entity';
import { ChallengeParticipant } from './entities/challenge-participant.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { CompleteTaskDto } from './dto/complete-task.dto';

@Injectable()
export class ChallengeService {
    constructor(
        @InjectRepository(Challenge)
        private challengeRepository: Repository<Challenge>,

        @InjectRepository(ChallengeTask)
        private taskRepository: Repository<ChallengeTask>,

        @InjectRepository(ChallengeTaskCompletion)
        private completionRepository: Repository<ChallengeTaskCompletion>,

        @InjectRepository(ChallengeParticipant)
        private participantRepository: Repository<ChallengeParticipant>,
    ) {}

    async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
        const challenge = this.challengeRepository.create(createChallengeDto);
        return this.challengeRepository.save(challenge);
    }

    async findAll(): Promise<Challenge[]> {
        return this.challengeRepository.find({ relations: ['tasks', 'participants'] });
    }

    async findChallengeById(id: number): Promise<Challenge | null> {
        return this.challengeRepository.findOne({
            where: { id },
            relations: ['tasks', 'participants'],
        });
    }

    async addTaskToChallenge(challengeId: number, dto: CreateTaskDto): Promise<ChallengeTask> {
        const challenge = await this.challengeRepository.findOneBy({ id: challengeId });
        if (!challenge) throw new Error('Challenge not found');
        const task = this.taskRepository.create({ ...dto, challenge });
        return this.taskRepository.save(task);
    }

    async listTaskOfChallenge(challengeId: number): Promise<ChallengeTask[]> {
        return this.taskRepository.find({ where: { challenge: { id: challengeId } } });
    }

    async addParticipant(dto: CreateParticipantDto): Promise<ChallengeParticipant> {
        const challenge = await this.challengeRepository.findOneBy({ id: dto.challenge });
        if (!challenge) throw new Error('Challenge not found');

        const participant = this.participantRepository.create({
            challenge: challenge,
            userId: dto.userId,
        });
        
        return this.participantRepository.save(participant);
    }

    async listParticipantsOfChallenge(challengeId: number): Promise<ChallengeParticipant[]> {
        return this.participantRepository.find({
            where: { challenge: { id: challengeId } },
            relations: ['user'],
        });
    }

    async completeTask(dto: CompleteTaskDto): Promise<ChallengeTaskCompletion> {
        const task = await this.taskRepository.findOneBy({ id: dto.task });
        if (!task) throw new Error('Task not found');

        const completion = this.completionRepository.create({
            id: dto.id,
            userId: dto.userId,
            date: dto.date,
            completed: dto.completed,
            photoUrl: dto.photoUrl,
            points: dto.points,
            task: task,
        });
        
        return this.completionRepository.save(completion);
    }

    async listCompletions(userId: number, challengeId: number): Promise<ChallengeTaskCompletion[]> {
        return this.completionRepository.find({
            where: {
                userId,
                task: { challenge: { id: challengeId } },
            },
            relations: ['task'],
        });
    }
}
