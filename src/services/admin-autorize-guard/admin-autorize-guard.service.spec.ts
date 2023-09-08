import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AdminAutorizeGuardService } from './admin-autorize-guard.service';
import { CookiesService } from '../cookies/cookies.service';
import { JwtTokenService } from '../jwt-token/jwt-token.service';

describe('AdminAutorizeGuardService', () => {
  let service: AdminAutorizeGuardService;
  let mockCookiesService: { get: jest.Mock };
  let mockJwtTokenService: { jwtToken: string; setToken: jest.Mock; getUserRole: jest.Mock };
  let mockRouter: { navigate: jest.Mock };

  beforeEach(() => {
    mockCookiesService = {
      get: jest.fn(),
    };

    mockJwtTokenService = {
      jwtToken: '',
      setToken: jest.fn(),
      getUserRole: jest.fn(),
    };

    mockRouter = {
      navigate: jest.fn().mockReturnValue(Promise.resolve(true)),
    };

    TestBed.configureTestingModule({
      providers: [
        AdminAutorizeGuardService,
        { provide: CookiesService, useValue: mockCookiesService },
        { provide: JwtTokenService, useValue: mockJwtTokenService },
        { provide: Router, useValue: mockRouter },
      ],
    });

    service = TestBed.inject(AdminAutorizeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    const next = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    it('should redirect to login if jwtToken is empty', async () => {
      mockJwtTokenService.jwtToken = '';
      const result = service.canActivate(next, state);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/se-connecter']);
      expect(result).toBe(false);
    });

    it('should return true if role is ADMIN', () => {
      mockJwtTokenService.jwtToken = 'someToken';
      mockJwtTokenService.getUserRole.mockReturnValue('ADMIN');
      const result = service.canActivate(next, state);
      expect(result).toBe(true);
    });

    it('should redirect to /accueil if role is USER', () => {
      mockJwtTokenService.jwtToken = 'someToken';
      mockJwtTokenService.getUserRole.mockReturnValue('USER');
      const result = service.canActivate(next, state);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/accueil']);
      expect(result).toBe(false);
    });

    it('should redirect to login for any other roles', () => {
      mockJwtTokenService.jwtToken = 'someToken';
      mockJwtTokenService.getUserRole.mockReturnValue('OTHER_ROLE');
      const result = service.canActivate(next, state);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/se-connecter']);
      expect(result).toBe(false);
    });
  });
});
