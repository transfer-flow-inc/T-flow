import {Component} from '@angular/core';
import {faGithub, IconDefinition} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  githubIcon: IconDefinition = faGithub;

}
