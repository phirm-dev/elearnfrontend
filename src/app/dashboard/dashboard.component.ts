import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { EnquireUniportService } from '../enquire-uniport.service';
import { CartService } from '../cart-service.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  page = 'page1';
  courses;
  availableCourses;
  decodedToken;
  token = localStorage.getItem('token');
  user;
  coursesPurchased = null;
  helper = new JwtHelperService();
  fromStorage = localStorage.getItem('available-courses');
  cartItems;
  lengthOfCart = this.cartService.lengthOfCart;

  constructor(private router: Router, private service: EnquireUniportService, private cartService: CartService) { }

  ngOnInit() {

    // scroll to top of page
    window.scrollTo(0, 0);

    this.decodedToken = this.helper.decodeToken(this.token);

    // Get user details
    this.service.getUserDetails(this.helper.decodeToken(this.token).username).subscribe(response => {
      this.user = response;
      this.coursesPurchased = response[0].courses;
    });


    // get courses token from server if expired
    if (this.helper.isTokenExpired(this.fromStorage)) {
      this.service.getCoursesToken().subscribe(res => {
        this.availableCourses = res['token'];
        localStorage.setItem('available-courses', this.availableCourses);
        var getToken = localStorage.getItem('available-courses');
        this.courses = this.helper.decodeToken(getToken)['courses'];
      });
    } else {
      this.courses = this.helper.decodeToken(this.fromStorage)['courses'];
    }
  }


  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('available-courses');
    this.router.navigate(['/login']);
  }

}