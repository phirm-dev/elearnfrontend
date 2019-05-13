import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class EnquireUniportService {

  url = environment.url
  helper = new JwtHelperService();
  token = localStorage.getItem('token');
  decodedToken = this.helper.decodeToken(this.token);

  constructor(private http: HttpClient) { }

  register(credentials) {
    return this.http.post(this.url + 'signup', credentials);
  }

  login(credentials) {
    return this.http.post(this.url + 'login', credentials);
  }

  getCourse(course) {
    return this.http.get(this.url + 'courses/' + course);
  }

  getCourses() {
    return this.http.get(this.url + 'courses');
  }

  getCoursesToken() {
    return this.http.get(this.url + 'courses/token');
  }

  getUserDetails(username) {
    return this.http.get(this.url + username);
  }

  checkUserSubscription(userDetails) {
    return this.http.post(this.url + 'courses/check-subscription', userDetails);
  }

  buyCourse(course, user) {
    return this.http.post(this.url + 'courses/buy', { username: user, course: course });
  }

  removeCourseFromArray(course_Id, user) {
    return this.http.post(this.url + 'courses/delete/' + course_Id, { username: user });
  }

  isLoggedIn() {
    var token = localStorage.getItem('token');
    if (token) {
      var isTokenExpired = this.helper.isTokenExpired(token);
      return !isTokenExpired;
    }
    return false;
  }

  isAdminLoggedIn() {
    var admintoken = localStorage.getItem('admintoken');
    if (admintoken) {
      var isTokenExpired = this.helper.isTokenExpired(admintoken);
      return !isTokenExpired;
    }
    return false;
  }

  loginAdmin(credentials) {
    return this.http.post(this.url + 'admin/authenticate', credentials);
  }

  adminGetUsers() {
    var token = localStorage.getItem('admintoken');
    return this.http.post(this.url + 'admin/users', { token: token });
  }

  getUser(username) {
    var token = localStorage.getItem('admintoken');
    return this.http.post(this.url + 'admin/user/' + username, { token: token });
  }

  createCourse(course) {
    var token = localStorage.getItem('admintoken');
    var courseContent = course.course_content.split(',');
    return this.http.post(this.url + 'admin/course', { token: token, course_name: course.course_name, course_price: course.course_price, course_code: course.course_code, number_of_courses: course.number_of_courses, course_description: course.course_description, course_content: courseContent });
  }

  deleteCourse(course) {
    var token = localStorage.getItem('admintoken');
    return this.http.post(this.url + 'admin/course/' + course + '/delete', { token: token });
  }


  updateUser(newUser, username) {
    var token = localStorage.getItem('admintoken');
    return this.http.post(this.url + 'admin/user/' + username + '/update', { token: token, username: newUser.username, email: newUser.email });
  }

  editUser(user) {
    return this.http.post(this.url + 'user/update/' + this.decodedToken.id, user);
  }

  deleteUser(username) {
    var token = localStorage.getItem('admintoken');
    return this.http.post(this.url + 'admin/user/' + username + '/delete', { token: token });
  }

  addCourseToUser(course) {
    var token = localStorage.getItem('admintoken');
    return this.http.post(this.url + 'admin/course/add', { course_code: course.course_code, username: course.username, token: token });
  }


  editCourse(course, xcourse) {
    var token = localStorage.getItem('admintoken');
    var course_content = course.course_content.split(',');
    return this.http.post(this.url + 'admin/course/' + xcourse + '/edit', {
      token: token,
      course_name: course.course_name,
      course_price: course.course_price,
      course_code: course.course_code,
      number_of_courses: course.number_of_courses,
      course_description: course.course_description,
      course_content: course_content
    });
  }

  makeComment(username, comment, course) {
    return this.http.post(this.url + 'user/comment', { authur: username, comment: comment, course_code: course });
  }

  getCourseComments(name) {
    return this.http.get(this.url + 'comments/' + name);
  }

  increaseViews(id) {
    return this.http.get(this.url + 'courses/views/' + id);
  }
}