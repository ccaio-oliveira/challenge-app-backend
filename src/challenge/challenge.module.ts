import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ChallengeTask } from './entities/challenge-task.entity';
import { ChallengeTaskCompletion } from './entities/challenge-task-completion.entity';
import { ChallengeParticipant } from './entities/challenge-participant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Challenge,
      ChallengeTask,
      ChallengeTaskCompletion,
      ChallengeParticipant
    ]),
    AuthModule,
    PassportModule
  ],
  providers: [ChallengeService],
  controllers: [ChallengeController],
  exports: [TypeOrmModule],
})
export class ChallengeModule {}
