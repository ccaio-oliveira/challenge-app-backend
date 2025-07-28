import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateChallengeDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsDateString()
    startDate: Date;

    @IsDateString()
    endDate: Date;
}