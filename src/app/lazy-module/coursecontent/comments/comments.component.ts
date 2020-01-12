import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() comments$

  constructor() { }

  ngOnInit() {
    console.log(this.comments$, 'comments here');
  }

  // makeComment(comment, course) {
  //   if (comment.value === '') {
  //     swal('Fill In Comment');
  //     return;
  //   }
  //   const sentence = comment.value;
  //   comment.value = '';
  //   const username = this.helper.decodeToken(this.token).username;
  //   this.service.makeComment(username, sentence, course).subscribe(res => {
  //     this.comments$.push(res);
  //   });
  // }

}
