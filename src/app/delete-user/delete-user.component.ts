import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessageService} from "../../services/flash-message/flash-message.service";
import {HttpClientService} from "../../services/httpClient/http-client.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private router: Router,
    private flashMessageService: FlashMessageService,
    private route: ActivatedRoute,
    private httpClientService: HttpClientService
  )
  {}

  isConfirmed: boolean = false;
  userID: string = '';
  deletionKey: string = '';
  loadingImg: string = '';

  ngOnInit() {

    this.getQueryParams();


  }

  getQueryParams() {
    this.route.params.subscribe(params => {
      this.userID = params['userID'];
      this.deletionKey = params['deletionKey'];
    });
  }

  deleteUser() {
    this.httpClientService.deleteAUserByIDAndDeletionKey( environment.apiURL + 'verify/delete/' + this.userID + '/' + this.deletionKey )
      .subscribe({
        next: () => {
          this.navigateToHomeAndFlashMessage('Votre compte a bien été supprimé', 'success', 4000)
        }, error: () => {
          this.navigateToHomeAndFlashMessage('Une erreur est survenue lors de la suppression de votre compte', 'danger', 4000)
        }
      })
  }

  toggleConfirmation() {
    this.isConfirmed = !this.isConfirmed;
  }

  navigateToHomeAndFlashMessage(message: string, type: string, time: number) {
    this.router.navigate(['/accueil']).then(() => {
      this.flashMessageService.addMessage(message, type, time);
      });
  }

}
