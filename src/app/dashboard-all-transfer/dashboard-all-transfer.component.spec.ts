import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardAllTransferComponent} from './dashboard-all-transfer.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {ActivatedRoute} from "@angular/router";
import {Observable, of, throwError} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {FormatSizeService} from "../../services/format-size-file/format-size.service";
import {faLockOpen, faUnlock} from "@fortawesome/free-solid-svg-icons";

describe('DashboardAllTransferComponent', () => {
  let component: DashboardAllTransferComponent;
  let fixture: ComponentFixture<DashboardAllTransferComponent>;
  let mockActivatedRoute: { params: Observable<{ id: string }> };
  let httpClientService: HttpClientService;
  let formatSizeService: FormatSizeService;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({id: 'someId'})
    };
    await TestBed.configureTestingModule({
      declarations: [DashboardAllTransferComponent, DashboardNavbarComponent],
      imports: [HttpClientTestingModule, FontAwesomeTestingModule, RouterTestingModule],
      providers: [HttpClient, HttpHandler, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ],

    })
      .compileComponents();

    formatSizeService = TestBed.inject(FormatSizeService);
    httpClientService = TestBed.inject(HttpClientService);
    fixture = TestBed.createComponent(DashboardAllTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get query params correctly', () => {
    const routeParamsSpy = spyOn(mockActivatedRoute.params, 'subscribe').and.callThrough();

    component.getQueryParams();

    expect(routeParamsSpy).toHaveBeenCalled();
    expect(component.userID).toEqual('someId');
  });

  it('should set folders when getAllTransfersByUserID is successful', () => {
    spyOn(httpClientService, 'getAllTransfersByUserID').and.returnValue(
      of({content: [{"id": 1}, {"id": 2}]})
    );
    component.getAllTransfersByUserID();
    expect(component.folders).toEqual({"content": [{"id": 1}, {"id": 2}]});
    expect(component.loading).toBeFalsy();
  });

  it('should set isDataFound to false when getAllTransfersByUserID returns null id', () => {
    spyOn(httpClientService, 'getAllTransfersByUserID').and.returnValue(
      of({content: [{id: undefined}]})
    );
    component.getAllTransfersByUserID();
    expect(component.isDataFound).toBeFalsy();
    expect(component.loading).toBeFalsy();
  });

  it('should set errorMessage to true when getAllTransfersByUserID fails', () => {
    spyOn(httpClientService, 'getAllTransfersByUserID').and.returnValue(throwError('error'));
    component.getAllTransfersByUserID();
    expect(component.errorMessage).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

  it('should getUserByID', () => {
    spyOn(httpClientService, 'getOneUserByID').and.returnValue(
      of({id: 1})
    );
    component.getUserByID();
    expect(component.user).toEqual({id: 1});

  });

  it('should return formatted size of folder', () => {
    spyOn(formatSizeService, 'formatSize').and.returnValue('1 MB');
    const size = component.formatSize(1000000);
    expect(size).toEqual('1 MB');

  });

  it('should return good icon is folder is shared', () => {
    const icon = component.isFolderShared(true);
    expect(icon).toEqual(component.lockIcon = faLockOpen);
  });

  it('should return bad icon is folder is not shared', () => {
    const icon = component.isFolderShared(false);
    expect(icon).toEqual(component.lockIcon = faUnlock);
  });

  it('should return false if folder is not expired', () => {
    const expired = component.isFolderExpired(new Date());
    expect(expired).toBeFalsy();
  });

});
