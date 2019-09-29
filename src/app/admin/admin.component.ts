import { Component, OnInit } from '@angular/core';
import { EnquireUniportService } from '../enquire-uniport.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  page = 'page1';
  users;
  user = {};
  username: String;
  email: String;
  courses;
  comments;
  Editor = BalloonEditor;
  editorConfig = {
    placeholder: 'Type the content here!',
  };

  constructor(private service: EnquireUniportService, private router: Router) { }

  ngOnInit() {
    this.service.adminGetUsers().subscribe(res => {
      this.users = res;
    });

    this.service.getCourses().subscribe(res => {
      this.courses = res;
    });
  }

  getUser(user) {
    this.service.getUser(user).subscribe(res => {
      this.user = res;
      this.username = res['username'];
      this.email = res['email'];
    });
  }

  editUser(newUser, username) {
    this.service.updateUser(newUser, username).subscribe(res => {
      if (res['statusText'] == 'Successfully Updated') {
        swal('Success', res['statusText'], 'success');
        this.service.adminGetUsers().subscribe(res => {
          this.users = res;
        });
      } else if (res['Error'] == 'An error Occured') {
        swal('Error', res['Error'], 'error');
      }
    });
  }

  deleteUser(username) {
    swal('warning', "Are you sure you want to delete this user?", 'warning', {
      buttons: ["No", "Yes"],
    }).then(value => {
      if (value == true) {
        this.service.deleteUser(username).subscribe(res => {
          if (res['statusText'] == 'Successfully Deleted User') {
            swal('Success', res['statusText'], 'success');
            this.service.adminGetUsers().subscribe(res => {
              this.users = res;
            });
          }
        })
      } else if (value == null) {
        swal('You Declined!');
      }
    })

  }

  addCourse(course) {
    if (course.course_code == "" || course.course_content == "" || course.course_name == "" || course.number_of_courses == "") {
      return swal('Error', 'Incomplete Credentials', 'error');
    }
    this.service.createCourse(course).subscribe(res => {
      if (res['statusText'] == "Course added successfully") {
        swal('Success', res['statusText'], 'success');
      }
    });
  }

  deleteCourse(course) {
    swal('warning', "Are you sure you want to delete this course?", 'warning', {
      buttons: ["No", "Yes"],
    }).then(value => {
      if (value == true) {
        this.service.deleteCourse(course).subscribe(res => {
          if (res['statusText'] == 'Course Successfully Deleted') {
            swal('Success', res['statusText'], 'success');
            this.service.getCourses().subscribe(res => {
              this.courses = res;
            })
          } else {
            swal('Error', 'Something went wrong', 'error');
          }
        });
      } else if (value == null) {
        swal('You Declined!');
      }
    })

  }

  // admin variables
  courseEditCourse_name;
  courseEditCourse_code;
  courseEditCourse_price;
  courseEditNumber;
  coursesEdit;
  courseEditDescription;

  getCourse(course_code) {
    this.service.getCourse(course_code).subscribe(res => {
      this.courseEditCourse_name = res[0].course_name;
      this.courseEditCourse_code = res[0].course_code;
      this.courseEditCourse_price = res[0].course_price;
      this.courseEditNumber = res[0].number_of_courses;
      this.courseEditDescription = res[0].course_description;
      this.coursesEdit = res[0].course_content.join(',');
    });
  }

  addCourseToUser(newCourse) {
    this.service.addCourseToUser(newCourse).subscribe(res => {
      if (res['statusCode'] == 200) {
        swal('Success', res['statusText'], 'success');
      }
      else if (res['statusText'] == 'Already purchased this course') {
        swal('Warning', res['statusText'], 'warning');
      }
      else {
        swal('Error', 'An error occured', 'error');
      }
    });
  }

  editCourse(course) {
    this.service.editCourse(course, this.courseEditCourse_code).subscribe(res => {
      if (res['statusText'] == 'Successfully Updated!') {
        swal('Success', res['statusText'], 'success');
      } else {
        swal('Error', res['statusText'], 'error');
      }
    })
  }

  logOut() {
    localStorage.removeItem('admintoken');
    swal('Warning', 'You logged out', 'warning');
    this.router.navigate(['/admin/login']);
  }

}