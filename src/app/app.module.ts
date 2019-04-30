import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { Authguard } from './authguard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularRaveModule } from 'angular-rave';
import { Angular4PaystackModule } from 'angular4-paystack';
import { FAQComponent } from './faq/faq.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ContactComponent } from './contact/contact.component';
import { PlyrModule } from 'ngx-plyr';

const routes: Routes = [
  { component: HomeComponent, path: "" },
  { component: ContactComponent, path: "contact" },
  { component: LoginComponent, path: "login" },
  { component: SignupComponent, path: "signup" },
  { component: FAQComponent, path: "FAQ's" },
  { path: 'tutorials', loadChildren: './lazy-module/lazy-module.module#LazyModuleModule' },
  { component: DashboardComponent, path: "dashboard", canActivate: [Authguard] },
  { component: AdminComponent, path: 'admin', canActivate: [AdminAuthGuard] },
  { component: AdminloginComponent, path: 'admin/login' },
  { component: NotFoundComponent, path: "**" }
]


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
    FAQComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Angular4PaystackModule,
    PlyrModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AngularRaveModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [
    Authguard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
