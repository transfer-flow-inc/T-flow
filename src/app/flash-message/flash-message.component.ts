import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {FlashMessage} from "../../interfaces/Flash-message/flash-message-interface";

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent implements OnInit {

  flashMessage: FlashMessage = {message: "", type: "warning", duration: 0};

  constructor(
    private flashMessageService: FlashMessageService,
    private cdr: ChangeDetectorRef
  ) {
  }

   deleteFlashMessageWithoutService(flashMessage: FlashMessage) {
    this.flashMessageService.deleteFlashMessage(flashMessage);
  }

  ngOnInit() {
     this.flashMessageService.getMessage().subscribe((flashMessage) => {
      this.flashMessage = flashMessage;
      if (this.flashMessage) {
        setTimeout(() => {
          this.flashMessageService.deleteFlashMessage(flashMessage); // Remove the message after the specified duration
          this.cdr.detectChanges(); // Trigger change detection to update the view
        }, flashMessage.duration);
      }
    });
  }



}
