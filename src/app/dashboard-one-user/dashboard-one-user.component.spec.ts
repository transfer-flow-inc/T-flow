import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneUserComponent } from './dashboard-one-user.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DashboardOneUserComponent', () => {
  let component: DashboardOneUserComponent;
  let fixture: ComponentFixture<DashboardOneUserComponent>;
  let activatedRoute: { params: Observable<{ id: string }> };

  beforeEach(async () => {
    activatedRoute = {
    params: of({ id: 'someId' })  // Using RxJS 'of' to create an Observable
    };
    await TestBed.configureTestingModule({
      declarations: [ DashboardOneUserComponent, DashboardNavbarComponent ],
      providers: [HttpClient, OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();

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

});
