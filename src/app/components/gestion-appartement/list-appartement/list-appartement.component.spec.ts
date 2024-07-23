import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppartementComponent } from './list-appartement.component';

describe('ListAppartementComponent', () => {
  let component: ListAppartementComponent;
  let fixture: ComponentFixture<ListAppartementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppartementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAppartementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
