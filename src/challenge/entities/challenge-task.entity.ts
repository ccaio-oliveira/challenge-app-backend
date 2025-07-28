import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Challenge } from "./challenge.entity";
import { ChallengeTaskCompletion } from "./challenge-task-completion.entity";

export enum RecurrenceType {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    SPECIFIC_DATES = 'specific_dates',
    WEEKENDS = 'weekends',
}

@Entity()
export class ChallengeTask {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Challenge, challenge => challenge.tasks, { onDelete: 'CASCADE' })
    challenge: Challenge;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: RecurrenceType })
    recurrenceType: RecurrenceType;

    @Column({ type: 'json', nullable: true })
    recurrenceData: string;

    @Column({ default: false })
    requiredPhoto: boolean;

    @Column({ nullable: true })
    pointsRule: string;

    @OneToMany(() => ChallengeTaskCompletion, completion => completion.task)
    completions: ChallengeTaskCompletion[];
}