import { TestBed } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";

describe('HttpClientService', () => {
  let service: HttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider]
    });
    service = TestBed.inject(HttpClientService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
