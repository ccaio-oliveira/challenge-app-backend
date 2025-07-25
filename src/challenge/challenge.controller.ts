import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('challenges')
export class ChallengeController {
    constructor(private readonly challengeService: ChallengeService) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll() {
        return this.challengeService.findAll();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createChallengeDto: CreateChallengeDto) {
        return this.challengeService.create(createChallengeDto);
    }
}
