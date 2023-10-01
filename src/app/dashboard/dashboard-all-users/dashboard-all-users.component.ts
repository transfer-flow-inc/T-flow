import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../../services/http-client/http-client.service";
import {AllUsersInterface} from "../../../interfaces/User/all-users-interface";
import {environment} from "../../../environments/environment";
import {ThemeService} from "../../../services/theme/theme.service";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dashboard-all-users',
  templateUrl: './dashboard-all-users.component.html',
  styleUrls: ['./dashboard-all-users.component.css']
})
export class DashboardAllUsersComponent implements OnInit {

  loading: boolean = true;
  loadingImg: string = "";
  isDataFound: boolean = true;
  leftIcon : IconDefinition = faArrowLeft;
  rightIcon : IconDefinition = faArrowRight;
  pageNumber: number = 1;
  users: AllUsersInterface = {
    content: [],
    pageable: {
      sort: {
        sorted: false,
        empty: false,
        unsorted: false,
      },
      pageNumber: 0,
      pageSize: 0,
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: false,
    totalPages: 0,
    totalElements: 0,
    sort: {
      sorted: false,
      empty: false,
      unsorted: false,
    },
    first: true,
    size: 0,
    number: 0,
    numberOfElements: 0,
    empty: false,
  }
  errorMessage: boolean = false;

  constructor(
    private httpClientService: HttpClientService,
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {

    this.getAllUsers(this.pageNumber);
    this.getTheme();

  }

  getAllUsers(pageNumber: number) {
    this.httpClientService.getAllUsers(environment.apiURL + 'admin/users?page=' + (pageNumber - 1) + '&size=10').subscribe({
      next: (response) => {
        this.loading = false;
        this.users = response;
        if (this.users.content[0]?.id === null) {
          this.isDataFound = false;
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = true;
      }
    });
  }

  getTheme() {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.loadingImg = theme === 'light' ? 'assets/images/logo_dark.png' : 'assets/images/logo_light.png';
    });
  }

  handleImageError(event: any) {
    event.target.src = 'assets/images/logo_dark.png';
  }

}
