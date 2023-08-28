import {Component, Inject} from '@angular/core';
import {LocalStorageService} from "../../services/local-storage/local-storage.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent{

  logoTheme: string = 'assets/images/logo_light.png';

  constructor(
    private localStorageService: LocalStorageService,
  ) {
  }


}
