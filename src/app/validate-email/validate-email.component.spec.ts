import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientService } from '../../services/httpClient/http-client.service';
import { FlashMessageService } from '../../services/flash-message/flash-message.service';
import {ValidateEmailComponent} from "./validate-email.component";

describe('ValidateEmailComponent', () => {
  let component: ValidateEmailComponent;
  let fixture: ComponentFixture<ValidateEmailComponent>;
  let mockActivatedRoute: ActivatedRoute;
  let mockHttpClientService: HttpClientService;
  let mockRouter: Router;
  let mockFlashMessageService: FlashMessageService;

  beforeEach(() => {
    mockActivatedRoute = {
      params: of({ token : 'sampleToken' }),
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
      declarations: [ValidateEmailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HttpClientService, useValue: mockHttpClientService },
        { provide: Router, useValue: mockRouter },
        { provide: FlashMessageService, useValue: mockFlashMessageService },
      ],
    });

    fixture = TestBed.createComponent(ValidateEmailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
