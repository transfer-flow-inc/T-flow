import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SettingsAllTransferComponent } from './settings-all-transfer.component';
import { JwtTokenService } from '../../../services/jwt-token/jwt-token.service';
import { HttpClientService } from '../../../services/http-client/http-client.service';
import { of, throwError } from 'rxjs';
import {SettingsNavbarComponent} from "../settings-navbar/settings-navbar.component";
import {FolderInterface} from "../../../interfaces/Files/folder-interface";

describe('SettingsAllTransferComponent', () => {
  let component: SettingsAllTransferComponent;
  let fixture: ComponentFixture<SettingsAllTransferComponent>;
  let mockJwtTokenService: Partial<JwtTokenService>;
  let mockHttpClientService: Partial<HttpClientService>;

  beforeEach(() => {
    mockJwtTokenService = {
      getToken: jest.fn().mockReturnValue('some-token'),
      getUserId: jest.fn().mockReturnValue('user-id'),
    };

    mockHttpClientService = {
      getAllFolderByUserId: jest.fn().mockReturnValue(of([{ id: '1', name: 'folder1' }]))
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SettingsAllTransferComponent, SettingsNavbarComponent],
      providers: [
        { provide: JwtTokenService, useValue: mockJwtTokenService },
        { provide: HttpClientService, useValue: mockHttpClientService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsAllTransferComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize user ID from JwtTokenService', () => {
    component.ngOnInit();
    expect(mockJwtTokenService.getUserId).toHaveBeenCalled();
    expect(component.userId).toBe('user-id');
  });



  it('should set error message when API call fails', () => {
    mockHttpClientService.getAllFolderByUserId = jest.fn().mockReturnValue(throwError('An error occurred'));
    component.ngOnInit();
    expect(component.errorMessage).toBe(true);
  });

  it('should correctly check if a folder is expired', () => {
    const expiredFolder = {
      expiresAt: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    };

    const validFolder = {
      expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString() // 1 day ahead
    };

    const isExpiredFolderExpired = component.checkIfFolderIsExpired(expiredFolder as any);
    const isValidFolderExpired = component.checkIfFolderIsExpired(validFolder as any);

    expect(isExpiredFolderExpired).toBe(true);
    expect(isValidFolderExpired).toBe(false);
  });

  it('should handle empty folder data correctly', () => {
    const emptyData: FolderInterface[] = [];
    component.handleFolders(emptyData);
    expect(component.loading).toBe(false);
    expect(component.allFolder).toEqual([]);
    expect(component.isFolderEmpty).toBe(false);
    expect(component.isDataFound).toBe(true);
  });

  it('should handle valid folder data correctly', () => {
    const validData: FolderInterface[] = [
      {
        id: '1',
        folderOwnerID: '1',
        folderName: 'folder1',
        expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        folderSize: 100,
        folderViews: 100,
        fileCount: 100,
        uploadedAt: new Date(),
        shared: false,
        files: [],
        recipientsEmails: ['test@set.rf'],
        url: 'https://test.com',
        accessKey: 'test',
      },
      {
        id: '2',
        folderOwnerID: '1',
        folderName: 'folder2',
        expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        folderSize: 100,
        folderViews: 100,
        fileCount: 100,
        uploadedAt: new Date(),
        shared: false,
        files: [],
        recipientsEmails: ['test@tset.fr'],
        url: 'https://test.com',
        accessKey: 'test',
      }
    ];
    component.handleFolders(validData);
    expect(component.loading).toBe(false);
    expect(component.allFolder).toEqual(validData);
    expect(component.isFolderEmpty).toBe(false);
    expect(component.isDataFound).toBe(true);
  });

  it('should handle if folder data is null correctly', () => {

    const nullData: FolderInterface[] = [
      {
        id: null,
        folderOwnerID: '1',
        folderName: 'test',
        expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        folderSize: 10,
        folderViews: 100,
        fileCount: 2,
        uploadedAt: new Date(),
        shared: false,
        files: [],
        recipientsEmails: ['tst'],
        url:'http://test.com',
        accessKey:'test',
      }
    ];
    component.handleFolders(nullData);
    expect(component.loading).toBe(false);
    expect(component.allFolder).toEqual(nullData);
    expect(component.isFolderEmpty).toBe(true);
    expect(component.isDataFound).toBe(false);

  });

  it('should delete a folder and remove it from the list when the API call is successful', () => {
    const folder: FolderInterface =  {
      id: '1',
      folderOwnerID: '1',
      folderName: 'folder1',
      expiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      folderSize: 100,
      folderViews: 100,
      fileCount: 100,
      uploadedAt: new Date(),
      shared: false,
      files: [],
      recipientsEmails: ['tes@testf'],
      url: 'https://test.com',
      accessKey: 'test',
    }
    const url = `https://api.transfer-flow.studio/api/v1/folder/${folder.id}`;

    mockHttpClientService.deleteFolder = jest.fn().mockReturnValue(of(null));

    const removeFolderSpy = jest.spyOn(component, 'removeFolderFromList');

    component.deleteFolder(folder);

    expect(mockHttpClientService.deleteFolder).toHaveBeenCalledWith(url);
    expect(removeFolderSpy).toHaveBeenCalledWith(folder);
  });



  it('should return size in Ko', () => {

    const size = 1024;
    const result = component.formatSize(size);
    expect(result).toBe('1.00 Ko');

  });

});
