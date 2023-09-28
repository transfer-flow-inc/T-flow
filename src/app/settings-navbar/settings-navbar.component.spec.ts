import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNavbarComponent } from './settings-navbar.component';
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {CookiesService} from "../../services/cookies/cookies.service";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";

describe('SettingsNavbarComponent', () => {
  let component: SettingsNavbarComponent;
  let fixture: ComponentFixture<SettingsNavbarComponent>;
  let cookiesService: CookiesService;
  let jwtService: JwtTokenService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsNavbarComponent ],
      imports: [FontAwesomeTestingModule],
    })
    .compileComponents();

    cookiesService = TestBed.inject(CookiesService);
    jwtService = TestBed.inject(JwtTokenService);
    fixture = TestBed.createComponent(SettingsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the user token from cookies', () => {
    cookiesService.set('token', 'test', 30);
    expect(cookiesService.get('token')).toEqual('test');
    component.ngOnInit();
  });
});
