import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{

  emailValue: string = '';
  subjectValue: string = '';
  messageValue: string = '';

  constructor() {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  sendEmail() {
    console.log('send email')
  }

}
