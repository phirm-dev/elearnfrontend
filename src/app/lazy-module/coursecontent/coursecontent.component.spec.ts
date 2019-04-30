import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursecontentComponent } from './coursecontent.component';

describe('CoursecontentComponent', () => {
  let component: CoursecontentComponent;
  let fixture: ComponentFixture<CoursecontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursecontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
