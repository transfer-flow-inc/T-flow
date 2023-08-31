import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {NavbarComponent} from "./navbar/navbar.component";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {OAuthModule} from "angular-oauth2-oidc";


describe('AppComponent', () => {


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        OAuthModule.forRoot()
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
      ],
      providers: [NavbarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  test('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
