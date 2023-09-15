import { TestBed } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {CreateFolderInterface} from "../../interfaces/Files/create-folder-interface";
import {FlashMessageService} from "../flash-message/flash-message.service";
import {CookiesService} from "../cookies/cookies.service";
import {Router} from "@angular/router";

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,

      ]
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

  it('should delete a user', () => {
    const url = 'http://example.com/folder/1'; // Replace this with your actual API URL

    service.deleteUser(url).subscribe(); // Subscribe to complete the observable

    const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

    expect(req.request.method).toBe('DELETE'); // Expect that the request method should be DELETE

    req.flush({}); // Provide an empty object as the response to complete the request

  });

  it('should update the user with PATCH request', () => {
  const mockResponse = { firstName: 'John', lastName: 'Doe' }; // Mock response that you expect from the backend
  const url = 'http://example.com/user/1'; // Replace this with your actual API URL
  const user = { firstName: 'John', lastName: 'Doe' }; // Replace this with the actual object you use

  service.updateUser(url, user).subscribe(response => {
    expect(response).toEqual(mockResponse); // Check if the service returns the expected mock response

  });

  const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

  expect(req.request.method).toBe('PATCH'); // Expect that the request method should be PATCH

  req.flush(mockResponse); // Provide the mock response as the response to complete the request

  });

it('should validate an email with a token', () => {
  const mockResponse = { status: 'Email validated successfully' }; // Mock response that you expect from the backend
  const url = 'http://example.com/validate-email'; // Replace this with your actual API URL
  const token: TokenInterface = { token: 'value' }; // Replace with your actual TokenInterface object

  service.validateEmail(url, token).subscribe(response => {
    expect(response).toEqual(mockResponse); // Check if the service returns the expected mock response
  });

  const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

  expect(req.request.method).toBe('POST'); // Expect that the request method should be POST
  expect(req.request.body).toEqual(token); // Expect that the request body should contain the provided token

  req.flush(mockResponse); // Provide the mock response as the response to complete the request
});

it('should get all folders by user ID', () => {
  const mockFolders: FolderInterface[] = [
    { id : '1', url: 'test', uploadedAt : new Date(), expiresAt : new Date(), recipientsEmails : ['test'], files : [], shared : false, accessKey : 'test', folderName : 'test', folderSize : 1, fileCount : 1, folderViews : 1},
    { id : '2', url: 'oui', uploadedAt : new Date(), expiresAt : new Date(), recipientsEmails : ['test'], files : [], shared : false, accessKey : 'test', folderName : 'test', folderSize : 1, fileCount : 1, folderViews : 1}
  ]; // Mock FolderInterface array that you expect from the backend

  const url = 'http://example.com/folders/user/1'; // Replace this with your actual API URL

  service.getAllFolderByUserId(url).subscribe(folders => {
    expect(folders).toEqual(mockFolders); // Check if the service returns the expected mock folders
  });

  const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

  expect(req.request.method).toBe('GET'); // Expect that the request method should be GET

  req.flush(mockFolders); // Provide the mock folders as the response to complete the request
});

it('should download a folder as a Blob', () => {
  const mockBlob = new Blob(['mock data'], { type: 'application/zip' }); // Replace the type with the actual type of Blob you expect

  const url = 'http://example.com/download/folder/1'; // Replace this with your actual API URL

  service.downloadFolder(url).subscribe(blob => {
    expect(blob).toEqual(mockBlob); // Check if the service returns the expected Blob
  });

  const req = httpMock.expectOne(req => req.url === url && req.responseType === 'blob');

  expect(req.request.method).toBe('GET'); // Expect that the request method should be GET

  req.flush(mockBlob); // Provide the mock Blob as the response to complete the request
});

it('should create a folder and return it', () => {
  const mockFolder: FolderInterface = { id: '1', folderName: 'New Folder', url : 'test', uploadedAt : new Date(), expiresAt : new Date(), folderSize: 2, folderViews : 3, accessKey : 'test', recipientsEmails : ['test'], files : [], shared : false, fileCount : 3 }; // Mock FolderInterface that you expect from the backend
  const createFolderPayload: CreateFolderInterface = { folderSize : 3, folderName : "name", message : "test", fileCount: 3, recipientsEmails : ['test^', 'esfsef'] }; // Mock CreateFolderInterface that you send to the backend

  const url = 'http://example.com/create/folder'; // Replace this with your actual API URL

  service.createFolder(url, createFolderPayload).subscribe(folder => {
    expect(folder).toEqual(mockFolder); // Check if the service returns the expected mock folder
  });

  const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

  expect(req.request.method).toBe('POST'); // Expect that the request method should be POST
  expect(req.request.body).toEqual(createFolderPayload); // Expect that the request body should contain the provided folder

  req.flush(mockFolder); // Provide the mock folder as the response to complete the request
});



  it('should send a DELETE request to delete the user as admin', () => {
  const url = 'http://example.com/admin/user/1'; // Replace this with your actual API URL

  service.deleteUserAsAdmin(url).subscribe(); // Subscribe to complete the observable

  const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

  expect(req.request.method).toBe('DELETE'); // Expect that the request method should be DELETE

  req.flush({}); // Provide an empty object as the response to complete the request
});

it('should send an email', () => {
  const mockResponse = { status: 'Email sent successfully' }; // Mock response that you expect from the backend
  const url = 'http://example.com/send-email'; // Replace this with your actual API URL
  const userEmail = 'user@example.com';
  const subject = 'Test Subject';
  const message = 'Test Message';

  service.sendEmail(url, userEmail, subject, message).subscribe(response => {
    expect(response).toEqual(mockResponse); // Check if the service returns the expected mock response
  });

  const req = httpMock.expectOne(url); // Expect that one and only one request is made to the provided URL

  expect(req.request.method).toBe('POST'); // Expect that the request method should be POST
  expect(req.request.body).toEqual({ userEmail, subject, message }); // Expect that the request body should contain the provided fields

  req.flush(mockResponse); // Provide the mock response as the response to complete the request
});


});
