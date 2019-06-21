import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import swal from 'sweetalert';
import { EnquireUniportService } from 'src/app/enquire-uniport.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import * as Plyr from 'plyr';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})

export class CourseDetailsComponent implements OnInit {

  public player;
  user;
  course;
  courseDetails;
  numberOfViews;
  helper = new JwtHelperService();
  userPurchasedCourses;
  //public APIkey: string = "FLWPUBK-9fc35f1dd34ad3dcdbb261730b89fc3a-X";
  videoLocationUrl = 'https://global-cdn.jefftutors.com';
  //testPublicKey = 'pk_test_bed1c8f4a96cf7c72d846de9bb66c915e6994bc4';
  livePublicKey = 'pk_live_dc10c90ee39b637a8fd23a969bdd23b96bd9e876';
  txtref = '' + Math.floor((Math.random() * 1000000000) + 1);
  paying = false;
  sanitizedUrl;
  video = [];
  freeVidNo = 4;

  constructor(private service: EnquireUniportService, private route: ActivatedRoute, private router: Router, private spinnerService: Ng4LoadingSpinnerService, private sanitizer: DomSanitizer) { }

  paymentDone(response) {
    this.paying = true;
    this.service.buyCourse(this.courseDetails[0].course_name, this.user.username).subscribe(res => {
      if (res['statusMessage'] == 'Purchase Successful') {
        swal('success', res['statusMessage'], 'success');
        this.router.navigate(['tutorials/coursecontent/' + this.courseDetails[0].course_code]);
      } else if (res['statusMessage'] == 'An error occured during purchase!, Try again') {
        swal('Error', res['statusMessage'], 'error');
      }
      else if (res['statusMessage'] == 'Already purchased this course') {
        swal('Error', res['statusMessage'], 'error');
      }
      else {
        swal('Error', 'Something went wrong', 'error');
      }
    });
  }

  paymentCancel(event) {
    //nothing happens for now
    swal('You closed payment page');
  }

  ngOnInit() {
    this.spinnerService.show();

    this.player = new Plyr('#plyrID', { captions: { active: true } });

    //get course from route parameter
    this.route.paramMap.subscribe(params => {
      this.course = params.get('course');
    });

    //get course details
    this.service.getCourse(this.course).subscribe(res => {
      this.courseDetails = res;
      console.log(this.courseDetails);
      for (let i = 0; i < this.freeVidNo; i++) {
        this.video.push(res[0].course_content[i]);
      }
      // console.log(this.video);
      this.numberOfViews = res[0].views;

      this.spinnerService.hide();
      var vidUrl = `${this.videoLocationUrl}/videos/${this.courseDetails[0].course_code}/intro.m4v`;
      this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);

      // increase views by 1
      this.service.increaseViews(this.courseDetails[0]._id).subscribe(res => {
        if (res['statusCode'] == 200) {
          this.numberOfViews = res['views'];
        }
      });
    });

    var token = localStorage.getItem('token');
    this.user = this.helper.decodeToken(token);

    //get user details
    // this.service.getUserDetails(this.user.username).subscribe(res => {
    //   this.userPurchasedCourses = res[0].courses;
    // });

  }

  watchVideo(video) {
    var vid = document.querySelector('video');
    var vidUrl = this.videoLocationUrl + '/videos/' + this.course + '/' + video + '.m4v';
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);
    vid.autoplay = true;
    document.getElementById('vidTitle').textContent = video;
    window.scrollTo(0,0);
    if (navigator.userAgent.indexOf(' UCBrowser/') >= 0) {
      //  do stuff here
      this.sanitizedUrl = '';
      document.getElementById('vidTitle').textContent = 'Use chrome or another browser';
    }
  }

  contactMe() {
    const num = '2349073337066';
    const shareURL = `whatsapp://send?phone=${num}`;
    location.href = shareURL;
  }

  share() {
    const shareText = `There is an online tutorial for uniport students , check it out`;
    if ('share' in navigator) {
      (navigator as any).share({
        title: `Jefftutors`,
        text: shareText,
        url: window.location.origin
      }).then(() => {
        console.log('Shared');
      }).catch(() => {
        console.log('Error Sharing');
      })
    } else {
      const shareUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareUrl;
    }
  }

  buyCourse() {
    this.service.buyCourse(this.courseDetails[0].course_name, this.user.username).subscribe(res => {
      if (res['statusMessage'] == 'Purchase Successful') {
        swal('success', res['statusMessage'], 'success');
        this.router.navigate(['tutorials/coursecontent/' + this.courseDetails[0].course_code]);
      } else if (res['statusMessage'] == 'An error occured during purchase!, Try again') {
        swal('Error', res['statusMessage'], 'error');
      }
      else if (res['statusMessage'] == 'Already purchased this course') {
        swal('Error', res['statusMessage'], 'error');
      }
      else {
        swal('Error', 'Something went wrong', 'error');
      }
    });
  }
}