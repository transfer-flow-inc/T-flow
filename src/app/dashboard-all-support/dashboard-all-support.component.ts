import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment";
import {AllSupportsInterface} from "../../interfaces/Support/all-supports-interface";
import {formatDate} from "@angular/common";

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
  errorMessage: string = '';


  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
  ) {
  }

  ngOnInit():void {

    this.getAllSupports();
  }

  getAllSupports() {

    this.httpClientService.getAllSupports(environment.apiURL + 'admin/tickets?page=' + this.page + '&size=20').subscribe(
      (response) => {
        this.supports.content = response.content;
        console.log(response);
      },
      (error) => {
        console.log(error);
      });

  }


  protected readonly formatDate = formatDate;
}
