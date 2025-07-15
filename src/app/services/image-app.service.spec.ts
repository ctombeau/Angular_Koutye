import { TestBed } from '@angular/core/testing';

import { ImageAppService } from './image-app.service';

describe('ImageAppService', () => {
  let service: ImageAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
