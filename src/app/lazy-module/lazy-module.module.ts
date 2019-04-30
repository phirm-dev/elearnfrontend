import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoursecontentComponent } from './coursecontent/coursecontent.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgStreamingModule } from 'videogular2/streaming';
import { VgImaAdsModule } from 'videogular2/ima-ads';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { Angular4PaystackModule } from 'angular4-paystack';

const routes: Routes = [
  { path: 'course/:course', component: CourseDetailsComponent },
  { path: 'coursecontent/:course', component: CoursecontentComponent }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    VgCoreModule,
    VgControlsModule,
    VgStreamingModule,
    VgImaAdsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    Angular4PaystackModule
  ],
  declarations: [
    CoursecontentComponent,
    CourseDetailsComponent
  ],
  exports:[RouterModule]
})
export class LazyModuleModule { }
