import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtierComponent } from './courtier.component';

describe('CourtierComponent', () => {
  let component: CourtierComponent;
  let fixture: ComponentFixture<CourtierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
