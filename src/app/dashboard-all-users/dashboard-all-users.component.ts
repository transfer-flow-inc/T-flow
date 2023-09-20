import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {AllUsersInterface} from "../../interfaces/User/all-users-interface";
import {environment} from "../../environments/environment";
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";

@Component({
  selector: 'app-dashboard-all-users',
  templateUrl: './dashboard-all-users.component.html',
  styleUrls: ['./dashboard-all-users.component.css']
})
export class DashboardAllUsersComponent implements OnInit {

  loading: boolean = true;
  loadingImg: string = "";
  isDataFound: boolean = true;
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
  page: number = 0;
  errorMessage: boolean = false;

  constructor(
    private httpClientService: HttpClientService,
    private themeService: ThemeServiceService,
  ) {
  }

  ngOnInit(): void {

    this.getAllUsers(this.page);
    this.getTheme();

  }

  getAllUsers(page: number) {
    this.httpClientService.getAllUsers(environment.apiURL + 'admin/users?page=' + page + '&size=20').subscribe({
      next: (response) => {
        this.loading = false;
        this.users.content = response.content;
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

}
