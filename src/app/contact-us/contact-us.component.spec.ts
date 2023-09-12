import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {of, throwError} from 'rxjs';

import {ContactUsComponent} from './contact-us.component';
import {HttpClientService} from '../../services/httpClient/http-client.service';
import {FlashMessageService} from '../../services/flash-message/flash-message.service';
import {Router} from '@angular/router';
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {take} from "rxjs/operators";

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;
  let httpClientService: HttpClientService;
  let flashMessageService: FlashMessageService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ContactUsComponent],
      providers: [HttpClientService, FlashMessageService, OAuthService, UrlHelperService, DateTimeProvider, OAuthLogger]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    httpClientService = TestBed.inject(HttpClientService);
    flashMessageService = TestBed.inject(FlashMessageService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should return false if any input field is empty', () => {
      component.emailValue = '';
      component.subjectValue = '';
      component.messageValue = '';
      expect(component.isValidInput()).toBeFalsy();

      component.emailValue = 'test@email.com';
      expect(component.isValidInput()).toBeFalsy();

      component.subjectValue = 'subject';
      expect(component.isValidInput()).toBeFalsy();
    });

    it('should return true if all input fields are non-empty', () => {
      component.emailValue = 'test@email.com';
      component.subjectValue = 'subject';
      component.messageValue = 'message';
      expect(component.isValidInput()).toBeTruthy();
    });


    it('should send an email successfully and navigate to home with a success message', async () => {
      spyOn(httpClientService, 'sendEmail').and.returnValue(of(null));
      spyOn(flashMessageService, 'addMessage');
      spyOn(router, 'navigate');

      component.emailValue = 'test@email.com';
      component.subjectValue = 'subject';
      component.messageValue = 'message';

      await component.sendEmail();

      expect(httpClientService.sendEmail).toHaveBeenCalled();
      expect(flashMessageService.addMessage).toHaveBeenCalledWith('Votre message a bien été envoyé.', 'success', 4000);
      expect(router.navigate).toHaveBeenCalledWith(['/accueil']);
    });

});
