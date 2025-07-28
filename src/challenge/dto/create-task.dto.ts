import { IsEnum, IsOptional, IsString } from "class-validator";
import { RecurrenceType } from "../entities/challenge-task.entity";

export class CreateTaskDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(RecurrenceType)
    recurrenceType: RecurrenceType;

    @IsOptional()
    recurrenceData?: any;

    @IsOptional()
    requiredPhoto?: boolean;

    @IsOptional()
    pointsRule?: string;
}