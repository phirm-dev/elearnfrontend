import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styleUrls: ['./courselist.component.css']
})
export class CourselistComponent implements OnInit {

  @Input() coursesPurchased: any[];

  constructor() { }

  ngOnInit() {
  }

}
