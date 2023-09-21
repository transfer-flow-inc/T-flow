import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment";
import {AllSupportsInterface} from "../../interfaces/Support/all-supports-interface";
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";

@Component({
  selector: 'app-dashboard-all-support',
  templateUrl: './dashboard-all-support.component.html',
  styleUrls: ['./dashboard-all-support.component.css']
})
export class DashboardAllSupportComponent implements OnInit {

  supports: AllSupportsInterface = {
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
  errorMessage: boolean = false
  loading: boolean = true;
  loadingImg: string = "";
  isDataFound: boolean = true;


  constructor(
    private httpClientService: HttpClientService,
    private themeService: ThemeServiceService,
  ) {
  }

  ngOnInit():void {

    this.getAllSupports();

    this.getTheme();

  }

  getAllSupports() {

    this.httpClientService.getAllSupports(environment.apiURL + 'admin/tickets?page=' + this.page + '&size=20').subscribe(
      (response) => {
        this.supports.content = response.content;
        this.loading = false;
        if (this.supports.content.length === 0) {
          this.isDataFound = false;
        }
      },
      () => {
        this.isDataFound = false;
        this.errorMessage = true;
        this.loading = false;
      });

  }

  getTheme() {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.loadingImg = theme === 'light' ? 'assets/images/logo_dark.png' : 'assets/images/logo_light.png';
    });
  }


}
