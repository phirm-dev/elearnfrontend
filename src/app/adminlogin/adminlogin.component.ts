import { Component, OnInit } from '@angular/core';
import { EnquireUniportService } from '../enquire-uniport.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private service:EnquireUniportService , private router: Router) { }

  ngOnInit() {
  }

  loginAdmin(credentials) {
    if (!credentials || credentials == '' || credentials.password == '' || credentials.email == '' || credentials.username == '') {
      swal('Error', 'Missing Details', 'error');
    } else {
      this.service.loginAdmin(credentials).subscribe(res => {
        if (res['statusText'] == 'Successful login' && res['token']) {
          localStorage.setItem('admintoken', res['token']);
          swal('Welcome!', 'Login Successful', 'success');
          this.router.navigate(['/admin']);
        } else {
          swal('Error', res['statusText'], 'error');
        }
      });
    }
  }

}
