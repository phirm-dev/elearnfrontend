import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import swal from 'sweetalert';
import { EnquireUniportService } from 'src/app/enquire-uniport.service';
import { DomSanitizer } from '@angular/platform-browser';
import MicroModal from 'micromodal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})

export class CourseDetailsComponent implements OnInit {
  urlVideo = 'https://vod.vodgc.net/gid7/vod/vodgc/vodgc/28/18-284-8-GCZKTJ1538104527_480P.mp4/tracks-v1a1/index.m3u8';
  user;
  course;
  courseDetails = null;
  numberOfViews;
  helper = new JwtHelperService();
  userPurchasedCourses;
  // public APIkey: string = "FLWPUBK-9fc35f1dd34ad3dcdbb261730b89fc3a-X";
  // videoLocationUrl = 'https://global-cdn.jefftutors.com';
  videoLocationUrl = 'https://storage.googleapis.com/globally-cdn-jefftutors';
  // testPublicKey = 'pk_test_bed1c8f4a96cf7c72d846de9bb66c915e6994bc4';
  livePublicKey = 'pk_live_dc10c90ee39b637a8fd23a969bdd23b96bd9e876';
  txtref = '' + Math.floor((Math.random() * 1000000000) + 1);
  paying = false;
  sanitizedUrl = '';
  video = [];
  freeVidNo = 4;
  poster = 'assets/img/poster.jpeg';
  videoTitle: string;

  constructor(private service: EnquireUniportService, private route: ActivatedRoute,
     private router: Router, private sanitizer: DomSanitizer) { }

  paymentDone(response) {
    this.paying = true;
    this.service.buyCourse(this.courseDetails[0].course_name, this.user.username).subscribe(res => {
        swal('success', res['statusMessage'], 'success');
        this.router.navigate(['tutorials/coursecontent/' + this.courseDetails[0].course_code]);
    }, (error: HttpErrorResponse) => {
      swal('Error', `${error.error.message}
       Contact customer care for support`);
    });
  }

  paymentCancel(event) {
    // nothing happens for now
    swal('You closed payment page');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    // get course from route parameter
    this.route.paramMap.subscribe(params => {
      this.course = params.get('course');
    });

    // get course details
    this.service.getCourse(this.course).subscribe(res => {
      this.courseDetails = res;
      for (let i = 0; i < this.freeVidNo; i++) {
        this.video.push(res[0].course_content[i]);
      }
      this.numberOfViews = res[0].views;
      const vidExtension = 'mp4';

      const vidUrl = `${this.videoLocationUrl}/videos/${this.courseDetails[0].course_code}/${res[0].course_content[0]}.${vidExtension}`;
      // this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);
      this.sanitizedUrl = vidUrl;
      this.videoTitle = res[0].course_content[0];
      // increase views by 1
      this.service.increaseViews(this.courseDetails[0]._id).subscribe(res => {
        if (res['statusCode'] == 200) {
          this.numberOfViews = res['views'];
        }
      });
    });

    const token = localStorage.getItem('token');
    if (token) {
      const isTokenExpired = this.helper.isTokenExpired(token);
      if (isTokenExpired === true) {
        localStorage.removeItem('token');
      }
      this.user = this.helper.decodeToken(token);
    }
    this.showVideoNotification('Watch 4 Free Videos For This Course', 3000);
    this.showVideoNotification('Get Updates To Courses When You Subscribe', 15000);

    // get user details
    // this.service.getUserDetails(this.user.username).subscribe(res => {
    //   this.userPurchasedCourses = res[0].courses;
    // });

  }

  hideVideoNotification(element: HTMLElement) {
    element.classList.add('hide-video-pop');
  }
  showVideoNotification(message: string, duration: number = 1000) {
    let notificationBox: HTMLElement;
    setTimeout(() => {
      notificationBox = document.querySelector('.video-notification');
      notificationBox.textContent = message;
      notificationBox.classList.remove('hide-video-pop');
    }, duration);
    setTimeout(() => {
      this.hideVideoNotification(notificationBox);
    }, duration + 3000);
  }

  watchVideo(video: string) {
    const vidExtension = 'mp4';
    window.scrollTo(0, 0);
    // First video opiton
    const vidUrl = this.videoLocationUrl + '/videos/' + this.course + '/' + video + '.' + vidExtension;
    // this.sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(vidUrl);
    this.sanitizedUrl = vidUrl;
    this.videoTitle = video;
    this.showVideoNotification(video, 500);

    this.showVideoNotification('Get All Course Videos, Hit the Subscibe Button', 9000);

    if (navigator.userAgent.indexOf(' UCBrowser/') >= 0) {
      this.sanitizedUrl = '';
      // document.getElementById('vidTitle').textContent = 'Use chrome or another browser';
    }
  }

  subscribeWithToken(token: string) {
    if (!token) {
      return;
    }
    const obj = {
      username: this.user.username,
      courseName: this.courseDetails[0].course_name,
      code: token
    };
    this.service.subscribeWithCode(obj).subscribe(response => {
      this.router.navigate(['tutorials/coursecontent/' + this.courseDetails[0].course_code]);
    }, (error: HttpErrorResponse) => {
      swal('error', error.error.message, 'error');
    });
  }

  contactMe() {
    const num = '2349073337066';
    const shareURL = `whatsapp://send?phone=${num}`;
    const whatsappUrl = `https://wa.me/${num}`;
    location.href = whatsappUrl;
  }

  share() {
    const shareText = `There is an online tutorial for uniport students , check it out`;
    if ('share' in navigator) {
      (navigator as any).share({
        title: `StudyKrib`,
        text: shareText,
        url: window.location.origin
      }).then(() => {
        console.log('Shared');
      }).catch(() => {
        console.log('Error Sharing');
      });
    } else {
      const shareUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      location.href = shareUrl;
    }
  }

  buyCourse() {
    this.service.buyCourse(this.courseDetails[0].course_name, this.user.username).subscribe(res => {
        swal('success', res['statusMessage'], 'success');
        this.router.navigate(['tutorials/coursecontent/' + this.courseDetails[0].course_code]);
    }, (error: HttpErrorResponse) => {
      console.log(error);
      swal('Error', `${error.error.message}
       Contact customer care for support`);
    });
  }

  openModal() {
    MicroModal.show('modal-1');
  }
}
