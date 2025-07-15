import { TestBed } from '@angular/core/testing';

import { VideoAppService } from './video-app.service';

describe('VideoAppService', () => {
  let service: VideoAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
