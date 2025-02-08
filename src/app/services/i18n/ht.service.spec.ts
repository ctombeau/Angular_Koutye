import { TestBed } from '@angular/core/testing';

import { HtService } from './ht.service';

describe('HtService', () => {
  let service: HtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
