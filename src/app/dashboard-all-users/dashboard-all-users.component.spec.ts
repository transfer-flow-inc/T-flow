import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllUsersComponent } from './dashboard-all-users.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('DashboardAllUsersComponent', () => {
  let component: DashboardAllUsersComponent;
  let fixture: ComponentFixture<DashboardAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAllUsersComponent, DashboardNavbarComponent],
      imports: [HttpClientTestingModule],
      providers: [HttpClient, HttpHandler, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
