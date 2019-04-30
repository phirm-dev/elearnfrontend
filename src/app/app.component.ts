import { Component } from '@angular/core';
import swal from 'sweetalert';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  helper = new JwtHelperService();
  // template: String = '<img src="https://cdn.dribbble.com/users/563824/screenshots/4155980/untitled-11.gif" />';

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

}
