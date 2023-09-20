import {ComponentFixture, TestBed} from '@angular/core/testing';

import { TransferRecapComponent } from './transfer-recap.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {of, throwError} from "rxjs";
import {Router} from "@angular/router";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {FormatSizeService} from "../../services/format-size-file/format-size.service";

describe('TransferRecapComponent', () => {
  let component: TransferRecapComponent;
  let fixture: ComponentFixture<TransferRecapComponent>;
  let httpClientService: HttpClientService;
  let router: Router;
  let flashMessageService: FlashMessageService;
  let formatSizeService: FormatSizeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferRecapComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [OAuthService, OAuthLogger, UrlHelperService, DateTimeProvider]
    })
    .compileComponents();

    formatSizeService = TestBed.inject(FormatSizeService);
    flashMessageService = TestBed.inject(FlashMessageService);
    router = TestBed.inject(Router);
    httpClientService = TestBed.inject(HttpClientService);
    fixture = TestBed.createComponent(TransferRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set transfer data if request return data', () => {
    const transferData = {
      id: '1',
      folderName : 'folderName',
      folderSize : 0,
      files : [],
      uploadedAt : new Date(),
      expiresAt : new Date(),
      fileCount : 0,
      folderViews : 0,
      recipientsEmails : [],
      shared : false,
      url : '',
      accessKey : '',
      folderOwnerID : '',
    };

    spyOn(httpClientService, 'getTransferByID').and.returnValue(of(transferData));

    component.getFolderByID();

    expect(component.folder).toEqual(transferData);

  });

  it('should call the navigateAndShowFlashMessage if the folder dont exist', () => {

    spyOn(httpClientService, 'getTransferByID').and.returnValue(throwError(''));

    spyOn(component, 'navigateAndShowFlashMessage');

    component.getFolderByID();

    expect(component.navigateAndShowFlashMessage).toHaveBeenCalled();

  });

  it('should navigate to "/accueil" and show a flash message', async () => {
  // Arrange
  const message = 'Test message';
  const type = 'success';
  const time = 5000;

  spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
  spyOn(flashMessageService, 'addMessage');

  // Act
  await component.navigateAndShowFlashMessage(message, type, time);

  // Assert
  expect(router.navigate).toHaveBeenCalledWith(['/accueil']);
  expect(flashMessageService.addMessage).toHaveBeenCalledWith(message, type, time);
});

  it('should return formatted size', () => {
    const size = 1000000;
    const formattedSize = '1 Mo';

    spyOn(formatSizeService, 'formatSize').and.returnValue(formattedSize);

    const result = component.formatSizeFile(size);

    expect(result).toEqual(formattedSize);

  });

});
