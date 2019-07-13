import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

  constructor() { }

  faq = [
    {
      number: 1,
      question: 'What is Jefftutors?', answer: `Jefftutors is a platform that was created to make
    learning easier for students along with other side benefits. There are available courses that are constantly
    updated
    for the benefit of students.`},
    {
      number: 2,
      question: ` How do I subscribe for a course?`, answer: ` You can pay for a course using two options, either
      your bank account or your ATM card`
    },
    {
      number: 3,
      question: ` How long does my subscription last?.`,
      answer: `Subscription for a course lasts for 4 months(a
        semester), during this time you have full access to all the contents of the course`
    },
    {
      number: 4,
      question: `What if I do not understand after watching a
      video ?.`,
      answer: ` Free tutorials will be organized for the courses
      you subscribed for better explanations, contact us through any of the mediums on our contact page.`
    },
    {
      number: 5,
      question: ` How much data do i spend watching the videos ?`,
      answer: ` The size of the videos are as small as possible to
      avoid high data consumption, also after streaming the videos , you don't spend as much data streaming it
      again.`
    },
    {
      number: 6,
      question: ` What is the price per course?`,
      answer: `Prices may vary per course, the price of the
      course is boldly written on the course page above the subscribe button`
    },
    {
      number: 7,
      question: `Who supplied the course content?`,
      answer: ` Course content was supplied by students that aced
      the respective courses.`
    },
    {
      number: 8,
      question: ` Are all topics covered in the respective courses?`,
      answer: `Jefftutors aims to give you the best content
      available,not all topics in your respective text-books are going to be considered by your lecturers while
      setting your exam questions, Jefftutors saves you this stress by
      bringing to you the topics that are majorly considered by your lecturers while setting your questions.`
    }
  ]

  ngOnInit() { }

  contactMe() {
    const num = '2349073337066';
    const shareURL = `whatsapp://send?phone=${num}`;
    location.href = shareURL;
  }

}
