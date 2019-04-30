import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css', '../../assets/libs/bootstrap/css/bootstrap.min.css']
})
export class FAQComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  contactMe() {
    const num = '2349073337066';
    const shareURL = `whatsapp://send?phone=${num}`;
    location.href = shareURL;
  }

}
