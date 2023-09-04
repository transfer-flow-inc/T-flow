import {Component, OnInit} from '@angular/core';
import {faGithub, IconDefinition} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit{

  githubIcon: IconDefinition = faGithub;

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
