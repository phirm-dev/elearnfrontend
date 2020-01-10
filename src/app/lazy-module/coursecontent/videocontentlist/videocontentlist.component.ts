import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-videocontentlist',
  templateUrl: './videocontentlist.component.html',
  styleUrls: ['./videocontentlist.component.css','../../../../assets/libs/bootstrap/css/bootstrap.min.css']
})
export class VideocontentlistComponent implements OnInit {

  @Input() noVideos:any[];
  @Output() watchVideo = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removeUnderscores(str: string) {
    const newStr = str.replace(/_/g, ' ');
    return newStr;
  }

}
