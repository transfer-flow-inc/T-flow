import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllSupportComponent } from './dashboard-all-support.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {of, throwError} from "rxjs";

describe('DashboardAllSupportComponent', () => {
  let component: DashboardAllSupportComponent;
  let fixture: ComponentFixture<DashboardAllSupportComponent>;
  let httpClientService: HttpClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardAllSupportComponent, DashboardNavbarComponent ],
      imports: [HttpClientTestingModule],
      providers: [ OAuthService, OAuthLogger, UrlHelperService, DateTimeProvider],
    })
    .compileComponents();

    httpClientService = TestBed.inject(HttpClientService);
    fixture = TestBed.createComponent(DashboardAllSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set users when getAllSupports is successful', () => {
    spyOn(httpClientService, 'getAllSupports').and.returnValue(
      of({ content: [{ id: 1 }, { id: 2 }] })
    );
    component.getAllSupports();
    expect(component.supports.content).toEqual([{ id: 1 }, { id: 2 }]);
    expect(component.isDataFound).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

  it('should set isDataFound to false when getAllUsers returns null id', () => {
    spyOn(httpClientService, 'getAllSupports').and.returnValue(
      of({ content: [{ subject: null }] })
    );
    component.getAllSupports();
    expect(component.isDataFound).toBeFalsy();
    expect(component.loading).toBeFalsy();
  });

  it('should set errorMessage to true when getAllUsers fails', () => {
    spyOn(httpClientService, 'getAllSupports').and.returnValue(throwError('error'));
    component.getAllSupports();
    expect(component.isDataFound).toBeFalsy();
    expect(component.errorMessage).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

});
