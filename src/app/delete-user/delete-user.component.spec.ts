import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserComponent } from './delete-user.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {of, throwError} from "rxjs";

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;
  let router : Router;
  let flashMessageService : FlashMessageService;
  let httpClientService : HttpClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [OAuthLogger, OAuthService, DateTimeProvider, UrlHelperService]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    flashMessageService = TestBed.inject(FlashMessageService);
    httpClientService = TestBed.inject(HttpClientService);
    fixture = TestBed.createComponent(DeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should toggle isConfirmed', () => {
    component.isConfirmed = false;
    component.toggleConfirmation();
    expect(component.isConfirmed).toBeTruthy();
    component.toggleConfirmation();
    expect(component.isConfirmed).toBeFalsy();

  });

  it('should handle success', () => {
    spyOn(component, 'navigateToHomeAndFlashMessage');
    spyOn(httpClientService, 'deleteAUserByIDAndDeletionKey').and.returnValue(of({}));

    component.deleteUser();

    expect(component.navigateToHomeAndFlashMessage).toHaveBeenCalledWith('Votre compte a bien été supprimé', 'success', 4000);

  });

  it('should handle error', () => {
    spyOn(component, 'navigateToHomeAndFlashMessage');
    spyOn(httpClientService, 'deleteAUserByIDAndDeletionKey').and.returnValue(throwError('error'));

    component.deleteUser();

    expect(component.navigateToHomeAndFlashMessage).toHaveBeenCalledWith('Une erreur est survenue lors de la suppression de votre compte', 'error', 4000);

  });

});
