import { HttpInterceptorService } from './http-interceptor.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { CookiesService } from '../cookies/cookies.service';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;
  let cookiesServiceSpy: jest.Mocked<CookiesService>;

  beforeEach(() => {
    cookiesServiceSpy = {
      get: jest.fn(),
      delete: jest.fn(),
    } as any;
    service = new HttpInterceptorService(cookiesServiceSpy);
  });

  it('should add Authorization header when token is present', () => {
    const request = new HttpRequest('GET', '/api/data');
    const next: HttpHandler = {
      handle: jest.fn().mockReturnValue(of({} as HttpEvent<any>)),
    };

    cookiesServiceSpy.get.mockReturnValue('fake-token');

    service.intercept(request, next).subscribe();

    expect(next.handle).toHaveBeenCalled();

    const interceptedRequest: HttpRequest<any> = (next.handle as jest.Mock).mock.calls[0][0];
    expect(interceptedRequest.headers.has('Authorization')).toBeTruthy();
    expect(interceptedRequest.headers.get('Authorization')).toBe('Bearer fake-token');
  });

  it('should not add Authorization header when token is not present', () => {
    const request = new HttpRequest('GET', '/api/data');
    const next: HttpHandler = {
      handle: jest.fn().mockReturnValue(of({} as HttpEvent<any>)),
    };

    cookiesServiceSpy.get.mockReturnValue('');

    service.intercept(request, next).subscribe();

    expect(next.handle).toHaveBeenCalled();

    const interceptedRequest: HttpRequest<any> = (next.handle as jest.Mock).mock.calls[0][0];
    expect(interceptedRequest.headers.has('Authorization')).toBeFalsy();
  });

  it('should handle 401 error by deleting token and clearing session storage', () => {
    const request = new HttpRequest('GET', '/api/data');
    const next: HttpHandler = {
      handle: jest.fn().mockReturnValue(throwError({ status: 401 })),
    };

    cookiesServiceSpy.get.mockReturnValue('fake-token');

    sessionStorage.clear = jest.fn();

    service.intercept(request, next).subscribe(
      () => {},
      (error) => {
        expect(error.status).toBe(401);
        expect(cookiesServiceSpy.delete).toHaveBeenCalledWith('token');
        expect(sessionStorage.clear).toHaveBeenCalled();
      }
    );
  });
});
