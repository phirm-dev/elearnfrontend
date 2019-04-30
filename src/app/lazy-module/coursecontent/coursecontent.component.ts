import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
import { EnquireUniportService } from 'src/app/enquire-uniport.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-coursecontent',
  templateUrl: './coursecontent.component.html',
  styleUrls: ['./coursecontent.component.css', '../../../assets/libs/bootstrap/css/bootstrap.min.css', '../../../assets/libs/material-design-iconic-font/css/material-design-iconic-font.min.css', '../../../assets/libs/jquery-ui/jquery-ui.min.css', '../../../assets/libs/rslides/responsiveslides.css', '../../../assets/libs/slick/slick.css', '../../../assets/css/main.css']
})
export class CoursecontentComponent implements OnInit {
  public player;
  coursesPurchased;
  user;
  course;
  helper = new JwtHelperService();
  token = localStorage.getItem('token');
  view;
  noCourses;
  noVideos: any[];
  comments: any;
  expires;
  expired = false;
  videoLocationUrl = 'https://global-cdn.jefftutors.com';
  sanitizedUrl;

  constructor(private router: Router, private service: EnquireUniportService, private route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService, private sanitizer: DomSanitizer) { }


  ngOnInit() {
    this.spinnerService.show();

    this.player = new Plyr('#plyrID', { captions: { active: true } });


    //get the course code from url
    this.route.paramMap.subscribe(params => {
      this.course = params.get('course');
    });

    //decode token and get user details
    this.service.getUserDetails(this.helper.decodeToken(this.token).username).subscribe(response => {
      this.user = response;
      this.coursesPurchased = response[0].courses;
      //check if this course is one of the courses purchased by the user
      this.coursesPurchased.filter(course => {
        return course.course_code == this.course;
      }).map(course => {
        // console.log(course);
        this.expires = course.Expires
        if (this.expires > Date.now()) {
          this.expired = false;
        } else if (this.expires < Date.now()) {
          this.expired = true;
          // console.log(course.course_code, 'This is what we delete!');
          this.service.removeCourseFromArray(course._id, this.helper.decodeToken(this.token).username).subscribe(res => {
            if (res['statusCode'] == 200) {
              setTimeout(() => {
                this.router.navigate(['/dashboard'])
              }, 3000)
            }
          });
        }
        this.view = course;
        this.spinnerService.hide();
        this.noCourses = course.number_of_courses;
        this.noVideos = course.course_content;
        var vidUrl = this.videoLocationUrl + '/videos/' + course.course_code + '/' + 'intro' + '.m4v';
        this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);
      })
    });

    //get course comments
    this.service.getCourseComments(this.course).subscribe(res => {
      this.comments = res;
    });

  }

  purchase() {
    this.router.navigate(['/dashboard']);
  }

  //change the video in view
  watchCourse(no, course) {
    var vid = document.querySelector('video');
    var vidUrl = this.videoLocationUrl + '/videos/' + course + '/' + no + '.m4v';
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);
    vid.autoplay = true;
    //window.scrollTo(0, 200);
    document.getElementById('vidTitle').textContent = no;
    if (navigator.userAgent.indexOf(' UCBrowser/') >= 0) {
      //  do stuff here
      this.sanitizedUrl = '';
      document.getElementById('vidTitle').textContent = 'Use chrome or another browser';
    }
  }

  makeCommentMobile(comment, course) {
    if (comment.value == '') {
      swal('Fill In Comment');
      return
    }
    var sentence = comment.value;
    comment.value = '';
    document.getElementById('talkBox').classList.add('slideOutDown');
    document.getElementById('talkBox').classList.remove('slideInUp');
    var username = this.helper.decodeToken(this.token).username;
    this.service.makeComment(username, sentence, course).subscribe(res => {
      this.comments.push(res);
    });
  }

  makeComment(comment, course) {
    if (comment.value == '') {
      swal('Fill In Comment');
      return
    }
    var sentence = comment.value;
    comment.value = '';
    var username = this.helper.decodeToken(this.token).username;
    this.service.makeComment(username, sentence, course).subscribe(res => {
      this.comments.push(res);
    });
  }

  back() {
    this.router.navigate(['/dashboard']);
  }

  animateComment() {
    document.getElementById('talkBox').classList.add('slideInUp');
    document.getElementById('talkBox').classList.remove('slideOutDown');
    // document.getElementById('talkBox').classList.add('')
  }

  cancelComment() {
    document.getElementById('talkBox').classList.add('slideOutDown');
    document.getElementById('talkBox').classList.remove('slideInUp');
  }

}
