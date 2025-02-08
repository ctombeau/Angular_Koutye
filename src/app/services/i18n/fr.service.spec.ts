import { TestBed } from '@angular/core/testing';

import { FrService } from './fr.service';

describe('FrService', () => {
  let service: FrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
