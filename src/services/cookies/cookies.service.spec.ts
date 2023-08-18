import { TestBed } from '@angular/core/testing';

import { CookiesService } from './cookies.service';
import {HttpClientService} from "../httpClient/http-client.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CookiesService', () => {
  let service: CookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CookiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
