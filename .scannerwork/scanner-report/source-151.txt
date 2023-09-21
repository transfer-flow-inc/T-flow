import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesConsentComponent } from './cookies-consent.component';
import {NgcCookieConsentService} from "ngx-cookieconsent";

describe('CookiesConsentComponent', () => {
  let component: CookiesConsentComponent;
  let fixture: ComponentFixture<CookiesConsentComponent>;

  const CookiesServiceStub = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesConsentComponent ],
      providers: [
        {
          provide: NgcCookieConsentService,
          useValue: {CookiesServiceStub}
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookiesConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
