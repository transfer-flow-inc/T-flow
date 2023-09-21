import {Component, OnInit} from '@angular/core';
import {CookiesService} from "../../services/cookies/cookies.service";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  isLogged: boolean = false;
  homepageTitle: string = "Accueil"
  text: string = "\"\"Le flux de fichiers sécurisé, à la vitesse française.\"\"";
  textToShow: string = "";

  constructor(
    private cookiesService: CookiesService,
  ) {
  }

  ngOnInit(): void {
    this.isLogged = !!this.cookiesService.get('token');
    this.animateText();
  }

  animateText(callback?: (text: string) => void) {
  const textLength = this.text.length;
  let i = 0;
  const intervalId = setInterval(() => {
    if (i < textLength) {
      this.textToShow += this.text.charAt(i);
      if (callback) {
        callback(this.textToShow);
      }
      i++;
    } else {
      clearInterval(intervalId);
    }
  }, 50);
}



}
