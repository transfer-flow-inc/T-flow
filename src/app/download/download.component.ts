import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {environment} from "../../environments/environment";

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
  ) {
  }

  folderUrl: string = '';
  accessKey: string = '';


  ngOnInit() {

    this.route.params.subscribe(params => {
      this.folderUrl = params['folderUrl'];
      this.accessKey = params['accessKey'];
    });

  }

  downloadFile() {
    if (this.folderUrl && this.accessKey) {

      this.httpClient.downloadFile(environment.apiURL + 'folder/download/' + this.folderUrl + '?accessKey=' + this.accessKey)
        .subscribe({

          next: (folder) => {

            console.log(folder);

          },
          error: (err) => {

            console.log(err);

            this.router.navigate(['/accueil']).then(() => {
              this.flashMessageService.addMessage(`Le lien de téléchargement est invalide`, 'error', 4000);
            });

          }

        })

    } else {
      this.router.navigate(['/accueil']).then(() => {
        this.flashMessageService.addMessage(`Le lien de téléchargement est invalide`, 'error', 4000);
      });
    }
  }

}
