/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MediaSearchService } from './media-search.service';

describe('Service: MediaSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaSearchService]
    });
  });

  it('should ...', inject([MediaSearchService], (service: MediaSearchService) => {
    expect(service).toBeTruthy();
  }));
});
