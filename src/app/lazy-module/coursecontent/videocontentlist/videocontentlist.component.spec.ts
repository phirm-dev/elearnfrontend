import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideocontentlistComponent } from './videocontentlist.component';

describe('VideocontentlistComponent', () => {
  let component: VideocontentlistComponent;
  let fixture: ComponentFixture<VideocontentlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideocontentlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideocontentlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
