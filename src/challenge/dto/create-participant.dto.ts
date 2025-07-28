import { IsDateString, IsNumber } from "class-validator";

export class CreateParticipantDto {
    @IsNumber()
    challenge: number;

    @IsNumber()
    userId: number;
}