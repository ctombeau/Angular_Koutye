import { TestBed } from '@angular/core/testing';

import { EnService } from './en.service';

describe('EnService', () => {
  let service: EnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
