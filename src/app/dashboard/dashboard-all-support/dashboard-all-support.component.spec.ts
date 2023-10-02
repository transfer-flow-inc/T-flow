import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardAllSupportComponent} from './dashboard-all-support.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {HttpClientService} from "../../../services/http-client/http-client.service";
import {of, throwError} from "rxjs";
import {ThemeService} from "../../../services/theme/theme.service";

describe('DashboardAllSupportComponent', () => {
  let component: DashboardAllSupportComponent;
  let fixture: ComponentFixture<DashboardAllSupportComponent>;
  let httpClientService: HttpClientService;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAllSupportComponent, DashboardNavbarComponent],
      imports: [HttpClientTestingModule],
      providers: [OAuthService, OAuthLogger, UrlHelperService, DateTimeProvider],
    })
      .compileComponents();

    themeService = TestBed.inject(ThemeService);
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
      of({content: [{id: 1}, {id: 2}]})
    );
    component.getAllSupports();
    expect(component.supports.content).toEqual([{id: 1}, {id: 2}]);
    expect(component.isDataFound).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

  it('should set isDataFound to false if support.content.length = 0', () => {
    spyOn(httpClientService, 'getAllSupports').and.returnValue(of({content: []}));

    component.getAllSupports();

    expect(component.isDataFound).toBeFalsy();

  });

  it('should set errorMessage to true when getAllUsers fails', () => {
    spyOn(httpClientService, 'getAllSupports').and.returnValue(throwError('error'));
    component.getAllSupports();
    expect(component.isDataFound).toBeFalsy();
    expect(component.errorMessage).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });


});
