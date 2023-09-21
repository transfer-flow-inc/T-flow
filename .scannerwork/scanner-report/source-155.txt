import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllUsersComponent } from './dashboard-all-users.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {of, throwError} from "rxjs";

describe('DashboardAllUsersComponent', () => {
  let component: DashboardAllUsersComponent;
  let fixture: ComponentFixture<DashboardAllUsersComponent>;
  let httpClientService : HttpClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAllUsersComponent, DashboardNavbarComponent],
      imports: [HttpClientTestingModule],
      providers: [HttpClient, HttpHandler, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAllUsersComponent);
    httpClientService = TestBed.inject(HttpClientService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set users when getAllUsers is successful', () => {
    spyOn(httpClientService, 'getAllUsers').and.returnValue(
      of({ content: [{ id: 1 }, { id: 2 }] })
    );
    component.getAllUsers(1);
    expect(component.users.content).toEqual([{ id: 1 }, { id: 2 }]);
    expect(component.isDataFound).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

  it('should set isDataFound to false when getAllUsers returns null id', () => {
    spyOn(httpClientService, 'getAllUsers').and.returnValue(
      of({ content: [{ id: null }] })
    );
    component.getAllUsers(1);
    expect(component.isDataFound).toBeFalsy();
    expect(component.loading).toBeFalsy();
  });

  it('should set errorMessage to true when getAllUsers fails', () => {
    spyOn(httpClientService, 'getAllUsers').and.returnValue(throwError('error'));
    component.getAllUsers(1);
    expect(component.errorMessage).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

});
