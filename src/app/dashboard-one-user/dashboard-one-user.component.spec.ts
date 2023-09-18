import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneUserComponent } from './dashboard-one-user.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {ActivatedRoute} from "@angular/router";
import {Observable, of, throwError} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {HttpClientService} from "../../services/httpClient/http-client.service";

describe('DashboardOneUserComponent', () => {
  let component: DashboardOneUserComponent;
  let fixture: ComponentFixture<DashboardOneUserComponent>;
  let activatedRoute: { params: Observable<{ id: string }> };
  let httpClientService: HttpClientService;

  beforeEach(async () => {
    activatedRoute = {
    params: of({ id: 'someId' })  // Using RxJS 'of' to create an Observable
    };
    await TestBed.configureTestingModule({
      declarations: [ DashboardOneUserComponent, DashboardNavbarComponent ],
      providers: [HttpClient, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      imports: [HttpClientTestingModule, FontAwesomeTestingModule]
    })
    .compileComponents();

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
      of({ id: 1 } )
    );
    component.getOneUserByID();
    expect(component.user).toEqual( {"id": 1});
    expect(component.loading).toBeFalsy();
  });

  it('should set errorMessage to true when getOneUserByID fails', () => {
    spyOn(httpClientService, 'getOneUserByID').and.returnValue(throwError('error'));
    component.getOneUserByID();
    expect(component.errorMessage).toBeTruthy();
    expect(component.loading).toBeFalsy();
  });

});
