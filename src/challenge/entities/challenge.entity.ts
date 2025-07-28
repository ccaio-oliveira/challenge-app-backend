import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ChallengeTask } from "./challenge-task.entity";
import { ChallengeParticipant } from "./challenge-participant.entity";

@Entity()
export class Challenge {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => ChallengeTask, (task) => task.challenge, { cascade: true })
    tasks: ChallengeTask[];

    @OneToMany(() => ChallengeParticipant, (participant) => participant.challenge)
    participants: ChallengeParticipant[];
}