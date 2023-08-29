import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {environment} from "../../environments/environment.development";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {CookiesService} from "../../services/cookies/cookies.service";

@Component({
  selector: 'app-settings-all-transfer',
  templateUrl: './settings-all-transfer.component.html',
  styleUrls: ['./settings-all-transfer.component.css']
})
export class SettingsAllTransferComponent implements OnInit {

  userId: string | null = "";
  allFolder : FolderInterface[] = [];
  loading: boolean = true;
  loadingImg: string = "assets/images/logo_light.png";
  isDataFound: boolean = true;
  isFolderEmpty: boolean = true;
  errorMessage: boolean = false;

  constructor(
    private httpClientService: HttpClientService,
    private JwtService: JwtTokenService,
    private cookieService: CookiesService,
  ) {
  }

  ngOnInit(): void {

    if (this.JwtService.getToken()) {
      this.userId = this.JwtService.getUserId();
    }

      if (this.userId && this.cookieService.get('token')) {
        this.httpClientService.getAllFolderByUserId( environment.apiURL + "user/folders/"+ this.userId).subscribe( {

          next: (data) => {
            this.loading = false;
            this.allFolder = data;
            this.isFolderEmpty = false
          },
          error: (err) => {
            this.errorMessage = true;
          }

        });

      }

        setTimeout(() => {
        this.loading = false;
        if (!this.loading && this.isFolderEmpty) {
          this.isDataFound = false;
        }
        }, 1000);



  }

  checkIfFolderIsExpired(folder: FolderInterface) {
    let currentDate = new Date();
    let folderDate = new Date(folder.expires_at);
    return folderDate < currentDate;
  }


}
