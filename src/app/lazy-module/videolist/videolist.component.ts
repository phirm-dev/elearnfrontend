import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { removeUnderscores } from '../../lib/handlevideodisplay';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {

  @Input() video: any[];
  @Input() readonly: boolean;
  @Output() watchVideo = new EventEmitter();
  handlevideodisplay = removeUnderscores;

  constructor() { }

  ngOnInit() {
  }

}
