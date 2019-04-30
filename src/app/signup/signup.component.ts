import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnquireUniportService } from '../enquire-uniport.service';
import swal from 'sweetalert'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private service: EnquireUniportService, private spinnerService: Ng4LoadingSpinnerService) {
  }

  loader = false;
  ngOnInit() {
  }


  signUp(credentials) {
    if (!credentials || credentials == '' || credentials.password == '' || credentials.email == '' || credentials.username == '' || credentials.confirmpassword == '') {
      swal('Error', 'Missing Details', 'error');
    }
    else if (credentials.password !== credentials.confirmpassword) {
      swal('Error', 'Passwords do not match', 'error');
    }
    else {
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


}