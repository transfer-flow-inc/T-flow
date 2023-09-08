import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AutorizeGuardService } from './autorize-guard.service';
import { CookiesService } from '../cookies/cookies.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

describe('AutorizeGuardService', () => {
  let service: AutorizeGuardService;
  let mockCookiesService: { get: jest.Mock; delete: jest.Mock };
  let mockJwtTokenService: { jwtToken: string; setToken: jest.Mock; isTokenExpired: jest.Mock };
  let mockRouter: { navigate: jest.Mock };

  beforeEach(() => {
    mockCookiesService = {
      get: jest.fn(),
      delete: jest.fn(),
    };

    mockJwtTokenService = {
      jwtToken: '',
      setToken: jest.fn(),
      isTokenExpired: jest.fn(),
    };

    mockRouter = {
      navigate: jest.fn().mockReturnValue(Promise.resolve(true)),
    };

    TestBed.configureTestingModule({
      providers: [
        AutorizeGuardService,
        { provide: CookiesService, useValue: mockCookiesService },
        { provide: JwtTokenService, useValue: mockJwtTokenService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    service = TestBed.inject(AutorizeGuardService);
  });

  describe('canActivate', () => {
    const next = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    it('should redirect to login if jwtToken and cookie token are empty', async () => {
      mockJwtTokenService.jwtToken = '';
      mockCookiesService.get.mockReturnValue('');
      const result = await service.canActivate(next, state);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/se-connecter']);
      expect(result).toBe(false);
    });

    it('should redirect to login if token is expired', async () => {
      mockJwtTokenService.jwtToken = 'someToken';
      mockCookiesService.get.mockReturnValue('someToken');
      mockJwtTokenService.isTokenExpired.mockReturnValue(true);
      const result = await service.canActivate(next, state);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/se-connecter']);
      expect(result).toBe(false);
    });

    it('should return true if token exists and is not expired', async () => {
      mockJwtTokenService.jwtToken = 'someToken';
      mockCookiesService.get.mockReturnValue('someToken');
      mockJwtTokenService.isTokenExpired.mockReturnValue(false); // Explicitly returning false
      const result = await service.canActivate(next, state);
      expect(result).toBe(true);
    });

    it('should redirect to login if any other case or error', async () => {
      mockJwtTokenService.jwtToken = '';
      mockCookiesService.get.mockReturnValue('');
      mockJwtTokenService.isTokenExpired.mockImplementation(() => {
        throw new Error('Error');
      });
      const result = await service.canActivate(next, state);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/se-connecter']);
      expect(result).toBe(false);
    });
  });
});
