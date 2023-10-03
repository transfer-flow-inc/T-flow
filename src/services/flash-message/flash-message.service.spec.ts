import {TestBed} from '@angular/core/testing';
import {FlashMessageService} from './flash-message.service';
import {take} from 'rxjs/operators';

describe('FlashMessageService', () => {
  let service: FlashMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add message and emit it', (done) => {
    service.getMessage().pipe(take(1)).subscribe(flashMessage => {
      expect(flashMessage.message).toEqual('Test Message');
      expect(flashMessage.type).toEqual("success");
      expect(flashMessage.duration).toEqual(4000);
      done();
    });

    service.addMessage('Test Message', "success", 4000);
  });

  it('should handle string type correctly', (done) => {
    service.getMessage().pipe(take(1)).subscribe(flashMessage => {
      expect(flashMessage.message).toEqual('String Type Message');
      expect(flashMessage.type).toEqual("error");
      expect(flashMessage.duration).toEqual(5000);
      done();
    });

    service.addMessage('String Type Message', 'error', 5000);
  });

  it('should delete flash message', () => {
    const flashMessage = { message: 'Test Message', type: "success", duration: 4000 };
    service.deleteFlashMessage(flashMessage);
    expect(flashMessage.message).toEqual('');
    expect(flashMessage.type).toEqual('');
    expect(flashMessage.duration).toEqual(0);
  });

  it('should add message', () => {
    spyOn(service, 'addMessage');
    service.addMessage('Test Message', "success", 4000);

    expect(service.addMessage).toHaveBeenCalled();

  });

  it('should call next on messageSubject with correct flash message', () => {
    const mockMessage = 'Test Message';
    const mockType = 'success';
    const mockDuration = 4000;

    // Spy on the messageSubject's next method
    spyOn(service['messageSubject'], 'next');

    // Call the addMessage function
    service.addMessage(mockMessage, mockType, mockDuration);

    // Expect the next method of messageSubject to have been called with the correct value
    expect(service['messageSubject'].next).toHaveBeenCalledWith({
        message: mockMessage,
        type: mockType,
        duration: mockDuration
    });
});


});
