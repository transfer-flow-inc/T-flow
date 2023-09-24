import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneSupportComponent } from './dashboard-one-support.component';
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";

describe('DashboardOneSupportComponent', () => {
  let component: DashboardOneSupportComponent;
  let fixture: ComponentFixture<DashboardOneSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardOneSupportComponent, DashboardNavbarComponent ],
      imports: [FontAwesomeTestingModule, RouterTestingModule, HttpClientTestingModule],
      providers: [OAuthService, OAuthLogger, DateTimeProvider, UrlHelperService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardOneSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
