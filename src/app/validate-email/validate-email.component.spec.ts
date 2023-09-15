import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ValidateEmailComponent } from './validate-email.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../../services/httpClient/http-client.service';
import { FlashMessageService } from '../../services/flash-message/flash-message.service';
import { of, throwError } from 'rxjs';

describe('ValidateEmailComponent', () => {
  let component: ValidateEmailComponent;
  let fixture: ComponentFixture<ValidateEmailComponent>;

  const mockRouter = {
    navigate: jest.fn()
  };

  const mockFlashMessageService = {
    addMessage: jest.fn()
  };

  const mockHttpClientService = {
    validateEmail: jest.fn(),
    isAuthenticated: {
      value: false
    }
  };

  const mockActivatedRoute = {
    params: of({ token: 'sampleToken' })
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateEmailComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FlashMessageService, useValue: mockFlashMessageService },
        { provide: HttpClientService, useValue: mockHttpClientService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(ValidateEmailComponent);
    component = fixture.componentInstance;
  });

  it('should verify email successfully', () => {
    mockHttpClientService.validateEmail.mockReturnValue(of(null));
    component.ngOnInit();
    expect(component.isVerified).toBe(true);
  });


});
