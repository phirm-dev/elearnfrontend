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

    window.scrollTo(0, 0);

    this.decodedToken = this.helper.decodeToken(this.token);

    this.service.getUserDetails(this.helper.decodeToken(this.token).username).subscribe(response => {
      this.user = response;
      this.coursesPurchased = response[0].courses;
    });

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

    this.cartItems = this.cartService.getItemsFromCart();
  }

  removeFromCart(item) {
    swal('warning', "Are you sure you want to remove this item from your cart?", 'warning', {
      buttons: ["No", "Yes"],
    }).then(value => {
      if (value == true) {
        this.lengthOfCart --;
        this.cartService.removeItemFromCart(item);
        swal("Info", "Removed from cart", "warning");
      } else if (value == null) {
        swal('You Declined!');
      }
    })
  }

  

  // editUser(user) {
  //   if (!user.phone || !user.email) {
  //     swal('Error', 'Incomplete Credentials', 'error');
  //   } else {
  //     this.service.editUser(user).subscribe(response => {
  //       if(response['statusCode'] == 400){
  //         swal('Error',response['statusText'],'error');
  //       } else{
  //         localStorage.setItem('token', response['token']);
  //         swal('Success','Successfuly Updated','success');
  //       }
  //     });
  //   }
  // }







  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('available-courses');
    this.router.navigate(['/login']);
  }

}