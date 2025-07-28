import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { CompleteTaskDto } from './dto/complete-task.dto';

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

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getChallenge(@Param('id', ParseIntPipe) id: number) {
        return this.challengeService.findChallengeById(id);
    }

    @Post(':id/tasks')
    @UseGuards(JwtAuthGuard)
    async addTask(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateTaskDto) {
        return this.challengeService.addTaskToChallenge(id, dto);
    }

    @Get(':id/tasks')
    @UseGuards(JwtAuthGuard)
    async listTasks(@Param('id', ParseIntPipe) id: number) {
        return this.challengeService.listTaskOfChallenge(id);
    }

    @Post(':id/participants')
    @UseGuards(JwtAuthGuard)
    async addParticipant(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateParticipantDto) {
        return this.challengeService.addParticipant({ ...dto, challenge: id });
    }

    @Get(':id/participants')
    @UseGuards(JwtAuthGuard)
    async listParticipants(@Param('id', ParseIntPipe) id: number) {
        return this.challengeService.listParticipantsOfChallenge(id);
    }

    @Post(':id/tasks/:taskId/completions')
    @UseGuards(JwtAuthGuard)
    async completeTask(
        @Param('id', ParseIntPipe) challengeId: number,
        @Param('taskId', ParseIntPipe) taskId: number,
        @Body() dto: CompleteTaskDto,
    ) {
        return this.challengeService.completeTask({ ...dto, task: taskId });
    }

    @Get(':id/completions/:userId')
    @UseGuards(JwtAuthGuard)
    async listCompletions(
        @Param('id', ParseIntPipe) challengeId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.challengeService.listCompletions(userId, challengeId);
    }
}
