import {Component, OnInit} from '@angular/core';
import {FileItem, FileUploader} from "ng2-file-upload";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faTrashAlt, faXmark} from "@fortawesome/free-solid-svg-icons";
import {animate, style, transition, trigger} from "@angular/animations";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environements/evironement-dev";
import {CookiesService} from "../../services/cookies/cookies.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  animations: [
    trigger('fileCard', [
      transition(':enter', [   // :enter is alias to 'void => *'
        //make slide animate
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity: 0}))
      ])
    ])]
})
export class TransferComponent implements OnInit {

  binIcon: IconDefinition = faTrashAlt;
  sizeAllFile: number = 0;
  typeSizeFormat: string = 'Ko';
  emailInput: string = '';
  emails: string[] = [];
  supressEmailIcon: IconDefinition = faXmark;
  isEmailError: boolean = false;
  isEmailAlreadyExist: boolean = false;
  message: string = '';
  files: FileItem[] = [];
  loaderProgress: number = 0;
  uploader: FileUploader;
  showOrUpload: string = '';
  showTimeout: boolean = false;
  isCanBeSend: boolean = false;

  constructor(
    private httpClient: HttpClientService,
    private cookiesService: CookiesService,
    private flashService: FlashMessageService
  ) {
    this.uploader = new FileUploader({
      url: environment.apiURL + 'file/',
      authToken: 'Bearer ' + this.cookiesService.get('token'),

    });

    this.uploader.onProgressAll = (progress: any) => {


      this.loaderProgress = progress;
      if (this.loaderProgress === 100) {
        this.loaderProgress = 0;
        this.showTimeout = true;
        setTimeout(() => {
          this.showOrUpload = '';
          this.showTimeout = false;
        }, 1500)
      } else {
        // add a delay to show the loader

        this.showOrUpload = 'hide';


      }

    }
  }


  ngOnInit(): void {



  }


  uploadFile() {
    if (this.uploader.queue.length >= 1 && this.emails.length >= 1) {
      this.httpClient.createFolder(environment.apiURL + 'folder/',
        {
          folderName: "Dossier-" + Math.floor(Math.random() * 1001),
          recipientsEmails: this.emails,
          message: this.message,
        })
        .subscribe({
          next: (folder) => {
            this.uploader.setOptions({
              url: environment.apiURL + 'file/' + folder.id,
            });
            this.uploader.uploadAll();
            this.uploader.onCompleteAll = () => {
              this.uploader.clearQueue();
              this.emails = [];
              this.sizeAllFile = 0;
              this.message = '';
            }
          }, error: (err) => {

          }
        })


    } else {
      this.flashService.addMessage('Veuillez ajouter au moins un fichier et un email', 'error',4000);
    }
  }

  checkFile() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      for (let j = i + 1; j < this.uploader.queue.length; j++) {
        if (this.uploader.queue[i].file.name === this.uploader.queue[j].file.rawFile.name) {
          this.uploader.queue.splice(j, 1);
          this.calculateSizeAllFile();
        }
      }
    }
  }

  deleteFile(item: any) {
    item.remove();
    this.calculateSizeAllFile()
  }

  deleteAllFile() {
    this.uploader.clearQueue();
  }

  calculateSizeAllFile() {
    this.sizeAllFile = 0;
    for (let i = 0; i < this.uploader.queue.length; i++) {
      this.sizeAllFile += this.uploader.queue[i].file.size;
    }
    if (this.sizeAllFile / 1024 / 1024 < 1) {
      this.sizeAllFile = this.sizeAllFile / 1024;
      this.typeSizeFormat = 'Ko';
    } else if (this.sizeAllFile / 1024 / 1024 < 1000 && this.sizeAllFile / 1024 / 1024 > 1) {
      this.sizeAllFile = this.sizeAllFile / 1024 / 1024;
      this.typeSizeFormat = 'Mo';
    } else if (this.sizeAllFile > 1000) {
      this.sizeAllFile = this.sizeAllFile / 1024 / 1024 / 1024;
      this.typeSizeFormat = 'Go';
    }


  }

  checkIfEmailIsValid(event: any) {
    let email: string = event.target.value
    if (email === '') {
      return;
    }
    let emailRegex: RegExp = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/;
    if (email.match(emailRegex)) {
      if (this.emails.indexOf(email) !== -1) {
        this.emailInput = 'input-error';
        this.isEmailAlreadyExist = true;
        return;
      } else {
        this.isEmailAlreadyExist = false;
      }
      this.emails.push(email);
      event.target.value = '';
      this.emailInput = '';
      this.isEmailError = false;
    } else {
      this.emailInput = 'input-error';
      this.isEmailError = true;
    }
  }

  deleteEmail(email: string) {
    this.emails.splice(this.emails.indexOf(email), 1);
  }


}
