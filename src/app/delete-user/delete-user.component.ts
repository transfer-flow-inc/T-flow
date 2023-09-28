import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  )
  {}

  isConfirmed: boolean = false;

  ngOnInit() {

    this.getQueryParams();

  }

  getQueryParams() {
    this.route.params.subscribe(params => {
      console.log(params)
    });
  }

  toggleConfirmation() {
    this.isConfirmed = !this.isConfirmed;
  }

}
