import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppartementComponent } from './add-appartement.component';

describe('AddAppartementComponent', () => {
  let component: AddAppartementComponent;
  let fixture: ComponentFixture<AddAppartementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAppartementComponent]
    });
    fixture = TestBed.createComponent(AddAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
