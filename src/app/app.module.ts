import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { Authguard } from './authguard.service';
import { AngularRaveModule } from 'angular-rave';
import { Angular4PaystackModule } from 'angular4-paystack';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { PlyrModule } from 'ngx-plyr';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


const routes: Routes = [
  { component: HomeComponent, path: '' },
  { loadChildren: './login/login.module#LoginModule', path: 'login' },
  { loadChildren: './signup/signup.module#SignupModule', path: 'signup' },
  { loadChildren: './courses/courses.module#CoursesModule', path: 'courses' },
  { path: 'tutorials', loadChildren: './lazy-module/lazy-module.module#LazyModuleModule' },
  { loadChildren: './dashboard/dashboard.module#DashboardModule', path: 'dashboard', canActivate: [Authguard] },
  { loadChildren: './not-found/not-found.module#NotFoundModule', path: '**' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [RouterModule],
  providers: [
    Authguard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
