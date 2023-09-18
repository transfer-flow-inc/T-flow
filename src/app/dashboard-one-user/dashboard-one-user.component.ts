import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment";
import {UserApiInterface} from "../../interfaces/User/user-api-interface";

@Component({
  selector: 'app-dashboard-one-user',
  templateUrl: './dashboard-one-user.component.html',
  styleUrls: ['./dashboard-one-user.component.css']
})
export class DashboardOneUserComponent implements OnInit {

  userID: string = '';
  loading: boolean = true;
  loadingImg: string = "assets/images/logo_light.png";
  user: UserApiInterface = {
    id: 0,
    firstName: '',
    lastName: '',
    mail: '',
    password: '',
    roles: [''],
    username: '',
    avatar: '',
    isAccountVerified: false,
    plan : '',
    authMethod: '',
    userFolders: [],
  }

  constructor(
    private route: ActivatedRoute,
    private flashMessageService: FlashMessageService,
    private router: Router,
    private httpClientService: HttpClientService
  ) {}

  ngOnInit(): void {
    this.getQueryParams();
    this.getUserInfoByID(this.userID);
  }

  getQueryParams() {
    this.route.params.subscribe(params => {
      this.userID = params['id'];
    });
  }

  handleError() {
    this.router.navigate(['/admin/dashboard/tout-les-utilisateurs']).then(() => {
      this.flashMessageService.addMessage("Cet utilisateur n'existe pas", 'error', 4000);
    });
  }

  getUserInfoByID(id : string) {
    this.httpClientService.getOneUserByID(environment.apiURL + 'admin/user/' + id).subscribe( {
      next: (response: any) => {
        this.user = response;
        this.loading = false;
      }, error: () => {
        this.handleError();
      }
    })
  }


}
