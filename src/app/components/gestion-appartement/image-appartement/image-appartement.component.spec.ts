import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAppartementComponent } from './image-appartement.component';

describe('ImageAppartementComponent', () => {
  let component: ImageAppartementComponent;
  let fixture: ComponentFixture<ImageAppartementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageAppartementComponent]
    });
    fixture = TestBed.createComponent(ImageAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
