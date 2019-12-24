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
import { FAQComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { VideoPlayerComponent } from './video-player/video-player.component';

const routes: Routes = [
  { path: 'course/:course', component: CourseDetailsComponent },
  { path: 'coursecontent/:course', component: CoursecontentComponent },
  { path: "FAQ's", component: FAQComponent },
  { component: ContactComponent, path: "contact" }
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
    CourseDetailsComponent,
    FAQComponent,
    ContactComponent,
    VideoPlayerComponent
  ],
  exports: [RouterModule]
})
export class LazyModuleModule { }
