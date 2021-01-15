import { TestBed } from '@angular/core/testing';

import { ArtisanReviewService } from './artisan-review.service';

describe('ArtisanReviewService', () => {
  let service: ArtisanReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtisanReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
