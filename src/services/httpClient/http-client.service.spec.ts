import { TestBed } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider]
    });
    service = TestBed.inject(HttpClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform login and return a token', () => {
  const mockToken = { access_token: 'some_token' }; // Mock token that you expect from the backend
  const url = 'http://example.com/login'; // Replace this with your actual API URL
  const email = 'test@example.com';
  const password = 'testPassword';

  service.login(url, email, password).subscribe(token => {
    expect(token).toEqual(mockToken); // Check if the service returns the expected mock token
  });

  const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

  expect(req.request.method).toBe('POST'); // Expect that the request method should be POST
  expect(req.request.body).toEqual({ email, password }); // Expect that the request body should contain the provided email and password

  req.flush(mockToken); // Provide the mock token as the response to complete the request
});

  it('should perform Google login and return a token', () => {
  const mockToken = { access_token: 'some_google_token' }; // Mock token that you expect from the backend
  const url = 'http://example.com/login/google'; // Replace this with your actual API URL
  const googleSsoInterface = { idToken: 'some_id_token' }; // Replace this with the actual object you use

  service.loginWithGoogle(url, googleSsoInterface).subscribe(token => {
    expect(token).toEqual(mockToken); // Check if the service returns the expected mock token
  });

  const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

  expect(req.request.method).toBe('POST'); // Expect that the request method should be POST
  expect(req.request.body).toEqual(googleSsoInterface); // Expect that the request body should contain the provided googleSsoInterface object

  req.flush(mockToken); // Provide the mock token as the response to complete the request
});


  it('should perform registration and return a token', () => {
  const mockToken = { access_token: 'some_token' }; // Mock token that you expect from the backend
  const url = 'http://example.com/register'; // Replace this with your actual API URL
  const firstName = 'John';
  const lastName = 'Doe';
  const email = 'john.doe@example.com';
  const password = 'password123';

  service.register(url, firstName, lastName, email, password).subscribe(token => {
    expect(token).toEqual(mockToken); // Check if the service returns the expected mock token
  });

  const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

  expect(req.request.method).toBe('POST'); // Expect that the request method should be POST
  expect(req.request.body).toEqual({ firstName, lastName, email, password }); // Expect that the request body should contain the provided fields

  req.flush(mockToken); // Provide the mock token as the response to complete the request
});

  it('should send a DELETE request to delete the folder', () => {
  const url = 'http://example.com/folder/1'; // Replace this with your actual API URL

  service.deleteFolder(url).subscribe(); // Subscribe to complete the observable

  const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

  expect(req.request.method).toBe('DELETE'); // Expect that the request method should be DELETE

  req.flush({}); // Provide an empty object as the response to complete the request
});


});
