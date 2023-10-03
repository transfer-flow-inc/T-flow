import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FlashMessage } from "../../interfaces/Flash-message/flash-message-interface";


@Injectable({
  providedIn: 'root',
})
export class FlashMessageService {
  private messageSubject = new Subject<FlashMessage>();

  addMessage(message: string, type: string , duration: number) {
    console.log("addMessage")
    const flashMessage: FlashMessage = { message, type, duration };
    this.messageSubject.next(flashMessage);
  }


  getMessage() {
    return this.messageSubject.asObservable();
  }

  deleteFlashMessage(flashMessage: FlashMessage) {
    flashMessage.message = "";
    flashMessage.type = "";
    flashMessage.duration = 0;
  }
}
