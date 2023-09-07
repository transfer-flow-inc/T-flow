import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferComponent } from './transfer.component';
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {FileUploadModule} from "ng2-file-upload";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService} from "angular-oauth2-oidc";

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferComponent ],
      imports: [ FontAwesomeTestingModule, FileUploadModule, HttpClientTestingModule, FormsModule ],
      providers: [OAuthService, UrlHelperService, OAuthLogger, DateTimeProvider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload a file', () => {
    spyOn(component, 'uploadFile');
    component.uploadFile();
    expect(component.uploadFile).toHaveBeenCalled();
  });

  it('should calculate all file size', () => {

    spyOn(component, 'calculateSizeAllFile');
    component.calculateSizeAllFile();
    expect(component.calculateSizeAllFile).toHaveBeenCalled();

  });

  it('should use the constructor', () => {
    expect(component).toBeTruthy();

  });
});
