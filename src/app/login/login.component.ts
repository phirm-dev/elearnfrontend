import { Component, OnInit } from '@angular/core';
import { EnquireUniportService } from '../enquire-uniport.service';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
// import swal from 'sweetalert';
import MicroModal from 'micromodal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loader = false;
  modalTitle = '';
  modalText = '';

  constructor(private service: EnquireUniportService, private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
  }

  login(credentials) {
    if (!credentials || credentials == '' || credentials.password == '' || credentials.email == '' || credentials.username == '') {
      // swal('Error', 'Missing Details', 'error');
      this.modalTitle = 'Missing Details';
      this.modalText = 'Fill in all inputs to login';
      MicroModal.show('modal-1');
    } else {
      this.spinnerService.show();
      this.service.login(credentials).subscribe(res => {
        if (res['statusText'] == 'Successful login' && res['token']) {
          localStorage.setItem('token', res['token']);
          this.spinnerService.hide();
          this.router.navigate(['/dashboard']);
        } else {
          this.spinnerService.hide();
          this.modalTitle = 'Error';
          this.modalText = res['statusText'];
          MicroModal.show('modal-1');
          // swal('Error', res['statusText'], 'error');
        }
      }, (error) => {
          this.spinnerService.hide();
          this.modalTitle = 'Error';
          this.modalText = error['message'];
          MicroModal.show('modal-1');
      });
    }
  }

}
