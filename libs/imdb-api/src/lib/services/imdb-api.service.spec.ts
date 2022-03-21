/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { ImdbApiService } from './imdb-api.service';

describe('Service: ImdbApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImdbApiService]
    });
  });

  it('should ...', inject([ImdbApiService], (service: ImdbApiService) => {
    expect(service).toBeTruthy();
  }));
});
