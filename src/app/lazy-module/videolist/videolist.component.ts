import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-videolist',
  templateUrl: './videolist.component.html',
  styleUrls: ['./videolist.component.css']
})
export class VideolistComponent implements OnInit {

  @Input() video: any[];
  @Input() readonly: boolean;
  @Output() watchVideo = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removeUnderscores(str: string) {
    const newStr = str.replace(/_/g, ' ');
    return newStr;
  }

}
