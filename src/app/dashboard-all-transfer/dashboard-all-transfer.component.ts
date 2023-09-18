import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {FolderPagesInterface} from "../../interfaces/Files/folder-pages-interface";
import {FormatSizeService} from "../../services/format-size-file/format-size.service";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faLockOpen, faUnlock} from "@fortawesome/free-solid-svg-icons";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-dashboard-all-transfer',
  templateUrl: './dashboard-all-transfer.component.html',
  styleUrls: ['./dashboard-all-transfer.component.css']
})
export class DashboardAllTransferComponent implements OnInit{

  userID: string = '';
  loading: boolean = true;
  loadingImg: string = "assets/images/logo_light.png";
  isDataFound: boolean = true;
  errorMessage: boolean = false;
  folders : FolderPagesInterface = {
    content: [],
    pageable: {
      sort: {
        sorted: false,
        empty: false,
        unsorted: false

      },
      pageNumber: 0,
      pageSize: 0,
      offset: 0,
      paged: false,
      unpaged: false
    },
    last: false,
    totalPages: 0,
    totalElements: 0,
    sort: {
      sorted: false,
      empty: false,
      unsorted: false
    },
    first: false,
    size: 0,
    number: 0,
    numberOfElements: 0,
    empty: false
  };
  lockIcon: IconDefinition = faLockOpen;

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private httpClientService: HttpClientService,
    private flashMessageService: FlashMessageService,
    private formatSizeService: FormatSizeService
  ) {
  }

  ngOnInit() {
    this.getQueryParams();

    this.getAllTransfersByUserID();
  }

  getQueryParams() {
    this.route.params.subscribe(params => {
      this.userID = params['id'];
    });
  }


  getAllTransfersByUserID() {
    this.httpClientService.getAllTransfersByUserID(environment.apiURL + 'admin/user/' + this.userID + '/folders?page=0&size=20').subscribe( {
      next: (response: FolderPagesInterface) => {
        this.loading = false;
        this.folders = response;
        if (this.folders.content[0]?.id === undefined) {
          this.isDataFound = false;
        }
      }, error: () => {
        this.errorMessage = true;
      }
    });
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

  protected readonly formatDate = formatDate;
}
