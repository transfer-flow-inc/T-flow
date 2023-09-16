import { TestBed, ComponentFixture, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router } from '@angular/router';
import {of, throwError} from 'rxjs';
import { DownloadComponent } from './download.component';
import { HttpClientService } from '../../services/httpClient/http-client.service';
import { FlashMessageService } from '../../services/flash-message/flash-message.service';
import { ThemeServiceService } from '../../services/theme-service/theme-service.service';
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";

describe('DownloadComponent', () => {
  let component: DownloadComponent;
  let fixture: ComponentFixture<DownloadComponent>;
  let httpClientService: HttpClientService;
  let flashMessageService: FlashMessageService;
  let themeService: ThemeServiceService;
  let router: Router;

  beforeEach(async () => {
    Object.defineProperty(window.URL, 'createObjectURL', { value: jest.fn(() => 'mockObjectUrl') });
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      declarations: [ DownloadComponent ],
      providers: [
        HttpClientService,
        FlashMessageService,
        ThemeServiceService,
        OAuthService,
        UrlHelperService,
        OAuthLogger,
        DateTimeProvider,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ folderUrl: 'testFolderUrl', accessKey: 'testAccessKey' })
          }
        }
      ]
    }).compileComponents();



    httpClientService = TestBed.inject(HttpClientService);
    flashMessageService = TestBed.inject(FlashMessageService);
    themeService = TestBed.inject(ThemeServiceService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize folderUrl and accessKey from route params', () => {
  component.ngOnInit();
  expect(component.folderUrl).toBe('testFolderUrl');
  expect(component.accessKey).toBe('testAccessKey');
});

it('should fetch folder details on init', fakeAsync(() => {
  const mockFolderData = { /* your mock folder data here */ };
  spyOn(httpClientService, 'getAFolderByUrl').and.returnValue(of(mockFolderData));
  component.ngOnInit();
  tick();
  expect(component.folder).toBe(mockFolderData);
}));

  it('should download folder and show success message', () => {
    const mockData = { /* your mock folder data here */ };

    spyOn(httpClientService, 'downloadFolder').and.returnValue(of(mockData));
    spyOn(component, 'createABlobAndDownload');
    spyOn(component, 'navigateAndShowFlashMessage');

    component.downloadFolder();

    expect(httpClientService.downloadFolder).toHaveBeenCalled();
    expect(component.createABlobAndDownload).toHaveBeenCalledWith(mockData);
    expect(component.navigateAndShowFlashMessage).toHaveBeenCalledWith('Téléchargement du dossier en cours', 'success', 4000);
  });

  it('should handle error and show error message', () => {
    spyOn(httpClientService, 'downloadFolder').and.returnValue(throwError('error'));
    spyOn(component, 'navigateAndShowFlashMessage');

    component.downloadFolder();

    expect(httpClientService.downloadFolder).toHaveBeenCalled();
    expect(component.navigateAndShowFlashMessage).toHaveBeenCalledWith('Le lien de téléchargement est invalide', 'error', 4000);
  });

  it('should set the correct image path in function of currentThemeSubject', () => {

    component.getCurrentTheme();
    expect(component.imgTheme).toBe('assets/images/logo_dark.png');
    themeService.currentThemeSubject.next('light');
    expect(component.imgTheme).toBe('assets/images/logo_light.png');

  });

  it('should call the navigateAndShowFlashMessage if the folder dont exist', () => {

    spyOn(httpClientService, 'getAFolderByUrl').and.returnValue(throwError({status: 404}));
    spyOn(component, 'navigateAndShowFlashMessage');
    component.ngOnInit();
    expect(component.navigateAndShowFlashMessage).toHaveBeenCalledWith('Le dossier n\'existe pas', 'error', 4000);

  });

  it('should set current theme on init', () => {
  spyOn(themeService.currentThemeSubject, 'subscribe').and.callThrough();
  component.ngOnInit();
  expect(themeService.currentThemeSubject.subscribe).toHaveBeenCalled();
});

it('should create a Blob from data', () => {
  const mockData = new Blob(['some content'], { type: 'application/zip' });
  const result = component.createBlob(mockData);
  expect(result).toEqual(jasmine.any(Blob));  // replace with your assertion library
});

it('should call downloadBlob when createABlobAndDownload is called', () => {
  const mockData = new Blob(['some content'], { type: 'application/zip' });
  spyOn(component, 'downloadBlob');
  component.createABlobAndDownload(mockData);
  expect(component.downloadBlob).toHaveBeenCalledWith(jasmine.any(Blob));
});

it('should correctly format folder size in octets', () => {
    expect(component.formatFolderSize(500)).toBe('500.00 octets');
    expect(component.formatFolderSize(100)).toBe('100.00 octets');
  });

it('should correctly format folder size in kilobytes', () => {
    expect(component.formatFolderSize(1500)).toBe('1.46 Ko');
    expect(component.formatFolderSize(1024)).toBe('1.00 Ko');
  });

  it('should correctly format folder size in megabytes', () => {
    expect(component.formatFolderSize(1500000)).toBe('1.43 Mo');
    expect(component.formatFolderSize(1048576)).toBe('1.00 Mo');
  });

  it('should correctly format folder size in gigabytes', () => {
    expect(component.formatFolderSize(1500000000)).toBe('1.40 Go');
    expect(component.formatFolderSize(1073741824)).toBe('1.00 Go');
  });

  it('should navigate to "/accueil" and show a flash message', async () => {
  // Arrange
  const message = 'Test message';
  const type = 'success';
  const time = 5000;

  spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
  spyOn(flashMessageService, 'addMessage');

  // Act
  await component.navigateAndShowFlashMessage(message, type, time);

  // Assert
  expect(router.navigate).toHaveBeenCalledWith(['/accueil']);
  expect(flashMessageService.addMessage).toHaveBeenCalledWith(message, type, time);
});

  it('should download a Blob when downloadBlob is called', async () => {
    // Create a Blob mock
    const blob = new Blob(['some content'], {type: 'application/zip'});

    // Mock window.URL.createObjectURL to return a fake URL
    const mockObjectUrl = 'blob:http://mock-url';
    Object.defineProperty(window.URL, 'createObjectURL', { value: jest.fn(() => mockObjectUrl) });

    // Mock window.fetch to return a resolved Promise with a blob
    const mockFetchResponse = { blob: () => Promise.resolve(blob) };
    window.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

    // Mock document.createElement to return a fake anchor element
    const mockAnchor = { click: jest.fn(), href: '', download: '' };
    jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor as any);

    // Call the method
    await component.downloadBlob(blob);

    // Verify the mocks were called with the expected arguments
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(window.fetch).toHaveBeenCalledWith(mockObjectUrl);
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(mockAnchor.href).toBe(mockObjectUrl);
    expect(mockAnchor.download).toBe(`${component.folder.folderName}.zip`);
    expect(mockAnchor.click).toHaveBeenCalled();
  });



});
