import {Component, OnInit} from '@angular/core';
import {
  faArrowLeft,
  faLockOpen,
  faUnlock,
  faUpRightFromSquare
} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../../services/http-client/http-client.service";
import {environment} from "../../../environments/environment";
import {FolderInterface} from "../../../interfaces/Files/folder-interface";
import {FormatSizeService} from "../../../services/format-size-file/format-size.service";
import {FlashMessageService} from "../../../services/flash-message/flash-message.service";
import {ThemeService} from "../../../services/theme/theme.service";

@Component({
  selector: 'app-dashboard-one-transfer',
  templateUrl: './dashboard-one-transfer.component.html',
  styleUrls: ['./dashboard-one-transfer.component.css']
})
export class DashboardOneTransferComponent implements OnInit {

  returnIcon: IconDefinition = faArrowLeft;
  transferID: string = '';
  lockIcon: IconDefinition = faArrowLeft;
  exitIcon: IconDefinition = faUpRightFromSquare;
  loading: boolean = true;
  loadingImg: string = '';
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
    private router: Router,
    private httpClient: HttpClientService,
    private formatSizeService: FormatSizeService,
    private flashMessageService: FlashMessageService,
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
    this.getQueryParams();

    this.getTransferByID();

    this.getTheme();
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

  deleteTransferByID() {
    this.httpClient.deleteATransferByID( environment.apiURL + 'admin/folder/' +  this.transferID).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/dashboard/utilisateurs/transferts/' + this.transfer.folderOwnerID]).then( () => {
          this.flashMessageService.addMessage('Le transfert a bien été supprimé', 'success', 4000);
        });
      }, error: () => {
        this.loading = false;
        this.router.navigate(['/admin/dashboard/utilisateurs/transferts/' + this.transfer.folderOwnerID]).then( () => {
          this.flashMessageService.addMessage('Une erreur est survenue', 'error', 4000);
        });
      }
    })
  }

  getTheme() {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.loadingImg = theme === 'light' ? 'assets/images/logo_dark.png' : 'assets/images/logo_light.png';
    });
  }

}
