import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOneTransferComponent } from './dashboard-one-transfer.component';
import {DashboardNavbarComponent} from "../dashboard-navbar/dashboard-navbar.component";
import {Observable, of, throwError} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {faLockOpen, faUnlock} from "@fortawesome/free-solid-svg-icons";
import {FormatSizeService} from "../../services/format-size-file/format-size.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";

describe('DashboardOneTransferComponent', () => {
  let component: DashboardOneTransferComponent;
  let fixture: ComponentFixture<DashboardOneTransferComponent>;
  let activatedRoute: { params: Observable<{ id: string }> };
  let httpClientService: HttpClientService;
  let formatSizeService: FormatSizeService;
  let flashMessageService: FlashMessageService;
  let router: Router;

  beforeEach(async () => {
    activatedRoute = {
    params: of({ id: 'someId' })
    };
    await TestBed.configureTestingModule({
      declarations: [ DashboardOneTransferComponent, DashboardNavbarComponent ],
      imports: [HttpClientTestingModule, FontAwesomeTestingModule, RouterTestingModule],
      providers: [
        OAuthService, OAuthLogger, DateTimeProvider, UrlHelperService,
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    flashMessageService = TestBed.inject(FlashMessageService);
    formatSizeService = TestBed.inject(FormatSizeService);
    httpClientService = TestBed.inject(HttpClientService);
    fixture = TestBed.createComponent(DashboardOneTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get query parameters correctly', () => {
  component.getQueryParams();
  expect(component.transferID).toBe('someId');
});

  it('should set user when getOneUserByID is successful', () => {
    spyOn(httpClientService, 'getTransferByID').and.returnValue(
      of({ id: 1 } )
    );
    component.getTransferByID();
    expect(component.transfer).toEqual( {"id": 1});
    expect(component.loading).toBeFalsy();
  });

  it('should set errorMessage to true when getOneUserByID fails', () => {
    spyOn(httpClientService, 'getTransferByID').and.returnValue(throwError('error'));
    component.getTransferByID();
    expect(component.loading).toBeFalsy();
  });

  it('should return formatted size of folder', () => {
    spyOn(formatSizeService, 'formatSize').and.returnValue('1 MB');
    const size = component.formatSize(1000000);
    expect(size).toEqual('1 MB');

  });

  it('should return good icon is folder is shared', () => {
    const icon = component.isFolderShared(true);
    expect(icon).toEqual(component.lockIcon = faLockOpen);
  });

  it('should return bad icon is folder is not shared', () => {
    const icon = component.isFolderShared(false);
    expect(icon).toEqual(component.lockIcon = faUnlock);
  });

  it('should return false if folder is not expired', () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1); // set the date to one day in the future
  const expired = component.isFolderExpired(futureDate);
  expect(expired).toBeFalsy();
});

  it('should delete a transfer by his ID', () => {
    spyOn(httpClientService, 'deleteATransferByID').and.returnValue(of({}));
    spyOn(router, 'navigate');
    spyOn(flashMessageService, 'addMessage');
    component.deleteTransferByID();
    expect(component.loading).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/admin/dashboard/utilisateurs/transferts/' + component.transfer.folderOwnerID]);

  });

  it('should redirect when an error exist', () => {
    spyOn(httpClientService, 'deleteATransferByID').and.returnValue(throwError('error'));
    spyOn(router, 'navigate');
    component.deleteTransferByID();
    expect(component.loading).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/admin/dashboard/utilisateurs/transferts/' + component.transfer.folderOwnerID]);

  });

});
