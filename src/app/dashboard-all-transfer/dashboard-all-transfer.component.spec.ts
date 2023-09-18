import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAllTransferComponent } from './dashboard-all-transfer.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";

describe('DashboardAllTransferComponent', () => {
  let component: DashboardAllTransferComponent;
  let fixture: ComponentFixture<DashboardAllTransferComponent>;
  let mockActivatedRoute: { params: Observable<{ id: string }> };

  beforeEach(async () => {
    mockActivatedRoute = {
    params: of({ id: 'someId' })  // Using RxJS 'of' to create an Observable
    };
    await TestBed.configureTestingModule({
      declarations: [ DashboardAllTransferComponent, DashboardNavbarComponent ],
       imports: [HttpClientTestingModule, FontAwesomeTestingModule, RouterTestingModule],
      providers: [HttpClient, HttpHandler, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,
        {provide: ActivatedRoute, useValue:  mockActivatedRoute }
      ],

    })
    .compileComponents();

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

});
