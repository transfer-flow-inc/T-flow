import {Component, OnInit} from '@angular/core';
import {faArrowLeft, faLockOpen, faUnlock} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {ActivatedRoute} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment";
import {FolderInterface} from "../../interfaces/Files/folder-interface";
import {FormatSizeService} from "../../services/format-size-file/format-size.service";

@Component({
  selector: 'app-dashboard-one-transfer',
  templateUrl: './dashboard-one-transfer.component.html',
  styleUrls: ['./dashboard-one-transfer.component.css']
})
export class DashboardOneTransferComponent implements OnInit {

  returnIcon: IconDefinition = faArrowLeft;
  transferID: string = '';
  lockIcon: IconDefinition = faArrowLeft;
  loading: boolean = true;
  loadingImg: string = 'assets/images/logo_light.png';
  transfer: FolderInterface = {
    id: '',
    folderName: '',
    folderSize: 0,
    files: [],
    fileCount: 0,
    folderViews: 0,
    recipientsEmails: [],
    uploadedAt: new Date(),
    expiresAt: new Date(),
    shared: false,
    url: '',
    accessKey: '',
    folderOwnerID: '',
  }

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClientService,
    private formatSizeService: FormatSizeService
  ) {
  }

  ngOnInit(): void {
    this.getQueryParams();

    this.getTransferByID();
  }

  getQueryParams() {
    this.route.params.subscribe(params => {
      this.transferID = params['id'];
    });
  }

  getTransferByID() {
    this.httpClient.getTransferByID( environment.apiURL + 'admin/folder/' +  this.transferID).subscribe({
      next: (response) => {
        this.loading = false;
        this.transfer = response;
      }, error: (error) => {
        this.loading = false;
      }
    })
  }

  formatSize(size: number) {
    return this.formatSizeService.formatSize(size);
  }

  isFolderShared(shared :boolean) {
    return shared ?  this.lockIcon = faLockOpen : this.lockIcon = faUnlock;
  }

  isFolderExpired(expired: Date) {
    return expired < new Date();
  }


}
