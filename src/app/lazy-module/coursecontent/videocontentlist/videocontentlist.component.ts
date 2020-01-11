import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { removeUnderscores } from '../../../lib/handlevideodisplay';

@Component({
  selector: 'app-videocontentlist',
  templateUrl: './videocontentlist.component.html',
  styleUrls: ['./videocontentlist.component.css','../../../../assets/libs/bootstrap/css/bootstrap.min.css']
})
export class VideocontentlistComponent implements OnInit {

  @Input() noVideos:any[];
  @Output() watchVideo = new EventEmitter();
  handlevideodisplay = removeUnderscores;

  constructor() { }

  ngOnInit() {
  }

}
