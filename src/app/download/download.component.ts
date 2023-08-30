import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {environment} from "../../environments/environment";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {LocalStorageService} from "../../services/local-storage/local-storage.service";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService,
    private router: Router,
    private flashMessageService: FlashMessageService,
    private localStorageService: LocalStorageService
  ) {
  }

  folderUrl: string = '';
  accessKey: string = '';
  folder : FolderInterface = {
    id: '',
    folderName: '',
    folderSize: 0,
    fileCount: 0,
    folderViews: 0,
    uploaded_at: new Date(),
    expires_at: new Date(),
    recipientsEmails: [],
    files: [],
    shared: true,
    accessKey: '',
    url: '',
  }
  folderSize: string = '';
  loading: boolean = true;
  loadingImg: string = "assets/images/logo_dark.png";


  ngOnInit() {


    this.route.params.subscribe(params => {
      this.folderUrl = params['folderUrl'];
      this.accessKey = params['accessKey'];
    });

    setTimeout(() => {
         this.httpClient.getAFolderByUrl(environment.apiURL + 'folder/url/' + this.folderUrl).subscribe({

      next: (folder) => {
        this.loading = false;
        this.folder = folder;
        if (this.folder.folderSize > 0 && this.folder.folderSize < 1000) {
          this.folderSize = this.folder.folderSize + ' octets';
        } else if (this.folder.folderSize >= 1000 && this.folder.folderSize < 1000000) {
          this.folderSize = (this.folder.folderSize / 1024).toFixed(2) + ' Ko';
        } else if (this.folder.folderSize >= 1000000 && this.folder.folderSize < 1000000000) {
          this.folderSize = (this.folder.folderSize / 1024 / 1024).toFixed(2) + ' Mo';
        } else if (this.folder.folderSize >= 1000000000 && this.folder.folderSize < 1000000000000) {
          this.folderSize = (this.folder.folderSize / 1024 / 1024 / 1024).toFixed(2) + ' Go';
        }

      }, error: (err) => {

        this.router.navigate(['/accueil']).then(() => {
          this.flashMessageService.addMessage(`Le lien de téléchargement est invalide`, 'error', 4000);
        });

      }

    });
    },500);




  }

  downloadFile() {

      this.httpClient.downloadFolder(environment.apiURL + 'folder/download/' + this.folderUrl + '?accessKey=' + this.accessKey)
        .subscribe( (data: Blob) => {

            const blob = new Blob([data], {type: 'application/zip'});
            const url = window.URL.createObjectURL(blob);
            window.fetch(url).then(res => res.blob()).then(blob => {
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = this.folder.folderName + '.zip';
              link.click();
            })
            this.router.navigate(['/accueil']).then(() => {
              this.flashMessageService.addMessage(`Le téléchargement a commencé`, 'success', 4000);
            });

        });

  }

}
