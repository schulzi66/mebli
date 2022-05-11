/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FskRatingService } from './fsk-rating.service';

describe('Service: FskRating', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FskRatingService]
    });
  });

  it('should ...', inject([FskRatingService], (service: FskRatingService) => {
    expect(service).toBeTruthy();
  }));
});
