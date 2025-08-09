import { Test, TestingModule } from '@nestjs/testing';
import { ChallengeService } from './challenge.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Challenge } from './entities/challenge.entity';

const mockChallengeRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
});

describe('ChallengeService', () => {
  let service: ChallengeService;
  let challengeRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengeService,
        {
          provide: getRepositoryToken(Challenge),
          useFactory: mockChallengeRepository,
        },
      ],
    }).compile();

    service = module.get<ChallengeService>(ChallengeService);
    challengeRepository = module.get(getRepositoryToken(Challenge));
  });

  it('should create a challenge', async () => {
    const dto = { title: 'Test', description: 'Test desc' };
    const challenge = { ...dto, id: 1, createdAt: new Date() };

    challengeRepository.create.mockReturnValue(challenge);
    challengeRepository.save.mockResolvedValue(challenge);

    const result = await service.create(dto);
    expect(result).toEqual(challenge);
  });

  it('should return all challenges', async () => {
    const challenges = [
      { id: 1, title: 'A', description: 'Desc', createdAt: new Date() },
    ];
    challengeRepository.find.mockResolvedValue(challenges);

    const result = await service.findAll();
    expect(result).toEqual(challenges);
  });
});
