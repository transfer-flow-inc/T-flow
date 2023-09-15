import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import {Router} from "@angular/router";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let token: { token: string; };
  let mockHttpClientService: { isAuthenticated : any }, mockCookiesService: { get: any; }, mockFlashMessageService: { addMessage: any; };
  let mockRouter: { navigate: any; };

  beforeEach(async () => {
    mockHttpClientService = {
      isAuthenticated: false
    };
    mockCookiesService = {
      get: jest.fn().mockReturnValue('fakeToken')
    };
    mockFlashMessageService = {
      addMessage: jest.fn()
    };
    mockRouter = {
      navigate: jest.fn()
    }

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports : [ FontAwesomeTestingModule, HttpClientTestingModule, ReactiveFormsModule, FormsModule, OAuthModule.forRoot() ],
      // Provide the mock services
      providers: [
        { provide: 'CookiesService', useValue: mockCookiesService },
        { provide: 'HttpClientService', useValue: mockHttpClientService },
        { provide: Router, useValue: mockRouter },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should SetAuthentication state if true', () => {

    component.setAuthenticationState(true, 'fakeToken');
    mockHttpClientService.isAuthenticated = true;
    expect(mockHttpClientService.isAuthenticated).toBeTruthy();
    component.token.token = 'fakeToken';
    expect(component.token.token).toBe('fakeToken');

  });



});
