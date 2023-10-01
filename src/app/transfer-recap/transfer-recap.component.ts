import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../services/http-client/http-client.service";
import {environment} from "../../environments/environment";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {FormatSizeService} from "../../services/format-size-file/format-size.service";

@Component({
  selector: 'app-transfer-recap',
  templateUrl: './transfer-recap.component.html',
  styleUrls: ['./transfer-recap.component.css']
})
export class TransferRecapComponent implements OnInit{

  folderID : string = '';
  folder : FolderInterface = {
    id: '',
    folderName : '',
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
  }

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private httpClientService : HttpClientService,
    private flashMessageService : FlashMessageService,
    private formatSize : FormatSizeService
  ) {}

  ngOnInit(): void {
    this.getQueryParams();

    this.getFolderByID()
  }

  getQueryParams() {
    this.route.params.subscribe(params => {
      this.folderID = params['folderID'];
    });
  }

  getFolderByID() {
    this.httpClientService.getTransferByID( environment.apiURL + 'folder/' + this.folderID).subscribe({
      next: (response: FolderInterface) => {
        this.folder = response;
      }, error: () => {
        this.navigateAndShowFlashMessage('Une erreur est survenue lors de la récupération du dossier', 'error', 3000);
      }
    });
  }

  navigateAndShowFlashMessage(message : string, type : string, duration : number) {
    this.router.navigate(['/accueil']).then( () => {
      this.flashMessageService.addMessage(message, type, duration);
    });
  }

  formatSizeFile(size : number) {
    return this.formatSize.formatSize(size);
  }


}
