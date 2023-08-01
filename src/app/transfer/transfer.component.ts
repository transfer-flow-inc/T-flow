import {Component, OnInit} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  animations: [
    trigger('fileCard', [
      transition(':enter', [   // :enter is alias to 'void => *'
        //make slide animate
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity: 0}))
      ])
    ])]
})
export class TransferComponent implements OnInit {

  binIcon: IconDefinition = faTrashAlt;
  sizeAllFile: number = 0;
  typeSizeFormat: string = 'Ko';

  public uploader: FileUploader = new FileUploader({url: 'http://localhost:8080/upload'});

  ngOnInit(): void {
  }


  checkFile() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      for (let j = i + 1; j < this.uploader.queue.length; j++) {
        if (this.uploader.queue[i].file.name === this.uploader.queue[j].file.rawFile.name) {
          this.uploader.queue.splice(j, 1);
          this.calculateSizeAllFile();
        }
      }
    }
  }

  deleteFile(item: any) {
    item.remove();
    this.calculateSizeAllFile()
  }

  calculateSizeAllFile() {
    this.sizeAllFile = 0;
    for (let i = 0; i < this.uploader.queue.length; i++) {
      this.sizeAllFile += this.uploader.queue[i].file.size;
    }
    if (this.sizeAllFile / 1024 / 1024 < 1) {
      this.sizeAllFile = this.sizeAllFile / 1024;
      this.typeSizeFormat = 'Ko';
    } else if (this.sizeAllFile / 1024 / 1024 < 1000 && this.sizeAllFile / 1024 / 1024 > 1) {
      this.sizeAllFile = this.sizeAllFile / 1024 / 1024;
      this.typeSizeFormat = 'Mo';
    } else if (this.sizeAllFile > 1000) {
      this.sizeAllFile = this.sizeAllFile / 1024 / 1024 / 1024;
      this.typeSizeFormat = 'Go';
    }


  }


}
