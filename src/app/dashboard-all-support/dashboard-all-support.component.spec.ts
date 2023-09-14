import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllSupportComponent } from './dashboard-all-support.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";

describe('DashboardAllSupportComponent', () => {
  let component: DashboardAllSupportComponent;
  let fixture: ComponentFixture<DashboardAllSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAllSupportComponent, DashboardNavbarComponent ],
      imports: [HttpClientTestingModule],
      providers: [ OAuthService, OAuthLogger, UrlHelperService, DateTimeProvider],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAllSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
