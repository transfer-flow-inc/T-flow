import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {environment} from "../../environments/environment.development";
import {FolderInterface} from "../../interfaces/Files/folder-interface";

@Component({
  selector: 'app-settings-all-transfer',
  templateUrl: './settings-all-transfer.component.html',
  styleUrls: ['./settings-all-transfer.component.css']
})
export class SettingsAllTransferComponent implements OnInit {

  userId: string | null = "";
  allFolder : FolderInterface[] = [];

  constructor(
    private httpClientService: HttpClientService,
    private JwtService: JwtTokenService,
  ) {
  }

  ngOnInit(): void {

    if (this.JwtService.getToken()) {
      this.userId = this.JwtService.getUserId();
    }




    if (this.userId) {
      this.httpClientService.getAllFolderByUserId( environment.apiURL + "user/folders/"+ this.userId).subscribe((user) => {
        this.allFolder = user;
      });

    }

  }

  checkIfFolderIsExpired(folder: FolderInterface) {
    let currentDate = new Date();
    let folderDate = new Date(folder.expires_at);
    return folderDate < currentDate;
  }


}
