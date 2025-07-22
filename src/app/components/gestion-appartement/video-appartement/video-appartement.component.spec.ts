import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAppartementComponent } from './video-appartement.component';

describe('VideoAppartementComponent', () => {
  let component: VideoAppartementComponent;
  let fixture: ComponentFixture<VideoAppartementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoAppartementComponent]
    });
    fixture = TestBed.createComponent(VideoAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
