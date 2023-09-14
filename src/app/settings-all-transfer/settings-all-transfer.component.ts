import { Component, OnInit } from '@angular/core';
import { HttpClientService } from "../../services/httpClient/http-client.service";
import { JwtTokenService } from "../../services/jwt-token/jwt-token.service";
import { environment } from "../../environments/environment.development";
import { FolderInterface } from "../../interfaces/Files/folder-interface";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {formatDate} from "@angular/common";

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
  ) { }

  ngOnInit(): void {
    this.initializeUserId();
    this.loadAllFolders();
  }

  initializeUserId(): void {
    if (this.JwtService.getToken()) {
      this.userId = this.JwtService.getUserId();
    }
  }

  loadAllFolders(): void {
    if (this.userId) {
      const url = `${environment.apiURL}user/folders/${this.userId}`;
      this.httpClientService.getAllFolderByUserId(url)
      .pipe(
        catchError(error => {
          this.setErrorMessage();
          return of(error);
        })
      )
      .subscribe(data => {
        this.handleFolders(data);
      });
    }
  }

  handleFolders(data: FolderInterface[]): void {
    this.loading = false;
    this.allFolder = data;
    this.isFolderEmpty = false;
    this.isDataFound = true;
    if (this.allFolder[0]?.id === null) {
      this.isFolderEmpty = true;
      this.isDataFound = false;
    }
  }

  setErrorMessage(): void {
    this.errorMessage = true;
  }

  checkIfFolderIsExpired(folder: FolderInterface): boolean {
    const currentDate = new Date();
    const folderDate = new Date(folder.expiresAt);
    return folderDate < currentDate;
  }

  deleteFolder(folder: FolderInterface): void {
    const url = `${environment.apiURL}folder/${folder.id}`;
    this.httpClientService.deleteFolder(url)
    .pipe(
      catchError(error => {
        this.setErrorMessage();
        return of(error);
      })
    )
    .subscribe(() => {
      this.removeFolderFromList(folder);
    });
  }

  removeFolderFromList(folder: FolderInterface): void {
    this.allFolder.splice(this.allFolder.indexOf(folder), 1);
    if (this.allFolder.length === 0) {
      this.isFolderEmpty = true;
      this.isDataFound = false;
    }
  }

  protected readonly formatDate = formatDate;
}
