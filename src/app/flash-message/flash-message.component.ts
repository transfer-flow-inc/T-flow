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
  flashMessageDuration: number = 0;
  flashMessageInterval: any;

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
      this.flashMessageDuration = 100; // Set the initial width to 100%
      const duration = flashMessage.duration; // Store the duration
      const decrementRate = 100 / (duration / 100); // Calculate the decrement rate

      this.flashMessageInterval = setInterval(() => {
        this.flashMessageDuration -= decrementRate; // Decrease the width by the decrement rate


        if (this.flashMessageDuration <= 0) {
          clearInterval(this.flashMessageInterval);
          this.cdr.detectChanges();
          this.deleteFlashMessageWithoutService(this.flashMessage);
        }
      }, duration / 10); // Set the interval based on the duration


    });
  }


}
