import { TestBed } from '@angular/core/testing';

import { AutorizeGuardService } from './autorize-guard.service';

describe('AutorizeGuardService', () => {
  let service: AutorizeGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
