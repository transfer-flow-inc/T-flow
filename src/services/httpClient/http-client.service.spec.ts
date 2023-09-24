import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { HttpClientService } from './http-client.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {TokenInterface} from "../../interfaces/Token/token-interface";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {CreateFolderInterface} from "../../interfaces/Files/create-folder-interface";
import {Router} from "@angular/router";
import {FlashMessageService} from "../flash-message/flash-message.service";

describe('HttpClientService', () => {
  let service: HttpClientService;
  let httpMock: HttpTestingController;
   let router: Router;
  let flashMessageService: FlashMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider,

      ]
    });
    router = TestBed.inject(Router);
    flashMessageService = TestBed.inject(FlashMessageService);
    service = TestBed.inject(HttpClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to /accueil and show success flash message', fakeAsync(() => {

    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    const flashMessageSpy = spyOn(flashMessageService, 'addMessage');

    service.logout();

    tick();

    expect(navigateSpy).toHaveBeenCalledWith(['/accueil']);
    expect(flashMessageSpy).toHaveBeenCalledWith('Vous vous êtes déconnecté avec succès', 'success', 4000);
  }));


  it('should perform login and return a token', () => {
  const mockToken = { access_token: 'some_token' };
  const url = 'http://example.com/login';
  const email = 'test@example.com';
  const password = 'testPassword';

  service.login(url, email, password).subscribe(token => {
    expect(token).toEqual(mockToken);
  });

  const req = httpMock.expectOne(url);

  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual({ email, password });

  req.flush(mockToken);
});

  it('should perform Google login and return a token', () => {
  const mockToken = { access_token: 'some_google_token' };
  const url = 'http://example.com/login/google';
  const googleSsoInterface = { idToken: 'some_id_token' };

  service.loginWithGoogle(url, googleSsoInterface).subscribe(token => {
    expect(token).toEqual(mockToken);
  });

  const req = httpMock.expectOne(url);

  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(googleSsoInterface);

  req.flush(mockToken);
});


  it('should perform registration and return a token', () => {
  const mockToken = { access_token: 'some_token' };
  const url = 'http://example.com/register';
  const firstName = 'John';
  const lastName = 'Doe';
  const email = 'john.doe@example.com';
  const password = 'password123';

  service.register(url, firstName, lastName, email, password).subscribe(token => {
    expect(token).toEqual(mockToken);
  });

  const req = httpMock.expectOne(url);

  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual({ firstName, lastName, email, password });

  req.flush(mockToken);
});

  it('should send a DELETE request to delete the folder', () => {
  const url = 'http://example.com/folder/1';

  service.deleteFolder(url).subscribe();

  const req = httpMock.expectOne(url);

  expect(req.request.method).toBe('DELETE');

  req.flush({});
});

  it('should delete a user', () => {
    const url = 'http://example.com/folder/1';

    service.deleteUser(url).subscribe();

    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('DELETE');

    req.flush({});

  });

  it('should update the user with PATCH request', () => {
  const mockResponse = { firstName: 'John', lastName: 'Doe' };
  const url = 'http://example.com/user/1';
  const user = { firstName: 'John', lastName: 'Doe' };

  service.updateUser(url, user).subscribe(response => {
    expect(response).toEqual(mockResponse);

  });

  const req = httpMock.expectOne(url);

  expect(req.request.method).toBe('PATCH');

  req.flush(mockResponse);

  });

it('should validate an email with a token', () => {
  const mockResponse = { status: 'Email validated successfully' };
  const url = 'http://example.com/validate-email';
  const token: TokenInterface = { token: 'value' };

  service.validateEmail(url, token).subscribe(response => {
    expect(response).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(url);

  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(token);

  req.flush(mockResponse);
});

it('should get all folders by user ID', () => {
  const mockFolders: FolderInterface[] = [
    { id : '1', url: 'test', uploadedAt : new Date(), expiresAt : new Date(), folderOwnerID : 'test', recipientsEmails : ['test'], files : [], shared : false, accessKey : 'test', folderName : 'test', folderSize : 1, fileCount : 1, folderViews : 1},
    { id : '2', url: 'oui', uploadedAt : new Date(), expiresAt : new Date(),folderOwnerID : 'test', recipientsEmails : ['test'], files : [], shared : false, accessKey : 'test', folderName : 'test', folderSize : 1, fileCount : 1, folderViews : 1}
  ];

  const url = 'http://example.com/folders/user/1';

  service.getAllFolderByUserId(url).subscribe(folders => {
    expect(folders).toEqual(mockFolders);
  });

  const req = httpMock.expectOne(url);

  expect(req.request.method).toBe('GET');

  req.flush(mockFolders);
});

it('should download a folder as a Blob', () => {
  const mockBlob = new Blob(['mock data'], { type: 'application/zip' });

  const url = 'http://example.com/download/folder/1';

  service.downloadFolder(url).subscribe(blob => {
    expect(blob).toEqual(mockBlob);
  });

  const req = httpMock.expectOne(req => req.url === url && req.responseType === 'blob');

  expect(req.request.method).toBe('GET');

  req.flush(mockBlob);
});

it('should create a folder and return it', () => {
  const mockFolder: FolderInterface = { id: '1', folderOwnerID: 'test', folderName: 'New Folder', url : 'test', uploadedAt : new Date(), expiresAt : new Date(), folderSize: 2, folderViews : 3, accessKey : 'test', recipientsEmails : ['test'], files : [], shared : false, fileCount : 3 }; // Mock FolderInterface that you expect from the backend
  const createFolderPayload: CreateFolderInterface = { folderSize : 3, folderName : "name", message : "test", fileCount: 3, recipientsEmails : ['test^', 'esfsef'] }; // Mock CreateFolderInterface that you send to the backend

  const url = 'http://example.com/create/folder';

  service.createFolder(url, createFolderPayload).subscribe(folder => {
    expect(folder).toEqual(mockFolder);
  });

  const req = httpMock.expectOne(url);

  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(createFolderPayload);

  req.flush(mockFolder);
});



  it('should send a DELETE request to delete the user as admin', () => {
  const url = 'http://example.com/admin/user/1';

  service.deleteUserAsAdmin(url).subscribe();

  const req = httpMock.expectOne(url);

  expect(req.request.method).toBe('DELETE');

  req.flush({});
});

it('should send an email', () => {
  const mockResponse = { status: 'Email sent successfully' };
  const url = 'http://example.com/send-email';
  const userEmail = 'user@example.com';
  const subject = 'Test Subject';
  const message = 'Test Message';

  service.sendEmail(url, userEmail, subject, message).subscribe(response => {
    expect(response).toEqual(mockResponse);
  });

  const req = httpMock.expectOne(url);

  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual({ userEmail, subject, message });

  req.flush(mockResponse);
});

  it('should delete a User by his ID', () => {

    const url = 'http://example.com/user/1';

    service.deleteAUserByID(url).subscribe();

    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('DELETE');

    req.flush({});


  });

  it('should delete a transfer by his ID', () => {

    const url = 'http://example.com/transfer/1';

    service.deleteATransferByID(url).subscribe();

    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('DELETE');

    req.flush({});

  });


});
