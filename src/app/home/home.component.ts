import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EnquireUniportService } from '../enquire-uniport.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CartService } from '../cart-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  helper = new JwtHelperService();
  availableCourses;
  fromStorage = localStorage.getItem('available-courses');
  courses;
  displayCourses: any = [];

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private service: EnquireUniportService, private spinnerService: Ng4LoadingSpinnerService, private cartService: CartService) { }

  ngOnInit() {
    this.service.isLoggedIn();


    if (this.helper.isTokenExpired(this.fromStorage)) {
      this.service.getCoursesToken().subscribe(res => {
        this.availableCourses = res['token'];
        localStorage.setItem('available-courses', this.availableCourses);
        const getToken = localStorage.getItem('available-courses');
        this.courses = this.helper.decodeToken(getToken)['courses'];
        for (let i = 0; i < 3; i++) {
          this.displayCourses.push(this.courses[i]);
        }
      });
    } else {
      this.courses = this.helper.decodeToken(this.fromStorage)['courses'];
      for (let i = 0; i < 3; i++) {
        this.displayCourses.push(this.courses[i]);
      }
    }
  }

  signUp(credentials) {
    if (!credentials || !credentials.password || !credentials.phone || !credentials.email || !credentials.username) {
      swal('Error', 'Missing Details', 'error');
    } else {
      this.spinnerService.show();
      this.service.register(credentials).subscribe(res => {
        if (res['statusCode'] == 200 && res['token']) {
          // get token and automatically navigate user to dashboard
          localStorage.setItem('token', res['token']);
          this.spinnerService.hide();
          this.router.navigate(['/dashboard']);
        } else {
          this.spinnerService.hide();
          swal('Error', res['message'], 'error');
        }
      });
    }
  }

  nav() {
    const token = localStorage.getItem('token');
    const isTokenExpired = this.helper.isTokenExpired(token);
    if (!isTokenExpired) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/signup']);
    }
  }

  contactMe() {
    const num = '2349036229746';
    const shareURL = `whatsapp://send?phone=${num}`;
    location.href = shareURL;
  }

}
