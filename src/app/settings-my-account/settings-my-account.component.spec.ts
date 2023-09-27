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
import {FlashMessageService} from "../../services/flash-message/flash-message.service";

describe('SettingsMyAccountComponent', () => {
  let component: SettingsMyAccountComponent;
  let fixture: ComponentFixture<SettingsMyAccountComponent>;
  let jwtService: JwtTokenService;
  let cookiesService: CookiesService;
  let router: Router;
  let httpClient: HttpClientService;
  let flashMessageService: FlashMessageService;

  beforeEach(() => {


    TestBed.configureTestingModule({
      declarations: [SettingsMyAccountComponent, SettingsNavbarComponent],
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,
      ],
    }).compileComponents();

    flashMessageService = TestBed.inject(FlashMessageService);
    jwtService = TestBed.inject(JwtTokenService);
    cookiesService = TestBed.inject(CookiesService);
    httpClient = TestBed.inject(HttpClientService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SettingsMyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user info correctly', () => {
    spyOn(jwtService, 'getAllUserInfos').and.returnValue({ email: 'test@test.fr', lastName: 'Doe', firstName: 'John' });

    component.getAllUserInfos();

    expect(component.user).toEqual({ email: 'test@test.fr', lastName: 'Doe', firstName: 'John' });

  });



  it('should toggle isUpdateUser', () => {
    component.isUpdateUser = false;
    component.toggleUpdateUser();
    expect(component.isUpdateUser).toBe(true);

    component.toggleUpdateUser();
    expect(component.isUpdateUser).toBe(false);
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

    expect(component.buildUpdateUserUrl()).toEqual('https://api.transfer-flow.studio/api/v1/user/test@test.fr?oldPassword=oldPassword');

  });

  it('should handle error', () => {
    spyOn(httpClient, 'updateUser').and.returnValue(throwError({error: 'error'}));


    component.submitUpdateUser();

  });

  it('should get storage info correctly', () => {
    spyOn(httpClient, 'getStorageInfo').and.returnValue(of({storageUsed: 100, storageLimit: 1000}));

    component.getStorageInfo();

    expect(component.storageInfo).toEqual({storageUsed: 100, storageLimit: 1000});

  });

 it('should navigate to home and flash message', (done) => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    spyOn(flashMessageService, 'addMessage');

    component.navigateToHomeAndFlashMessage('message', 'type', 5000);

    expect(router.navigate).toHaveBeenCalledWith(['/accueil']);

    router.navigate([]).then(() => {
        expect(flashMessageService.addMessage).toHaveBeenCalledWith('message', 'type', 5000);
        done();
    });
});

 it('should fetch user and storage info if token is present', () => {
    spyOn(cookiesService, 'get').and.returnValue('token');
    spyOn(component, 'getAllUserInfos').and.callThrough(); // Call actual method
    spyOn(component, 'getStorageInfo').and.callThrough(); // Call actual method
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(router.navigate).not.toHaveBeenCalledWith(['/se-connecter']);
    expect(component.getAllUserInfos).toHaveBeenCalled();
    expect(component.getStorageInfo).toHaveBeenCalled();
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

    jest.spyOn(component, 'createUserUpdateObject').mockReturnValue(userUpdate);
    jest.spyOn(component, 'buildUpdateUserUrl').mockReturnValue(updateUserUrl);
    jest.spyOn(component, 'handleUpdateSuccess');
    jest.spyOn(component, 'navigateToHomeAndFlashMessage');
    jest.spyOn(httpClient, 'updateUser').mockReturnValue(of(mockResponse));

    component.submitUpdateUser();

    expect(component.createUserUpdateObject).toHaveBeenCalled();
    expect(component.buildUpdateUserUrl).toHaveBeenCalled();
    expect(httpClient.updateUser).toHaveBeenCalledWith(updateUserUrl, userUpdate);
    expect(component.handleUpdateSuccess).toHaveBeenCalledWith(mockResponse);
    expect(component.navigateToHomeAndFlashMessage).toHaveBeenCalled();
  });



});
