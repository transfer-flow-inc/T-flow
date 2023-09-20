import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {FolderPagesInterface} from "../../interfaces/Files/folder-pages-interface";
import {FormatSizeService} from "../../services/format-size-file/format-size.service";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft, faLockOpen, faUnlock} from "@fortawesome/free-solid-svg-icons";
import {UserApiInterface} from "../../interfaces/User/user-api-interface";
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";

@Component({
  selector: 'app-dashboard-all-transfer',
  templateUrl: './dashboard-all-transfer.component.html',
  styleUrls: ['./dashboard-all-transfer.component.css']
})
export class DashboardAllTransferComponent implements OnInit{

  userID: string = '';
  loading: boolean = true;
  loadingImg: string = "";
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
  user: UserApiInterface = {
    id: 0,
    mail: '',
    firstName: '',
    lastName: '',
    password: '',
    roles: [''],
    username: '',
    avatar: '',
    isAccountVerified: false,
    plan: '',
    authMethod: '',
    userFolders: [],
  }
  lockIcon: IconDefinition = faLockOpen;
  returnIcon: IconDefinition = faArrowLeft;

  constructor(
    public route: ActivatedRoute,
    private httpClientService: HttpClientService,
    private formatSizeService: FormatSizeService,
    private themeService: ThemeServiceService,
  ) {
  }

  ngOnInit() {
    this.getQueryParams();

    this.getUserByID();
    this.getAllTransfersByUserID();

    this.getTheme();
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
        this.errorMessage = false;
        this.folders = response;
        if (this.folders.content[0]?.id === undefined) {
          this.isDataFound = false;
          this.errorMessage = false;
        }
      }, error: () => {
        this.loading = false;
        this.isDataFound = false;
        this.errorMessage = true;
      }
    });
  }

  getUserByID() {
    this.httpClientService.getOneUserByID(environment.apiURL + 'admin/user/' + this.userID).subscribe( {
      next: (response: UserApiInterface) => {
        this.user = response;
      }, error: () => {

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

  getTheme() {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.loadingImg = theme === 'light' ? 'assets/images/logo_dark.png' : 'assets/images/logo_light.png';
    });
  }

}
