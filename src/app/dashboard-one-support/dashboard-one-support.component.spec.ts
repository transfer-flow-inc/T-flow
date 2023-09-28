import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneSupportComponent } from './dashboard-one-support.component';
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {of, throwError} from "rxjs";

describe('DashboardOneSupportComponent', () => {
  let component: DashboardOneSupportComponent;
  let fixture: ComponentFixture<DashboardOneSupportComponent>;
  let httpClientService: HttpClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardOneSupportComponent, DashboardNavbarComponent ],
      imports: [FontAwesomeTestingModule, RouterTestingModule, HttpClientTestingModule],
      providers: [OAuthService, OAuthLogger, DateTimeProvider, UrlHelperService]
    })
    .compileComponents();

    httpClientService = TestBed.inject(HttpClientService);
    fixture = TestBed.createComponent(DashboardOneSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle success', () => {
    spyOn(httpClientService, 'getSupportInfo').and.returnValue(of({data: {}}));
    component.getSupportInfo();
    expect(component.isLoading).toBeFalsy();

  });

  it('should handle error', () => {
    spyOn(httpClientService, 'getSupportInfo').and.returnValue(throwError('error'));
    component.getSupportInfo();
    expect(component.isLoading).toBeFalsy();
  });


});
