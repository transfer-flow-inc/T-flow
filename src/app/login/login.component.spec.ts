import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {FontAwesomeTestingModule} from '@fortawesome/angular-fontawesome/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OAuthEvent, OAuthModule, OAuthService} from 'angular-oauth2-oidc';
import {Router} from "@angular/router";
import {HttpClientService} from "../../services/http-client/http-client.service";
import {BehaviorSubject, of, throwError} from "rxjs";
import {CookiesService} from "../../services/cookies/cookies.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {GoogleSsoService} from "../../services/sso/Google/google-sso.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockHttpClientService: { isAuthenticated: any, isAdministrator : any, login: any, loginWithGoogle: any; };
  let mockRouter: { navigate: any; };
  let mockCookiesService: { get: any; delete: any; set: any; };
  let mockFlashMessageService: { addMessage: any; };
  let mockGoogleSsoService: { signInWithGoogle: any; };
  let mockOAuthService: { events: any; getIdentityClaims: any; };
  let httpClientService: HttpClientService;
  let jwtTokenService: JwtTokenService;
  let router: Router;

  beforeEach(async () => {
    mockHttpClientService = {
      isAuthenticated: new BehaviorSubject<boolean>(false),
      isAdministrator: new BehaviorSubject<boolean>(false),
      login: jest.fn(),
      loginWithGoogle: jest.fn()
    };
    jest.spyOn(mockHttpClientService.isAuthenticated, 'next');
    jest.spyOn(mockHttpClientService.isAdministrator, 'next');
    mockFlashMessageService = {
      addMessage: jest.fn()
    }
    mockOAuthService = {
      events: of({type: 'token_received'}),
      getIdentityClaims: jest.fn().mockReturnValue({})
    };
    mockGoogleSsoService = {
      signInWithGoogle: jest.fn()
    }
    mockCookiesService = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
    }
    mockRouter = {
      navigate: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FontAwesomeTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule, OAuthModule.forRoot()],
      providers: [
        {provide: HttpClientService, useValue: mockHttpClientService},
        {provide: Router, useValue: mockRouter},
        {provide: CookiesService, useValue: mockCookiesService},
        {provide: FlashMessageService, useValue: mockFlashMessageService},
        {provide: GoogleSsoService, useValue: mockGoogleSsoService},
        {provide: OAuthService, useValue: mockOAuthService},
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    httpClientService = TestBed.inject(HttpClientService);
    jwtTokenService = TestBed.inject(JwtTokenService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setAuthenticationState if isAuthenticated is true', () => {
    component.setAuthenticationState(true, 'fake-token');
    mockCookiesService.set('token', 'fake-token', 30);
    expect(mockHttpClientService.isAuthenticated.value).toBeTruthy();
  });

  it('should call setAuthenticationState if isAuthenticated is false', () => {
    component.setAuthenticationState(false, '');
    mockCookiesService.delete('token');
    expect(mockHttpClientService.isAuthenticated.value).toBeFalsy();
  });



  it('should call signInWithGoogle on googleSsoService when signInWithGoogle is called', () => {
    component.signInWithGoogle();
    expect(mockGoogleSsoService.signInWithGoogle).toHaveBeenCalled();
  });

  it('should handle OAuthEvent of type "token_received"', () => {

    const fakeToken = {token: 'fake-token'};
    mockHttpClientService.loginWithGoogle.mockReturnValue(of(fakeToken));

    component.ngOnInit();

    expect(mockOAuthService.getIdentityClaims).toHaveBeenCalled();
    expect(mockHttpClientService.loginWithGoogle).toHaveBeenCalled();
    expect(mockHttpClientService.isAuthenticated.next).toHaveBeenCalledWith(true);
    expect(mockCookiesService.set).toHaveBeenCalledWith('token', fakeToken.token, 30);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/accueil']);
    mockFlashMessageService.addMessage('Vous vous êtes connecté avec succès', 'success', 4000);
    expect(mockFlashMessageService.addMessage).toHaveBeenCalledWith('Vous vous êtes connecté avec succès', 'success', 4000);
  });

  it('should handle OAuthEvent of type "token_received" and handle errors', () => {
    const fakeEvent: OAuthEvent = {
      type: 'token_received'
    };
    mockOAuthService.events = of(fakeEvent);
    mockOAuthService.getIdentityClaims = jest.fn().mockReturnValue({});
    mockHttpClientService.loginWithGoogle = jest.fn().mockReturnValue(throwError('fake error'));
    component.ngOnInit();
    expect(mockOAuthService.getIdentityClaims).toHaveBeenCalled();
    expect(mockHttpClientService.loginWithGoogle).toHaveBeenCalled();
    expect(mockHttpClientService.isAuthenticated.next).toHaveBeenCalledWith(false);
  });

  it('should handle 403 error correctly', () => {
    const mockError = {status: 403};

    component.handleLoginError(mockError);

    expect(component.error).toBe("Email ou mot de passe incorrect !");
    expect(mockHttpClientService.isAuthenticated.next).toHaveBeenCalledWith(false);
  });

  it('should handle 423 error correctly', () => {
    const mockError = {status: 423};

    component.handleLoginError(mockError);

    expect(component.error).toBe("Vous devez valider votre compte !");
    expect(mockHttpClientService.isAuthenticated.next).toHaveBeenCalledWith(false);
  });

  it('should handle non-403 error correctly', () => {
    const mockError = {status: 500};

    component.handleLoginError(mockError);
    expect(component.error).toBe("Une erreur est survenue !");
    expect(mockHttpClientService.isAuthenticated.next).toHaveBeenCalledWith(false);
  });

  it('should call handleLoginSuccess on login success', () => {
    mockHttpClientService.login.mockReturnValue(of({token: 'fakeToken'}));
    const handleLoginSuccessSpy = jest.spyOn(component, 'handleLoginSuccess');

    component.login();

    expect(handleLoginSuccessSpy).toHaveBeenCalledWith({token: 'fakeToken'});
  });

  it('should call handleLoginError on login error', () => {
    const mockError = {status: 403};
    mockHttpClientService.login.mockReturnValue(throwError(mockError));
    const handleLoginErrorSpy = jest.spyOn(component, 'handleLoginError');

    component.login();

    expect(handleLoginErrorSpy).toHaveBeenCalledWith(mockError);
  });

  it('should set isAdministrator if user role is ADMIN', () => {
    spyOn(jwtTokenService, 'getUserRole').and.returnValue('ADMIN');
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    const tokenData = {token: 'test'};

    component.handleLoginSuccess(tokenData);

    expect(mockHttpClientService.isAdministrator.value).toBe(true);
    expect(jwtTokenService.getUserRole).toHaveBeenCalled();

});


});
