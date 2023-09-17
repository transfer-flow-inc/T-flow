import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SettingsMyAccountComponent } from './settings-my-account.component';
import { SettingsNavbarComponent } from '../settings-navbar/settings-navbar.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {CookiesService} from "../../services/cookies/cookies.service";
import {Router} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {of, throwError} from "rxjs";
import {environment} from "../../environments/environment";
describe('SettingsMyAccountComponent', () => {
  let component: SettingsMyAccountComponent;
  let fixture: ComponentFixture<SettingsMyAccountComponent>;
  let jwtService: JwtTokenService;
  let cookiesService: CookiesService;
  let router: Router;
  let httpClient: HttpClientService;

  beforeEach( () => {

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
      { provide: JwtTokenService, useValue: mockJwtService },
      { provide: CookiesService, useValue: mockCookiesService },
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
    // Setup the mock
    (jwtService.getAllUserInfos as jest.Mock).mockReturnValue({
      lastName: 'Doe',
      firstName: 'John',
      userEmail: 'john.doe@example.com'
    });

    // Execute the function
    component.getAllUserInfos();

    // Verify behavior
    expect(component.lastNameValue).toBe('Doe');
    expect(component.firstNameValue).toBe('John');
    expect(component.emailValue).toBe('john.doe@example.com');
  });



  it('should call getAllUserInfos if token is found', () => {
    // Setup the mock
    (cookiesService.get as jest.Mock).mockReturnValue('token');
    (jwtService.getAllUserInfos as jest.Mock).mockReturnValue({
      lastName: 'Doe',
      firstName: 'John',
      userEmail: 'test@set.fr'
    });


    component.ngOnInit();
  });

  it('should toggle isUpdateUser', () => {
    component.isUpdateUser = false; // set initial state
    component.toggleUpdateUser(); // call the method
    expect(component.isUpdateUser).toBe(true); // verify that it was toggled to true

    component.toggleUpdateUser(); // call the method again
    expect(component.isUpdateUser).toBe(false); // verify that it was toggled back to false
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
    const mockResponse = { token: 'Update successful' };

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







});
