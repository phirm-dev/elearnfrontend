import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
import { EnquireUniportService } from 'src/app/enquire-uniport.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { removeUnderscores } from 'src/app/lib/handlevideodisplay';

@Component({
  selector: 'app-coursecontent',
  templateUrl: './coursecontent.component.html',
  styleUrls: ['./coursecontent.component.css', '../../../assets/libs/bootstrap/css/bootstrap.min.css',
    '../../../assets/libs/material-design-iconic-font/css/material-design-iconic-font.min.css',
    '../../../assets/libs/jquery-ui/jquery-ui.min.css',
    '../../../assets/libs/rslides/responsiveslides.css',
    '../../../assets/libs/slick/slick.css', '../../../assets/css/main.css']
})
export class CoursecontentComponent implements OnInit {
  public player;
  coursesPurchased;
  user: any;
  course;
  helper = new JwtHelperService();
  token = localStorage.getItem('token');
  view = null;
  noCourses;
  noVideos: any[];
  comments$: any;
  expires;
  expired = false;
  public presentVideo: string;
  // videoLocationUrl = 'https://global-cdn.jefftutors.com';
  videoLocationUrl = environment.baseVideoUrl;
  poster = 'assets/img/poster.jpeg';
  sanitizedUrl;

  constructor(private router: Router,
    private service: EnquireUniportService,
    private route: ActivatedRoute, private sanitizer: DomSanitizer) { }


  ngOnInit() {
    // get the course code from url
    this.route.paramMap.subscribe(params => {
      this.course = params.get('course');
    });

    // logic for checking subscription

    // Get course id from local storage
    const getToken = localStorage.getItem('available-courses');
    const availableCourses = this.helper.decodeToken(getToken)['courses'];
    const idx = availableCourses.findIndex(x => x.course_code == this.course);
    const courseId = availableCourses[idx]._id;

    // Get user id from  local storage
    const userId = this.helper.decodeToken(this.token).id;

    const userObj = {
      userId: userId,
      courseId: courseId,
      token: this.token,
    };
    // make api call to validate user subscription
    this.service.checkUserSubscription(userObj).subscribe(response => {
      this.user = response;
      this.coursesPurchased = response['courses'];
      this.coursesPurchased.filter(course => {
        return course.course_code == this.course;
      }).map(course => {
        this.view = course;
        this.noCourses = course.number_of_courses;
        this.noVideos = course.course_content;

        // const vidExtension = 'mp4';

        const vidUrl = this.videoLocationUrl + '/videos/' + course.course_code + '/' + course.course_content[0];
        this.presentVideo = removeUnderscores(course.course_content[0])
        // this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);
        this.sanitizedUrl = vidUrl;
      });
    }, (error: HttpErrorResponse) => {
      if (error.status === 403 && error.error.status === false) {
        alert('You are logged in another device, logout and log in again, ensure no one has your password.')
        return this.router.navigate(['/dashboard']);
      }
      this.expired = true;
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 3000);
    });

    this.getComments();
  }

  getComments() {
    // get course comments
    this.comments$ = this.service.getCourseComments(this.course);
  }

  purchase() {
    this.router.navigate(['/dashboard']);
  }

  watchVideo(event) {
    this.presentVideo = removeUnderscores(event)
    const vidUrl = this.videoLocationUrl + '/videos/' + this.view.course_code + '/' + event;
    this.sanitizedUrl = vidUrl;
    if (navigator.userAgent.indexOf(' UCBrowser/') >= 0) {
      this.sanitizedUrl = '';
    }
  }

  getVideoName(video) {
    const [ videoName ] = video.split('.')
    console.log(videoName, 'sia')
  }

  submit(event: { value: string; }) {
    if (event.value === '') {
      return;
    }
    const sentence = event.value;
    event.value = '';
    const username = this.helper.decodeToken(this.token).username;
    this.service.makeComment(username, sentence, this.course).subscribe(res => {
      this.getComments();
    });
  }

  back() {
    this.router.navigate(['/dashboard']);
  }

}
