import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientService } from '../../services/httpClient/http-client.service';
import { FlashMessageService } from '../../services/flash-message/flash-message.service';
import { DownloadComponent } from './download.component';

describe('DownloadComponent', () => {
  let component: DownloadComponent;
  let fixture: ComponentFixture<DownloadComponent>;
  let mockActivatedRoute: ActivatedRoute;
  let mockHttpClientService: HttpClientService;
  let mockRouter: Router;
  let mockFlashMessageService: FlashMessageService;

  beforeEach(() => {
    mockActivatedRoute = {
      params: of({ folderUrl: 'sampleFolder', accessKey: 'sampleAccessKey' }),
    } as any;

    mockHttpClientService = {
      downloadFile: jasmine.createSpy('downloadFile').and.returnValue(of({})),
    } as any;

    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    } as any;

    mockFlashMessageService = {
      addMessage: jasmine.createSpy('addMessage'),
    } as any;

    TestBed.configureTestingModule({
      declarations: [DownloadComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HttpClientService, useValue: mockHttpClientService },
        { provide: Router, useValue: mockRouter },
        { provide: FlashMessageService, useValue: mockFlashMessageService }, // Provide a mock for FlashMessageService
      ],
    });

    fixture = TestBed.createComponent(DownloadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Rest of your test cases...
});
