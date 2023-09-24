import { TestBed } from '@angular/core/testing';

import { CookiesService } from './cookies.service';
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

  it('should set a cookie', () => {
    const setDateSpy = jest.spyOn(Date.prototype, 'setTime');
    const originalDocumentCookie = Object.getOwnPropertyDescriptor(document, 'cookie');
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: '',
    });

    service.set('testName', 'testValue', 1);

    expect(setDateSpy).toHaveBeenCalled();

    expect(document.cookie).toContain('testName=testValue');
    expect(document.cookie).toContain('expires=');
    expect(document.cookie).toContain('path=/');
    expect(document.cookie).toContain('SameSite=Strict');

    Object.defineProperty(document, 'cookie', originalDocumentCookie || {});
  });

  it('should get a cookie value by name', () => {
    const originalDocumentCookie = Object.getOwnPropertyDescriptor(document, 'cookie');

    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'testName=testValue; otherName=otherValue',
    });

    const cookieValue = service.get('testName');
    expect(cookieValue).toBe('testValue');

    Object.defineProperty(document, 'cookie', originalDocumentCookie || {});
  });

  it('should return an empty string if the cookie does not exist', () => {
    const originalDocumentCookie = Object.getOwnPropertyDescriptor(document, 'cookie');

    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'otherName=otherValue',
    });

    const cookieValue = service.get('testName');
    expect(cookieValue).toBe('');

    Object.defineProperty(document, 'cookie', originalDocumentCookie || {});
  });

  it('should remove leading spaces from cookie', () => {
    let cookie = '   myCookie=cookieValue';

    while(cookie.startsWith(' ')) {
      cookie = cookie.substring(1);
    }

    expect(cookie).toEqual('myCookie=cookieValue');
  });

  it('should trim leading spaces from cookie', () => {
    document.cookie = ' ; another=cookieValue;';
    const value = service.get('another');
    expect(value).toBe('cookieValue');
  });

  it('should correctly decode cookie', () => {
    document.cookie = `encoded=${encodeURIComponent('some value')};`;
    const value = service.get('encoded');
    expect(value).toBe('some value');
  });


});
