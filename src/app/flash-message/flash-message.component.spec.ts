import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FlashMessageService } from '../../services/flash-message/flash-message.service';
import { FlashMessageComponent } from './flash-message.component';

const mockFlashMessageService = {
  getMessage: jest.fn().mockReturnValue(of({ message: 'Test', type: 'info', duration: 1000 })),
  deleteFlashMessage: jest.fn()
};

describe('FlashMessageComponent', () => {
  let component: FlashMessageComponent;
  let fixture: ComponentFixture<FlashMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashMessageComponent ],
      providers: [
        { provide: FlashMessageService, useValue: mockFlashMessageService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlashMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to getMessage from FlashMessageService', () => {
    expect(mockFlashMessageService.getMessage).toHaveBeenCalled();
  });

  it('should start animation when flash message is received', () => {
    const spy = jest.spyOn(component, 'startAnimation');

    // Trigger ngOnInit to subscribe to the observable.
    component.ngOnInit();

    // It should have started the animation.
    expect(spy).toHaveBeenCalled();
  });

  it('should delete flash message after duration', (done) => {
    mockFlashMessageService.deleteFlashMessage.mockImplementation(() => {
      expect(true).toBeTruthy();
      done();
    });

    // Trigger ngOnInit to subscribe to the observable.
    component.ngOnInit();

    // Here you might need to simulate time passing and call your animation function
  });

  it('should update flashMessage when new message is received', () => {
    component.ngOnInit();
    expect(component.flashMessage.message).toBe('Test');
    expect(component.flashMessage.type).toBe('info');
    expect(component.flashMessage.duration).toBe(1000);
  });
});
