import { Injectable } from '@angular/core';
import { EnquireUniportService } from './enquire-uniport.service';
import { Router , CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Authguard implements CanActivate {

  constructor(private service: EnquireUniportService , private router: Router) { }

  canActivate() {
    if (this.service.isLoggedIn()) { return true; }
    this.router.navigate(['/login']);
    return false;
  }
}
