import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment";
import {ThemeServiceService} from "../../services/theme-service/theme-service.service";
import {faArrowLeft, faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {SupportInterface} from "../../interfaces/Support/support-interface";

@Component({
  selector: 'app-dashboard-one-support',
  templateUrl: './dashboard-one-support.component.html',
  styleUrls: ['./dashboard-one-support.component.css']
})
export class DashboardOneSupportComponent implements OnInit {

  userID: string = "";
  isLoading: boolean = true;
  loadingImg: string = "";
  returnIcon: IconDefinition = faArrowLeft;
  exitIcon : IconDefinition = faUpRightFromSquare;
  supportInfo: SupportInterface = {
    id: 0,
    sentAt: new Date(),
    subject: "",
    message: "",
    email: "",
    user: {
      id : 0,
      username: "",
      firstName: "",
      lastName: "",
      mail: "",
      password: "",
      avatar: "",
      authMethod: "",
      roles: [''],
      isAccountVerified: false,
      plan: "",
      userFolders: [],
      createdAt: new Date()
    }
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClientService: HttpClientService,
    private themeService: ThemeServiceService,
  ) {
  }

  ngOnInit(): void {
    this.getLoadingImg();
    this.getQueryParams();
    this.getSupportInfo();
  }


  getQueryParams() {
    this.route.params.subscribe(params => {
      this.userID = params['id'];
    });
  }

  getLoadingImg() {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.loadingImg = theme === 'light' ? 'assets/images/logo_dark.png' : 'assets/images/logo_light.png';
    });
  }

  getSupportInfo() {
    this.httpClientService.getSupportInfo( environment.apiURL + 'admin/ticket/' + this.userID).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.supportInfo = data;
      }, error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }


  protected readonly faArrowLeft = faArrowLeft;
}
