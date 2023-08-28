import { TestBed } from '@angular/core/testing';

import { AdminAutorizeGuardService } from './admin-autorize-guard.service';

describe('AdminAutorizeGuardService', () => {
  let service: AdminAutorizeGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAutorizeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
