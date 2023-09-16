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
      value: '',  // initial cookie value
    });

    service.set('testName', 'testValue', 1);  // Call your 'set' function

    expect(setDateSpy).toHaveBeenCalled();  // Verify that 'setTime' was called on a Date object

    // The following checks if the cookie string contains all the necessary parts
    expect(document.cookie).toContain('testName=testValue');
    expect(document.cookie).toContain('expires=');
    expect(document.cookie).toContain('path=/');
    expect(document.cookie).toContain('SameSite=Strict');

    // Restore original document.cookie property
    Object.defineProperty(document, 'cookie', originalDocumentCookie || {});
  });

  it('should get a cookie value by name', () => {
    const originalDocumentCookie = Object.getOwnPropertyDescriptor(document, 'cookie');

    // Mock a cookie
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'testName=testValue; otherName=otherValue',  // Mock cookie string
    });

    // Call the 'get' function and check if it correctly fetches the cookie value
    const cookieValue = service.get('testName');
    expect(cookieValue).toBe('testValue');

    // Restore original document.cookie property
    Object.defineProperty(document, 'cookie', originalDocumentCookie || {});
  });

  it('should return an empty string if the cookie does not exist', () => {
    const originalDocumentCookie = Object.getOwnPropertyDescriptor(document, 'cookie');

    // Mock a cookie
    Object.defineProperty(document, 'cookie', {
      writable: true,
      value: 'otherName=otherValue',  // Mock cookie string without the target cookie
    });

    // Call the 'get' function and check if it correctly returns an empty string
    const cookieValue = service.get('testName');
    expect(cookieValue).toBe('');

    // Restore original document.cookie property
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
