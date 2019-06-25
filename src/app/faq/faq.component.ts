import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css', '../../assets/libs/bootstrap/css/bootstrap.min.css']
})
export class FAQComponent implements OnInit {

  constructor() { }

  faq = [
    {
      question: 'What is Jefftutors?', answer: `Jefftutors is a platform that was created to make
    learning easier for students along with other side benefits. There are available courses that are constantly
    updated
    for the benefit of students.`},
    {
      question: ` How do I subscribe for a course?`, answer: ` You can pay for a course using two options, either
      your bank account or your ATM card`
    }
  ]

  ngOnInit() { }

  contactMe() {
    const num = '2349073337066';
    const shareURL = `whatsapp://send?phone=${num}`;
    location.href = shareURL;
  }

}
