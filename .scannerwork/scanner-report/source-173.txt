import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSubscriptionComponent } from './settings-subscription.component';
import {SettingsNavbarComponent} from "../settings-navbar/settings-navbar.component";
import {CookiesService} from "../../services/cookies/cookies.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";

describe('SettingsSubscriptionComponent', () => {
  let component: SettingsSubscriptionComponent;
  let fixture: ComponentFixture<SettingsSubscriptionComponent>;
  let mockCookiesService : any;
  let mockJwtTokenService : any;
  let mockRouter: any;

  beforeEach(async () => {
     mockCookiesService = {
      get: jest.fn()
    };
    mockJwtTokenService = {
      getUserPlan: jest.fn(),
      setToken: jest.fn()
    }
    mockRouter = {
      navigate: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ SettingsSubscriptionComponent, SettingsNavbarComponent ],
      providers: [
        { provide: CookiesService, useValue: mockCookiesService },
        { provide: JwtTokenService, useValue: mockJwtTokenService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call get Token from cookies', () => {
    component.getTokenFromCookies();
  });


  it('should call set user plan', () => {
    component.setUserPlan('token');
  });

  it('should return appropriate plan text', () => {
    expect(component.getReadablePlan('FREE')).toBe("Vous n'avez pas d'abonnement actif");
    expect(component.getReadablePlan('PREMIUM')).toBe('Premium');
    expect(component.getReadablePlan('ULTIMATE')).toBe('Ultimate');
    expect(component.getReadablePlan('UNKNOWN')).toBe('Unspecified');
  });


});
