import { TestBed } from '@angular/core/testing';

import { GoogleSsoService } from './google-sso.service';
import {OAuthModule} from "angular-oauth2-oidc";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('GoogleSsoService', () => {
  let service: GoogleSsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [ OAuthModule.forRoot(), HttpClientTestingModule ]
    });
    service = TestBed.inject(GoogleSsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
