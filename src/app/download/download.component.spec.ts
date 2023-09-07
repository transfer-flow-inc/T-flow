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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
    httpClientService = TestBed.inject(HttpClientService);
    flashMessageService = TestBed.inject(FlashMessageService);
    themeService = TestBed.inject(ThemeServiceService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with dark theme', () => {
    themeService.currentTheme$ = of('dark');
    component.ngOnInit();
    expect(component.imgTheme).toEqual('assets/images/logo_dark.png');
  });

  it('should initialize with light theme', () => {
    themeService.currentTheme$ = of('light');
    component.ngOnInit();
    expect(component.imgTheme).toEqual('assets/images/logo_light.png');
  });

  it('should handle folder retrieval', () => {
    const mockFolder = {
      folderName: 'TestFolder',
      folderSize: 1024,
      // ...other properties
    };
    spyOn(httpClientService, 'getAFolderByUrl').and.returnValue(of(mockFolder));
    component.ngOnInit();
    expect(component.folder).toEqual(mockFolder);
    expect(component.folderSize).toEqual('1.00 Ko');
  });



  // Add more test cases as required
});
