import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert'
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
  courses;
  lengthOfCart = this.cartService.lengthOfCart;

  constructor(private service: EnquireUniportService, private cartService: CartService) { }

  ngOnInit() {
    if (this.helper.isTokenExpired(this.fromStorage)) {
      console.log('Expired , go to the network');
      this.service.getCoursesToken().subscribe(res => {
        this.availableCourses = res['token'];
        localStorage.setItem('available-courses', this.availableCourses);
        var getToken = localStorage.getItem('available-courses');
        this.courses = this.helper.decodeToken(getToken)['courses'];
      });
    } else {
      console.log('Not expired , Decode token');
      this.courses = this.helper.decodeToken(this.fromStorage)['courses'];
    }
  }

  addToCart(item) {
    var cartAdded = this.cartService.addToCart(item);
    if (cartAdded) {
      this.lengthOfCart ++;
      swal("Success", "Added to cart", "success");
    } else {
      swal("","Already in cart", "warning");
    }
  }

}
