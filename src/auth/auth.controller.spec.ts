import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService) as jest.Mocked<AuthService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return access token and user on successful login', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const mockResult = {
        access_token: 'jwt.token.here',
        user: { id: 1, email: 'test@example.com', name: 'Test User', isAdmin: false },
      };

      authService.login.mockResolvedValue(mockResult);

      const result = await controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
      expect(result).toEqual(mockResult);
    });

    it('should throw UnauthorizedException when login fails', async () => {
      const loginDto = { email: 'wrong@example.com', password: 'wrongpassword' };
      
      authService.login.mockRejectedValue(new UnauthorizedException('Invalid credentials'));

      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(authService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
    });

    it('should handle empty credentials', async () => {
      const loginDto = { email: '', password: '' };
      
      authService.login.mockRejectedValue(new UnauthorizedException('Invalid credentials'));

      await expect(controller.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(authService.login).toHaveBeenCalledWith('', '');
    });

    it('should pass correct parameters to authService.login', async () => {
      const loginDto = { email: 'user@test.com', password: 'mypassword' };
      const mockResult = {
        access_token: 'mock.jwt.token',
        user: { id: 2, email: 'user@test.com', name: 'User', isAdmin: true },
      };

      authService.login.mockResolvedValue(mockResult);

      await controller.login(loginDto);

      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith('user@test.com', 'mypassword');
    });
  });
});
