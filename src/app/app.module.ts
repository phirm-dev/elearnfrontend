import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { Authguard } from './authguard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularRaveModule } from 'angular-rave';
import { Angular4PaystackModule } from 'angular4-paystack';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { PlyrModule } from 'ngx-plyr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CoursesComponent } from './courses/courses.component';
import { CartComponent } from './cart/cart.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: LoginComponent, path: 'login' },
//  { component: CartComponent, path: "cart" },
  { component: SignupComponent, path: 'signup' },
  { component: CoursesComponent, path: 'courses' },
  { path: 'tutorials', loadChildren: './lazy-module/lazy-module.module#LazyModuleModule' },
  { component: DashboardComponent, path: 'dashboard', canActivate: [Authguard] },
  { component: AdminComponent, path: 'admin', canActivate: [AdminAuthGuard] },
  { component: AdminloginComponent, path: 'admin/login' },
  { component: NotFoundComponent, path: '**' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AdminComponent,
    AdminloginComponent,
    NotFoundComponent,
    CoursesComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Angular4PaystackModule,
    PlyrModule,
    CKEditorModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AngularRaveModule,
    RouterModule.forRoot(routes),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [RouterModule],
  providers: [
    Authguard,
    AdminAuthGuard,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
