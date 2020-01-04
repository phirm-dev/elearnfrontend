import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoursecontentComponent } from './coursecontent/coursecontent.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { Angular4PaystackModule } from 'angular4-paystack';
import { FAQComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { VideolistComponent } from './videolist/videolist.component';
import { CommentsComponent } from './coursecontent/comments/comments.component';
import { OverviewComponent } from './coursecontent/overview/overview.component';
import { AnnouncementComponent } from './coursecontent/announcement/announcement.component';
import { VideocontentlistComponent } from './coursecontent/videocontentlist/videocontentlist.component';

const routes: Routes = [
  { path: 'course/:course', component: CourseDetailsComponent },
  { path: 'coursecontent/:course', component: CoursecontentComponent },
  { path: 'FAQ\'s', component: FAQComponent },
  { component: ContactComponent, path: 'contact' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    Angular4PaystackModule
  ],
  declarations: [
    CoursecontentComponent,
    CourseDetailsComponent,
    FAQComponent,
    ContactComponent,
    VideoPlayerComponent,
    VideolistComponent,
    CommentsComponent,
    OverviewComponent,
    AnnouncementComponent,
    VideocontentlistComponent
  ],
  exports: [RouterModule]
})
export class LazyModuleModule { }
