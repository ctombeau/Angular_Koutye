import { TestBed } from '@angular/core/testing';

import { FermeService } from './ferme.service';

describe('FermeService', () => {
  let service: FermeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FermeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
