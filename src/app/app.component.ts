import { Component, Input, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CartService } from './cart-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  helper = new JwtHelperService();
  decodedToken;
  token = localStorage.getItem('token');
  @Input() lengthOfCart = this.cartService.lengthOfCart;
  // template: String = '<img src="https://cdn.dribbble.com/users/563824/screenshots/4155980/untitled-11.gif" />';

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.decodedToken = this.helper.decodeToken(this.token);
  }

  isLoggedIn() {
    var token = localStorage.getItem('token');
    var isTokenExpired = this.helper.isTokenExpired(token);
    return !isTokenExpired;
  }

  contactMe() {
    const num = '2349036229746'
    const shareURL = `whatsapp://send?phone=${num}`
    location.href = shareURL;
  }

  toggleNav() {
    document.getElementById('wrapper').classList.toggle('toggled');
    // $("#wrapper").toggleClass("toggled");
    window.scrollTo(0, 0);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('available-courses');
    document.getElementById('smallnav').classList.toggle('show');
    this.router.navigate(['/login']);
  }
}
