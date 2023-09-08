import {Component, OnInit} from '@angular/core';
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment";
import {AllUsersInterface} from "../../interfaces/User/all-users-interface";

@Component({
  selector: 'app-dashboard-all-users',
  templateUrl: './dashboard-all-users.component.html',
  styleUrls: ['./dashboard-all-users.component.css']
})
export class DashboardAllUsersComponent implements OnInit {

    users: AllUsersInterface = {
       content: []
    };

      constructor(
          private httpClientService: HttpClientService,
      ) {
      }

      ngOnInit(): void {

        /*
        this.httpClientService.getAllUsers( environment.apiURL + 'admin/users' ).subscribe({
            next: (response) => {
              console.log(response)
              this.users.content = response.content;
            },
            error: (error) => {
              console.log(error);
            }
        });

          */

      }

}
