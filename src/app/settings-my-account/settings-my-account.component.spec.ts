import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SettingsMyAccountComponent} from './settings-my-account.component';
import {SettingsNavbarComponent} from '../settings-navbar/settings-navbar.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {CookiesService} from "../../services/cookies/cookies.service";
import {Router} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {of, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import mock = jest.mock;

describe('SettingsMyAccountComponent', () => {
  let component: SettingsMyAccountComponent;
  let fixture: ComponentFixture<SettingsMyAccountComponent>;
  let jwtService: JwtTokenService;
  let cookiesService: CookiesService;
  let router: Router;
  let httpClient: HttpClientService;

  beforeEach(() => {

    const mockJwtService = {
      getAllUserInfos: jest.fn()
    };
    const mockCookiesService = {
      get: jest.fn()
    }
    const mockRouter = {
      navigate: jest.fn()
    }
    const mockHttpClient = {
      updateUser: jest.fn()
    }
    TestBed.configureTestingModule({
      declarations: [SettingsMyAccountComponent, SettingsNavbarComponent],
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,
        {provide: JwtTokenService, useValue: mockJwtService},
        {provide: CookiesService, useValue: mockCookiesService},
        {provide: HttpClientService, useValue: mockHttpClient},
      ],
    }).compileComponents();

    jwtService = TestBed.inject(JwtTokenService);
    cookiesService = TestBed.inject(CookiesService);
    httpClient = TestBed.inject(HttpClientService);

    fixture = TestBed.createComponent(SettingsMyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user info correctly', () => {
    (jwtService.getAllUserInfos as jest.Mock).mockReturnValue({
      lastName: 'Doe',
      firstName: 'John',
      userEmail: 'john.doe@example.com'
    });

    component.getAllUserInfos();

    expect(component.lastNameValue).toBe('Doe');
    expect(component.firstNameValue).toBe('John');
    expect(component.emailValue).toBe('john.doe@example.com');
  });


  it('should call getAllUserInfos if token is found', () => {
    (cookiesService.get as jest.Mock).mockReturnValue('token');
    (jwtService.getAllUserInfos as jest.Mock).mockReturnValue({
      lastName: ' ',
      firstName: 'John',
      userEmail: 'test@set.fr'
    });


    component.ngOnInit();

    expect(component.asLastname).toBe(false);
  });

  it('should toggle isUpdateUser', () => {
    component.isUpdateUser = false;
    component.toggleUpdateUser();
    expect(component.isUpdateUser).toBe(true);

    component.toggleUpdateUser();
    expect(component.isUpdateUser).toBe(false);
  });

  it('should submit user updates correctly', () => {
    const userUpdate = {
      lastName: 'Doe',
      firstName: 'John',
      email: 'test@test.fr',
      oldPassword: 'oldPassword',
      password: 'password'
    };
    const updateUserUrl = 'http://updateUserUrl.com';
    const mockResponse = {token: 'Update successful'};

    component.userUpdate = userUpdate;

    // Mock the component methods and httpClient method
    jest.spyOn(component, 'createUserUpdateObject').mockReturnValue(userUpdate);
    jest.spyOn(component, 'buildUpdateUserUrl').mockReturnValue(updateUserUrl);
    jest.spyOn(component, 'handleUpdateSuccess');
    jest.spyOn(component, 'handleUpdateError');
    jest.spyOn(httpClient, 'updateUser').mockReturnValue(of(mockResponse));

    component.submitUpdateUser();

    expect(component.createUserUpdateObject).toHaveBeenCalled();
    expect(component.buildUpdateUserUrl).toHaveBeenCalled();
    expect(httpClient.updateUser).toHaveBeenCalledWith(updateUserUrl, userUpdate);
    expect(component.handleUpdateSuccess).toHaveBeenCalledWith(mockResponse);
    expect(component.handleUpdateError).not.toHaveBeenCalled();
  });


  it('should create a user Object', () => {
    const userUpdate = {
      lastName: 'Doe',
      firstName: 'John',
      email: 'test@est.fr',
      oldPassword: 'oldPassword',
      password: 'password'
    };
    component.lastNameValue = 'Doe';
    component.firstNameValue = 'John';
    component.emailValue = 'test@est.fr';
    component.oldPasswordValue = 'oldPassword';
    component.newPasswordValue = 'password';

    const result = component.createUserUpdateObject();
    expect(result).toEqual(userUpdate);


  });

  it('should build user update url', () => {
    component.user.userEmail = 'test@test.fr';
    component.oldPasswordValue = 'oldPassword';

    component.buildUpdateUserUrl();

    expect(component.buildUpdateUserUrl()).toEqual(`${environment.apiURL}user/${component.user.userEmail}?oldPassword=${component.oldPasswordValue}`);

  });

  it('should handle error', () => {
    spyOn(httpClient, 'updateUser').and.returnValue(throwError({error: 'error'}));

    component.submitUpdateUser();


  });


});
