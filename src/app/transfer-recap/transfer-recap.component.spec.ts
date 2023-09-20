import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferRecapComponent } from './transfer-recap.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";

describe('TransferRecapComponent', () => {
  let component: TransferRecapComponent;
  let fixture: ComponentFixture<TransferRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferRecapComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OAuthService, OAuthLogger, UrlHelperService, DateTimeProvider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
