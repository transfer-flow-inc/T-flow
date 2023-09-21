import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FlashMessage } from "../../interfaces/Flash-message/flash-message-interface";

export enum MessageType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  NULL = 'null',
}

@Injectable({
  providedIn: 'root',
})
export class FlashMessageService {
  private messageSubject = new Subject<FlashMessage>();

  addMessage(message: string, type: string | MessageType = MessageType.INFO, duration: number = 4000) {
    const messageType = this.getMessageType(type);
    const flashMessage: FlashMessage = { message, type: messageType, duration };
    this.messageSubject.next(flashMessage);
  }

  private getMessageType(type: string | MessageType): MessageType {
    if (Object.values(MessageType).includes(type as MessageType)) {
      return type as MessageType;
    }
    return MessageType.INFO;
  }

  getMessage() {
    return this.messageSubject.asObservable();
  }

  deleteFlashMessage(flashMessage: FlashMessage) {
    flashMessage.message = "";
    flashMessage.type = MessageType.NULL;
    flashMessage.duration = 0;
  }
}
