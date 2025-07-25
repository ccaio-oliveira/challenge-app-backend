import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';

describe('ChallengeController', () => {
  let controller: ChallengeController;
  let service: ChallengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengeController],
      providers: [
        {
          provide: ChallengeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ChallengeController>(ChallengeController);
    service = module.get<ChallengeService>(ChallengeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service.create and return the result', async () => {
    const dto = { title: 'Desafio', description: 'Descrição' };
    const created = { id: 1, ...dto, createdAt: new Date() };

    (service.create as jest.Mock).mockResolvedValue(created);

    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(created);
  });

  it('should call service.findAll and return challenges', async () => {
    const challenges = [
      { id: 1, title: 'A', description: 'B', createdAt: new Date() },
    ];

    (service.findAll as jest.Mock).mockResolvedValue(challenges);

    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(challenges);
  });
});
