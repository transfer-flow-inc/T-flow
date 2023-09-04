import {Component} from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent{

  emailValue: string = '';
  subjectValue: string = '';
  messageValue: string = '';


  sendEmail() {
    console.log('send email')
  }

}
