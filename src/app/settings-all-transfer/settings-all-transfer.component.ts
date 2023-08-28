import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {environment} from "../../environments/environment.development";
import {transformSupportedBrowsersToTargets} from "@angular-devkit/build-angular/src/utils/esbuild-targets";

@Component({
  selector: 'app-settings-all-transfer',
  templateUrl: './settings-all-transfer.component.html',
  styleUrls: ['./settings-all-transfer.component.css']
})
export class SettingsAllTransferComponent implements OnInit {

  userId: string | null = "";
  allFolder : FolderInterface[] = [];
  folderSize: string = '';

  constructor(
    private httpClientService: HttpClientService,
    private JwtService: JwtTokenService,
  ) {
  }

  ngOnInit(): void {

    if (this.userId) {
      this.userId = this.JwtService.getUserId();
    } else {
      return;
    }


    if (this.userId) {
      this.httpClientService.getAllFolderByUserId( environment.apiURL + "user/folders/"+ this.userId).subscribe((user) => {
        this.allFolder = user;

      })
    }

  }


  protected readonly transformSupportedBrowsersToTargets = transformSupportedBrowsersToTargets;
}
