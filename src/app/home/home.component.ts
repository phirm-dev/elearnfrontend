import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  helper = new JwtHelperService();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  nav() {
    var token = localStorage.getItem('token');
    var isTokenExpired = this.helper.isTokenExpired(token);
    if (!isTokenExpired) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/signup']);
    }
  }

  contactMe() {
    const num = '2349036229746'
    const shareURL = `whatsapp://send?phone=${num}`
    location.href = shareURL;
  }

}
