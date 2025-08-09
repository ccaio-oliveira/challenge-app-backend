import { IsBoolean, IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CompleteTaskDto {
  @IsNumber()
  id: number;

  @IsNumber()
  task: number;

  @IsNumber()
  userId: number;

  @IsDateString()
  date: Date;

  @IsBoolean()
  completed: boolean;

  @IsOptional()
  photoUrl?: string;

  @IsOptional()
  points?: number;
}
