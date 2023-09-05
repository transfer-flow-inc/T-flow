import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {JwtTokenService} from "../../services/jwt-token/jwt-token.service";
import {environment} from "../../environments/environment.development";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-settings-all-transfer',
  templateUrl: './settings-all-transfer.component.html',
  styleUrls: ['./settings-all-transfer.component.css']
})
export class SettingsAllTransferComponent implements OnInit {

  userId: string | null = "";
  allFolder: FolderInterface[] = [];
  loading: boolean = true;
  loadingImg: string = "assets/images/logo_light.png";
  isDataFound: boolean = true;
  isFolderEmpty: boolean = true;
  errorMessage: boolean = false;
  binIcon: IconDefinition = faTrashAlt;

  constructor(
    private httpClientService: HttpClientService,
    private JwtService: JwtTokenService,
  ) {
  }

  ngOnInit(): void {


    if (this.JwtService.getToken()) {
      this.userId = this.JwtService.getUserId();
    }

    this.loadAllFolders();

  }

  loadAllFolders() {

    if (this.userId) {
      this.httpClientService.getAllFolderByUserId(environment.apiURL + "user/folders/" + this.userId).subscribe({

        next: (data) => {
          this.loading = false;
          this.allFolder = data;
          this.isFolderEmpty = false;
          this.isDataFound = true;
          if (this.allFolder[0].id === null) {
            this.isFolderEmpty = true;
            this.isDataFound = false;
          }
        },
        error: () => {
          this.errorMessage = true;
        }

      });
    }


  }

  checkIfFolderIsExpired(folder: FolderInterface) {
    let currentDate = new Date();
    let folderDate = new Date(folder.expiresAt);
    return folderDate < currentDate;
  }

  deleteFolder(folder: FolderInterface) {

    this.httpClientService.deleteFolder(environment.apiURL + "folder/" + folder.id).subscribe({
      next: () => {
        this.allFolder.splice(this.allFolder.indexOf(folder), 1);
        if (this.allFolder.length === 0) {
          this.isFolderEmpty = true;
          this.isDataFound = false;
        }
      },
      error: () => {
        this.errorMessage = true;
      }
    });
  }


}
