import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferComponent } from './transfer.component';
import {FontAwesomeTestingModule} from "@fortawesome/angular-fontawesome/testing";
import {FileUploadModule} from "ng2-file-upload";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferComponent ],
      imports: [ FontAwesomeTestingModule, FileUploadModule, HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
