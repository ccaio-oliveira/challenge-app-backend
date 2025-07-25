import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Controller('challenge')
export class ChallengeController {
    constructor(private readonly challengeService: ChallengeService) {}

    @Get()
    async findAll() {
        return this.challengeService.findAll();
    }

    @Post()
    async create(@Body() createChallengeDto: CreateChallengeDto) {
        return this.challengeService.create(createChallengeDto);
    }
}
