import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  contactMe() {

    const num = '2349073337066'
    const shareURL = `whatsapp://send?phone=${num}`
    location.href = shareURL;

  }

}
