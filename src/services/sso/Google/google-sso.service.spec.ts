import { TestBed } from '@angular/core/testing';
import { GoogleSsoService } from './google-sso.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClientService } from '../../httpClient/http-client.service';
import { CookiesService } from '../../cookies/cookies.service';
import { Router } from '@angular/router';
import { FlashMessageService } from '../../flash-message/flash-message.service';

// Mocked services
const mockOAuthService = {
  configure: jest.fn(),
  loadDiscoveryDocumentAndTryLogin: jest.fn(),
  initImplicitFlow: jest.fn(),
  hasValidAccessToken: jest.fn(),
  logOut: jest.fn(),
};

const mockHttpClientService = {
  isAuthenticated: {
    next: jest.fn(),
  },
};

const mockCookiesService = {
  get: jest.fn(),
  delete: jest.fn(),
};

const mockRouter = {
  navigate: jest.fn(),
};

const mockFlashMessageService = {
  addMessage: jest.fn(),
};

describe('GoogleSsoService', () => {
  let service: GoogleSsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleSsoService,
        { provide: OAuthService, useValue: mockOAuthService },
        { provide: HttpClientService, useValue: mockHttpClientService },
        { provide: CookiesService, useValue: mockCookiesService },
        { provide: Router, useValue: mockRouter },
        { provide: FlashMessageService, useValue: mockFlashMessageService },
      ],
    });

    service = TestBed.inject(GoogleSsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signInWithGoogle', () => {
    it('should initialize OAuth flow', () => {
      service.signInWithGoogle();
      expect(mockOAuthService.initImplicitFlow).toHaveBeenCalled();
    });
  });

  describe('isLoggedIn', () => {
    it('should check if user is logged in', () => {
      mockOAuthService.hasValidAccessToken.mockReturnValue(true);
      expect(service.isLoggedIn()).toBe(true);
      mockOAuthService.hasValidAccessToken.mockReturnValue(false);
      expect(service.isLoggedIn()).toBe(false);
    });
  });

  describe('signOut', () => {
    it('should sign out the user and navigate to accueil if token exists', async () => {
      mockCookiesService.get.mockReturnValue('someToken');
      await service.signOut();
      expect(mockOAuthService.logOut).toHaveBeenCalled();
      expect(mockCookiesService.delete).toHaveBeenCalledWith('token');
      expect(mockHttpClientService.isAuthenticated.next).toHaveBeenCalledWith(false);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/accueil']);
      expect(mockFlashMessageService.addMessage).toHaveBeenCalledWith(
        'Vous vous êtes déconnecté avec succès',
        'success',
        4000
      );
    });

    it('should do nothing if no token exists', async () => {
      mockCookiesService.get.mockReturnValue(null);
      await service.signOut();
      expect(mockOAuthService.logOut).toHaveBeenCalled();
      expect(mockCookiesService.delete).not.toHaveBeenCalled();
      expect(mockHttpClientService.isAuthenticated.next).not.toHaveBeenCalled();
      expect(mockRouter.navigate).not.toHaveBeenCalled();
      expect(mockFlashMessageService.addMessage).not.toHaveBeenCalled();
    });
  });
});
