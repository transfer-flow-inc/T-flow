import {Component, OnInit} from '@angular/core';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard-one-transfer',
  templateUrl: './dashboard-one-transfer.component.html',
  styleUrls: ['./dashboard-one-transfer.component.css']
})
export class DashboardOneTransferComponent implements OnInit  {

  returnIcon: IconDefinition = faArrowLeft;
  transferID: string = '';

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.getQueryParams();
  }

  getQueryParams() {
    this.route.params.subscribe(params => {
      this.transferID = params['id'];
    });
  }


}
