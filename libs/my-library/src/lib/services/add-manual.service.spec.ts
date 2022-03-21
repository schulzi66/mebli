/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddManualService } from './add-manual.service';

describe('Service: AddManual', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddManualService]
    });
  });

  it('should ...', inject([AddManualService], (service: AddManualService) => {
    expect(service).toBeTruthy();
  }));
});
