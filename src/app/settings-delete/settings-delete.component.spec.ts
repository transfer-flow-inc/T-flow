import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsDeleteComponent } from './settings-delete.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {Router} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {of, throwError} from "rxjs";

describe('SettingsDeleteComponent', () => {
  let component: SettingsDeleteComponent;
  let fixture: ComponentFixture<SettingsDeleteComponent>;
  let flashMessageService: FlashMessageService;
  let router: Router;
  let httpClientService: HttpClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsDeleteComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ OAuthService, OAuthLogger, DateTimeProvider, UrlHelperService]
    })
    .compileComponents();

    httpClientService = TestBed.inject(HttpClientService);
    router = TestBed.inject(Router);
    flashMessageService = TestBed.inject(FlashMessageService);
    fixture = TestBed.createComponent(SettingsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isConfirmed', () => {

    component.isConfirmed = false;
    component.toggleConfirmation();
    expect(component.isConfirmed).toBeTruthy();
    component.toggleConfirmation();
    expect(component.isConfirmed).toBeFalsy();

  });

  it('should navigate to "/accueil" and show a flash message', async () => {
    const message = 'Test message';
    const type = 'success';
    const time = 5000;

    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    spyOn(flashMessageService, 'addMessage');

    await component.navigateToHomeAndFlashMessage(message, type, time);

    expect(router.navigate).toHaveBeenCalledWith(['/accueil']);
    expect(flashMessageService.addMessage).toHaveBeenCalledWith(message, type, time);
  });

  it('should handle success deletion', () => {
    spyOn(httpClientService, 'requestDeleteAUser').and.returnValue(of({}));
    spyOn(component, 'navigateToHomeAndFlashMessage');

    component.processDeleteRequest();

    expect(httpClientService.requestDeleteAUser).toHaveBeenCalled();
    expect(component.navigateToHomeAndFlashMessage).toHaveBeenCalledWith('Veuillez vérifier vos mails pour la suppression de votre compte', 'success', 4000);

  });

  it('should handle error deletion', () => {
    spyOn(httpClientService, 'requestDeleteAUser').and.returnValue(throwError('error'));
    spyOn(component, 'navigateToHomeAndFlashMessage');

    component.processDeleteRequest();

    expect(httpClientService.requestDeleteAUser).toHaveBeenCalled();
    expect(component.navigateToHomeAndFlashMessage).toHaveBeenCalledWith('Une erreur est survenue lors de la demande de suppression de votre compte', 'error', 4000);
  });

});
