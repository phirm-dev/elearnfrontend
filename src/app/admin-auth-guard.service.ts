import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EnquireUniportService } from './enquire-uniport.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private service: EnquireUniportService) { }

  canActivate() {
    if (this.service.isAdminLoggedIn()) return true;
    this.router.navigate(['/admin/login']);
    return false;
  }
}
