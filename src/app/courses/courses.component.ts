import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EnquireUniportService } from '../enquire-uniport.service';
import { CartService } from '../cart-service.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  availableCourses;
  helper = new JwtHelperService();
  fromStorage = localStorage.getItem('available-courses');
  courses = null;
  lengthOfCart = this.cartService.lengthOfCart;

  constructor(private service: EnquireUniportService, private cartService: CartService) { }

  ngOnInit() {
    if (!this.fromStorage || this.helper.isTokenExpired(this.fromStorage)) {
      this.service.getCoursesToken().subscribe(res => {
        this.availableCourses = res['token'];
        localStorage.setItem('available-courses', this.availableCourses);
        const getToken = localStorage.getItem('available-courses');
        this.courses = this.helper.decodeToken(getToken)['courses'];
      });
    } else {
      this.courses = this.helper.decodeToken(this.fromStorage)['courses'];
    }
  }

}
