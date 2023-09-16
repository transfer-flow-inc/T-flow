import {TestBed} from '@angular/core/testing';
import {FlashMessageService, MessageType} from './flash-message.service';
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
      expect(flashMessage.type).toEqual(MessageType.SUCCESS);
      expect(flashMessage.duration).toEqual(4000);
      done();
    });

    service.addMessage('Test Message', MessageType.SUCCESS, 4000);
  });

  it('should handle string type correctly', (done) => {
    service.getMessage().pipe(take(1)).subscribe(flashMessage => {
      expect(flashMessage.message).toEqual('String Type Message');
      expect(flashMessage.type).toEqual(MessageType.ERROR);
      expect(flashMessage.duration).toEqual(5000);
      done();
    });

    service.addMessage('String Type Message', 'error', 5000);
  });

  it('should delete flash message', () => {
    const flashMessage = { message: 'Test Message', type: MessageType.SUCCESS, duration: 4000 };
    service.deleteFlashMessage(flashMessage);
    expect(flashMessage.message).toEqual('');
    expect(flashMessage.type).toEqual(MessageType.NULL);
    expect(flashMessage.duration).toEqual(0);
  });


  it('should add a message with a given MessageType', (done) => {
    service.getMessage().pipe(take(1)).subscribe(flashMessage => {
      expect(flashMessage.message).toEqual('Hello, world!');
      expect(flashMessage.type).toEqual(MessageType.SUCCESS);
      expect(flashMessage.duration).toEqual(4000);
      done();
    });
    service.addMessage('Hello, world!', MessageType.SUCCESS);
  });

  it('should add a message with a given string type', (done) => {
    service.getMessage().pipe(take(1)).subscribe(flashMessage => {
      expect(flashMessage.message).toEqual('Hello, world!');
      expect(flashMessage.type).toEqual(MessageType.ERROR);
      expect(flashMessage.duration).toEqual(4000);
      done();
    });
    service.addMessage('Hello, world!', 'error');
  });

  it('should default to INFO type for an unrecognized string type', (done) => {
    service.getMessage().pipe(take(1)).subscribe(flashMessage => {
      expect(flashMessage.message).toEqual('Hello, world!');
      expect(flashMessage.type).toEqual(MessageType.INFO);
      expect(flashMessage.duration).toEqual(4000);
      done();
    });
    service.addMessage('Hello, world!', 'unrecognizedType');
  });



});
