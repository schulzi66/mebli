/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StartPageService } from './start-page.service';

describe('Service: StartPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartPageService]
    });
  });

  it('should ...', inject([StartPageService], (service: StartPageService) => {
    expect(service).toBeTruthy();
  }));
});
