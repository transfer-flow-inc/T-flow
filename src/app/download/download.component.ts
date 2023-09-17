import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {environment} from "../../environments/environment";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";
import {FormatSizeService} from "../../services/format-size-file/format-size.service";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']
})
export class DownloadComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public httpClient: HttpClientService,
    private router: Router,
    private flashMessageService: FlashMessageService,
    private themeService: ThemeServiceService,
    private formatSizeService: FormatSizeService
  ) {
  }

  folderUrl: string = '';
  accessKey: string = '';
  folder: FolderInterface = {
    id: '',
    folderName: '',
    folderSize: 0,
    fileCount: 0,
    folderViews: 0,
    uploadedAt: new Date(),
    expiresAt: new Date(),
    recipientsEmails: [],
    files: [],
    shared: true,
    accessKey: '',
    url: '',
  }
  folderSize: string = '';
  loading: boolean = true;
  loadingImg: string = "";
  imgTheme: string = '';


  ngOnInit() {

    this.getCurrentTheme();

    this.getRoutesParams();

    this.getAFolderByUrl();


  }

  downloadFolder() {

    this.httpClient.downloadFolder(environment.apiURL + 'folder/download/' + this.folderUrl + '?accessKey=' + this.accessKey)
      .subscribe({
        next: (data) => {

          this.createABlobAndDownload(data);

          this.navigateAndShowFlashMessage('Téléchargement du dossier en cours', 'success', 4000);

        }, error: () => {

          this.navigateAndShowFlashMessage('Le lien de téléchargement est invalide', 'error', 4000);

        }
      });

  }



  // Refactor this method to extract out the logic that uses window object.
createABlobAndDownload(data: Blob) {
  const blob = this.createBlob(data);
  this.downloadBlob(blob);
}
createBlob(data: Blob): Blob {
  return new Blob([data], {type: 'application/zip'});
}

downloadBlob(blob: Blob) {
  const url = window.URL.createObjectURL(blob);
  window.fetch(url).then(res => res.blob()).then(blob => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = this.folder.folderName + '.zip';
    link.click();
  });
}


  getCurrentTheme() {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.loadingImg = theme === 'dark' ? 'assets/images/logo_dark.png' : 'assets/images/logo_light.png';
      this.imgTheme = theme === 'dark' ? 'assets/images/logo_dark.png' : 'assets/images/logo_light.png';
    });
  }

  getRoutesParams() {
    this.route.params.subscribe(params => {
      this.folderUrl = params['folderUrl'];
      this.accessKey = params['accessKey'];
    });
  }

  getAFolderByUrl() {
    this.httpClient.getAFolderByUrl(environment.apiURL + 'folder/url/' + this.folderUrl).subscribe({

      next: (folder) => {

        this.loading = false;
        this.folder = folder;
        this.folderSize = this.formatSizeService.formatSize(this.folder.folderSize);

      }, error: () => {


        this.navigateAndShowFlashMessage('Le dossier n\'existe pas', 'error', 4000);


      }

    });
  }



  navigateAndShowFlashMessage(message: string, type: string, time: number) {
    this.router.navigate(['/accueil']).then(() => {
      this.flashMessageService.addMessage(message, type, time);
    });
  }


}
