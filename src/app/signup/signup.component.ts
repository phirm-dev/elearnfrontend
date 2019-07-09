import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnquireUniportService } from '../enquire-uniport.service';
import swal from 'sweetalert'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import MicroModal from 'micromodal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router: Router, private service: EnquireUniportService, private spinnerService: Ng4LoadingSpinnerService) {
  }

  loader = false;
  modalTitle = '';
  modalText = '';

  ngOnInit() {
  }

  signUp(credentials) {
    if (!credentials || credentials == '' || credentials.password == '' || credentials.phone == '' || credentials.email == '' || credentials.username == '' || credentials.confirmpassword == '') {
      // swal('Error', 'Missing Details', 'error');
      this.modalTitle = 'Missing Details'
      this.modalText = 'Fill in all inputs to login';
      MicroModal.show('modal-1');
    }
    else if (credentials.password !== credentials.confirmpassword) {
      // swal('Error', 'Passwords do not match', 'error');
      this.modalTitle = 'Incorrect Details'
      this.modalText = 'Passwords do not match';
      MicroModal.show('modal-1');
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
          // swal('Error', res['message'], 'error');
          this.modalTitle = 'Error'
          this.modalText = res['message'];
          MicroModal.show('modal-1');
        }
      });
    }
  }
}