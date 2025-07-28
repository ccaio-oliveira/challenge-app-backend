import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChallengeTask } from "./challenge-task.entity";

@Entity()
export class ChallengeTaskCompletion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ChallengeTask, task => task.completions, { onDelete: 'CASCADE' })
    task: ChallengeTask;

    @Column()
    userId: number;

    @Column({ type: 'date' })
    date: Date;

    @Column({ default: false })
    completed: boolean;

    @Column({ nullable: true })
    photoUrl: string;

    @Column({ nullable: true, type: 'int' })
    points: number;
}