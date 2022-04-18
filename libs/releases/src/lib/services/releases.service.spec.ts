/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReleasesService } from './releases.service';

describe('Service: Releases', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReleasesService]
    });
  });

  it('should ...', inject([ReleasesService], (service: ReleasesService) => {
    expect(service).toBeTruthy();
  }));
});
