/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { MediaSearchService } from './media-search.service';

describe('Service: MediaSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaSearchService]
    });
  });

  it('should ...', inject([MediaSearchService], (service: MediaSearchService) => {
    expect(service).toBeTruthy();
  }));
});
