/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { MediaInformationService } from './media-information.service';

describe('Service: MediaInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaInformationService]
    });
  });

  it('should ...', inject([MediaInformationService], (service: MediaInformationService) => {
    expect(service).toBeTruthy();
  }));
});
