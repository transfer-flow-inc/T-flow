import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardOneUserComponent} from './dashboard-one-user.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {HttpClient} from "@angular/common/http";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of, throwError} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";

describe('DashboardOneUserComponent', () => {
  let component: DashboardOneUserComponent;
  let fixture: ComponentFixture<DashboardOneUserComponent>;
  let activatedRoute: { params: Observable<{ id: string }> };
  let httpClientService: HttpClientService;
  let flashMessageService: FlashMessageService;
  let router: Router;

  beforeEach(async () => {
    activatedRoute = {
      params: of({id: 'someId'})
    };
    await TestBed.configureTestingModule({
      declarations: [DashboardOneUserComponent, DashboardNavbarComponent],
      providers: [HttpClient, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,
        {provide: ActivatedRoute, useValue: activatedRoute}
      ],
      imports: [HttpClientTestingModule, FontAwesomeTestingModule]
    })
      .compileComponents();

    router = TestBed.inject(Router);
    flashMessageService = TestBed.inject(FlashMessageService);
    httpClientService = TestBed.inject(HttpClientService);
    fixture = TestBed.createComponent(DashboardOneUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get query parameters correctly', () => {
    component.getQueryParams();
    expect(component.userID).toBe('someId');
  });

  it('should set user when getOneUserByID is successful', () => {
    spyOn(httpClientService, 'getOneUserByID').and.returnValue(
      of({id: 1})
    );
    component.getOneUserByID();
    expect(component.user).toEqual({"id": 1});
    expect(component.loading).toBeFalsy();
  });

  it('should set errorMessage to true when getOneUserByID fails', () => {
    spyOn(httpClientService, 'getOneUserByID').and.returnValue(throwError('error'));
    component.getOneUserByID();
    expect(component.errorMessage).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });


  it('should set errorMessage to true when deleteAUserByID fails', () => {
    spyOn(httpClientService, 'deleteAUserByID').and.returnValue(throwError('error'));

    component.userID = 'someId';
    component.deleteAUserByID();

    expect(component.errorMessage).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

});
