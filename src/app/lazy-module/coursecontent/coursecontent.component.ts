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
  view = null;
  noCourses;
  noVideos: any[];
  comments: any;
  expires;
  expired = false;
  videoLocationUrl = 'https://global-cdn.jefftutors.com';
  sanitizedUrl;

  constructor(private router: Router, private service: EnquireUniportService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }


  ngOnInit() {

    this.player = new Plyr('#plyrID', { captions: { active: true } });


    // get the course code from url
    this.route.paramMap.subscribe(params => {
      this.course = params.get('course');
    });

    // logic for checking subscription

    // Get course id from local storage
    var getToken = localStorage.getItem('available-courses');
    const availableCourses = this.helper.decodeToken(getToken)['courses'];
    const idx = availableCourses.findIndex(x => x.course_code == this.course);
    const courseId = availableCourses[idx]._id;

    // Get user id from  local storage
    const userId = this.helper.decodeToken(this.token).id;

    const userObj = {
      userId: userId,
      courseId: courseId
    }
    // make api call to validate user subscription
    this.service.checkUserSubscription(userObj).subscribe(response => {
      if (response['statusCode'] !== 400) {
        this.user = response;
        this.coursesPurchased = response['courses'];
        //check if this course is one of the courses purchased by the user
        this.coursesPurchased.filter(course => {
          return course.course_code == this.course;
        }).map(course => {
          this.view = course;
          this.noCourses = course.number_of_courses;
          this.noVideos = course.course_content;

          var vidExtension = 'mp4';

          if (course.course_code == 'mth120') {
            vidExtension = 'm4v';
          }

          if (course.course_code == 'mth124') {
            vidExtension = 'mp4';
          }

          var vidUrl = this.videoLocationUrl + '/videos/' + course.course_code + '/' + course.course_content[0] + '.' + vidExtension;
          console.log(vidUrl);
          this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);
        })
      } else {
        this.expired = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard'])
        }, 3000);
      }
    })

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
    var vidExtension = 'mp4';
    if (course == 'mth120') {
      vidExtension = 'm4v';
    }
    if (course == 'mth124') {
      vidExtension = 'mp4';
    }
    var vidUrl = this.videoLocationUrl + '/videos/' + course + '/' + no + '.' + vidExtension;
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);
    vid.autoplay = true;
    window.scrollTo(0, 200);
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
