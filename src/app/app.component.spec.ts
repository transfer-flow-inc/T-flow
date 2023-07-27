import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {of} from "rxjs";
import {NgcCookieConsentService} from "ngx-cookieconsent";
import {NavbarComponent} from "./navbar/navbar.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";




describe('AppComponent', () => {

  const CookiesServiceStub = {
    popupOpen$: jest.fn(of),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        {
          provide: NgcCookieConsentService,
          useValue: {CookiesServiceStub}
        },
      ]
    }).compileComponents();
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
