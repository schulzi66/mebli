/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyLibraryService } from './my-library.service';

describe('Service: MyLibrary', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyLibraryService]
    });
  });

  it('should ...', inject([MyLibraryService], (service: MyLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
