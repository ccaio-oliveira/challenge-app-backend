import { IsNotEmpty } from "class-validator";

export class CreateChallengeDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}