import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransferComponent } from './transfer.component';
import { HttpClientService } from "../../services/httpClient/http-client.service";
import { CookiesService } from "../../services/cookies/cookies.service";
import { FlashMessageService } from "../../services/flash-message/flash-message.service";
import { of, throwError } from 'rxjs';
import {FormsModule} from "@angular/forms";

describe('TransferComponent', () => {
  let component: TransferComponent;
  let fixture: ComponentFixture<TransferComponent>;
  let mockHttpClientService: { createFolder: any; }, mockCookiesService: { get: any; }, mockFlashMessageService: { addMessage: any; };

  beforeEach(async () => {
    mockHttpClientService = {
      createFolder: jest.fn()
    };
    mockCookiesService = {
      get: jest.fn().mockReturnValue('fakeToken')
    };
    mockFlashMessageService = {
      addMessage: jest.fn()
    };


    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [TransferComponent],
      providers: [
        { provide: HttpClientService, useValue: mockHttpClientService },
        { provide: CookiesService, useValue: mockCookiesService },
        { provide: FlashMessageService, useValue: mockFlashMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with a token from cookie service', () => {
    expect(mockCookiesService.get).toHaveBeenCalledWith('token');
    expect(component.token).toEqual('fakeToken');
  });

  it('should add valid email to the list and reset input state', () => {
    component.checkIfEmailIsValid({ target: { value: 'test@example.com' } });
    expect(component.emails).toContain('test@example.com');
    expect(component.isEmailError).toBe(false);
    expect(component.emailInput).toBe('');
  });

  it('should not add invalid email and set error state', () => {
    component.checkIfEmailIsValid({ target: { value: 'invalidEmail' } });
    expect(component.emails).not.toContain('invalidEmail');
    expect(component.isEmailError).toBe(true);
    expect(component.emailInput).toBe('input-error');
  });

  it('should delete email from the list', () => {
    component.emails = ['test1@example.com', 'test2@example.com'];
    component.deleteEmail('test1@example.com');
    expect(component.emails).not.toContain('test1@example.com');
  });

  it('should upload files when requirements met', () => {
    component.uploader.queue = [{ file: { size: 1000 } } as any];
    component.emails = ['test@example.com'];
    component.folderName = 'Test Folder';
    const folderId = '1234';

    mockHttpClientService.createFolder.mockReturnValue(
      of({ id: folderId })
    );

    component.uploadFile();

    expect(mockHttpClientService.createFolder).toHaveBeenCalled();
  });

  it('should show an error message if file or email is missing for upload', () => {
    component.uploadFile();
    expect(mockFlashMessageService.addMessage).toHaveBeenCalledWith('Veuillez ajouter au moins un fichier et un email', 'error', 4000);
  });

  it('should remove duplicate files when checkFile is called', () => {
  // Arrange
  component.uploader.queue = [
    { file: { name: 'file1', size: 1000, rawFile: { name: 'file1' } } },
    { file: { name: 'file1', size: 1000, rawFile: { name: 'file1' } } }, // duplicate
    { file: { name: 'file2', size: 2000, rawFile: { name: 'file2' } } }
  ] as any[];

  // Act
  component.checkFile();

  // Assert
  const uniqueFileNames = Array.from(new Set(component.uploader.queue.map(f => f.file.name)));
  expect(uniqueFileNames.length).toEqual(component.uploader.queue.length);
});

  it('should return if email equal empty string', () => {
    const event = { target: { value: '' } };
    component.checkIfEmailIsValid(event);
    expect(component.emails).not.toContain('');
    expect(component.isEmailError).toBe(false);
    expect(component.emailInput).toBe('');
  });

  it('should calculate the size of all file in Ko', () => {
    component.uploader.queue = [
      { file: { size: 1000 } } as any,
      { file: { size: 2000 } } as any,
      { file: { size: 3000 } } as any,
    ];
    component.calculateSizeAllFile();
    expect(component.sizeAllFile).toBe(5.859375);
    expect(component.typeSizeFormat).toBe('Ko');

  });

  it('should calculate size all file in Mo', () => {

    component.uploader.queue = [
      { file: { size: 1000000 } } as any,
      { file: { size: 2000000 } } as any,
      { file: { size: 3000000 } } as any,
    ];
    component.calculateSizeAllFile();
    expect(component.sizeAllFile).toBe(5.7220458984375);
    expect(component.typeSizeFormat).toBe('Mo');

  });

  it('should calculate size all file in Go', () => {

    component.uploader.queue = [
      { file: { size: 1000000000 } } as any,
      { file: { size: 2000000000 } } as any,
      { file: { size: 3000000000 } } as any,
    ];
    component.calculateSizeAllFile();
    expect(component.sizeAllFile).toBe(5.587935447692871);
    expect(component.typeSizeFormat).toBe('Go');


  });

  it('should delete a file', () => {

    const item = { remove: jest.fn() };
    component.deleteFile(item);
    expect(item.remove).toHaveBeenCalled();

  });

  it('should delete all file', () => {

    component.uploader.clearQueue = jest.fn();
    component.deleteAllFile();
    expect(component.uploader.clearQueue).toHaveBeenCalled();


  });

  it('should handle valid email', () => {
    const event = { target: { value: 'test@example.com' } };
    component.checkIfEmailIsValid(event);
    expect(component.emails).toContain('test@example.com');
    expect(component.isEmailError).toBe(false);
    expect(event.target.value).toBe('');
  });

  it('should handle invalid email', () => {
    const event = { target: { value: 'invalid-email' } };
    component.checkIfEmailIsValid(event);
    expect(component.emails).not.toContain('invalid-email');
    expect(component.isEmailError).toBe(true);
    expect(component.emailInput).toBe('input-error');
  });

  it('should handle email that already exists', () => {
    component.emails = ['test@example.com'];
    const event = { target: { value: 'test@example.com' } };
    component.checkIfEmailIsValid(event);
    expect(component.isEmailAlreadyExist).toBe(true);
    expect(component.emailInput).toBe('input-error');
  });
});
