import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {AllUsersInterface} from "../../interfaces/User/all-users-interface";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-dashboard-all-users',
  templateUrl: './dashboard-all-users.component.html',
  styleUrls: ['./dashboard-all-users.component.css']
})
export class DashboardAllUsersComponent implements OnInit {

  loading: boolean = true;
  loadingImg: string = "assets/images/logo_light.png";
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
  ) {
  }

  ngOnInit(): void {

    this.getAllUsers(this.page);

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
        this.errorMessage = true;
      }
    });
  }

}
