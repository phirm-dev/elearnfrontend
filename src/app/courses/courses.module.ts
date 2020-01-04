import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { Routes, RouterModule } from '@angular/router';
import { CourselistComponent } from './courselist/courselist.component';

const routes: Routes = [
  {path: '', component: CoursesComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CoursesComponent, CourselistComponent]
})
export class CoursesModule { }
