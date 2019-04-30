import { Component, OnInit } from '@angular/core';
import { EnquireUniportService } from '../enquire-uniport.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loader = false;

  constructor(private service: EnquireUniportService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }

  login(credentials) {
    if (!credentials || credentials == '' || credentials.password == '' || credentials.email == '' || credentials.username == '') {
      swal('Error', 'Missing Details', 'error');
    } else {
      this.spinnerService.show();
      this.service.login(credentials).subscribe(res => {
        if (res['statusText'] == 'Successful login' && res['token']) {
          localStorage.setItem('token', res['token']);
          this.spinnerService.hide();
          this.router.navigate(['/dashboard']);
        } else {
          this.spinnerService.hide();
          swal('Error', res['statusText'], 'error');
        }
      });
    }
  }

}
