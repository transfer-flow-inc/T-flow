import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ValidateEmailComponent } from './validate-email.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../../services/httpClient/http-client.service';
import { FlashMessageService } from '../../services/flash-message/flash-message.service';
import { of, throwError } from 'rxjs';

describe('ValidateEmailComponent', () => {
  let component: ValidateEmailComponent;
  let fixture: ComponentFixture<ValidateEmailComponent>;
  let router: Router;
  let flashMessageService: FlashMessageService;

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
        { provide: HttpClientService, useValue: mockHttpClientService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    flashMessageService = TestBed.inject(FlashMessageService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ValidateEmailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if user is authenticated', () => {
    mockHttpClientService.isAuthenticated.value = true;
    component.checkIfUserIsAuthenticated();
    expect(component.isConnected).toBe(true);
  });

  it('should verify email successfully', () => {
    mockHttpClientService.validateEmail.mockReturnValue(of(null));
    component.ngOnInit();
    expect(component.isVerified).toBe(true);
  });

  it('should handle failed verification', () => {

  const message = 'Test message';
  const type = 'success';
  const time = 5000;

  spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
  spyOn(flashMessageService, 'addMessage');

  component.handleFailedVerification();

  // Assert
  expect(router.navigate).toHaveBeenCalledWith(['/accueil']);

  });

  it('should call handleFailedVerification if validateEmail sent an error', () => {

    mockHttpClientService.validateEmail.mockReturnValue(throwError(new Error()));
    spyOn(component, 'handleFailedVerification');
    component.ngOnInit();
    expect(component.handleFailedVerification).toHaveBeenCalled();

  });


});
