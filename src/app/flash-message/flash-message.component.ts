import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  flashMessageWidth: number = 100;
  startTime: number = 0;

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
      this.flashMessageDuration = flashMessage.duration;
      this.cdr.detectChanges();
      this.startAnimation();
    });


  }

  startAnimation() {

    this.startTime = performance.now();
    this.flashMessageWidth = 100;

    const animate = (timestamp: number) => {
      const elapsed = timestamp - this.startTime;
      const progress = Math.max(0, Math.min(1, elapsed / this.flashMessageDuration));
      this.flashMessageWidth = 85 - (progress * 100);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.flashMessageService.deleteFlashMessage(this.flashMessage);
      }
    };

    requestAnimationFrame(animate);


  }


}
