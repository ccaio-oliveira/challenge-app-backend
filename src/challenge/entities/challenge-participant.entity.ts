import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Challenge } from './challenge.entity';

@Entity()
export class ChallengeParticipant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Challenge, challenge => challenge.participants, {
    onDelete: 'CASCADE',
  })
  challenge: Challenge;

  @Column()
  userId: number;

  @CreateDateColumn()
  joinedAt: Date;
}
