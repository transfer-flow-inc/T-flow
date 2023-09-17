import { TestBed } from '@angular/core/testing';

import { FormatSizeService } from './format-size.service';

describe('FormatSizeService', () => {
  let service: FormatSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0.00 octets', () => {
    expect(service.formatSize(0)).toBe('0.00 octets');
  });

  it('should return 1.00 octets', () => {
    expect(service.formatSize(1)).toBe('1.00 octets');
  });

  it('should return 1.00 Ko', () => {
    expect(service.formatSize(1024)).toBe('1.00 Ko');
  });

  it('should return 1.00 Mo', () => {
    expect(service.formatSize(1048576)).toBe('1.00 Mo');
  });

  it('should return 1.00 Go', () => {
    expect(service.formatSize(1073741824)).toBe('1.00 Go');
  });

});
