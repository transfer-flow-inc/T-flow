import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {FlashMessage} from "../../interfaces/Flash-message/flash-message-interface";

@Injectable({
  providedIn: 'root',
})
export class FlashMessageService {
  private messageSubject = new Subject<FlashMessage>();


  addMessage(message: string, type: 'success' | 'error' | 'info' | 'warning' | 'null', duration: number) {
    const flashMessage: FlashMessage = { message, type, duration };
    this.messageSubject.next(flashMessage);
  }

  getMessage() {
    return this.messageSubject.asObservable();
  }

    deleteFlashMessage(flashMessage: FlashMessage) {
      flashMessage.message = "";
      flashMessage.type = "null";
      flashMessage.duration = 0;
    }

}
