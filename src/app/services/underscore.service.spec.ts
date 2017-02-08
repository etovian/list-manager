/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnderscoreService } from './underscore.service';

describe('UnderscoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnderscoreService]
    });
  });

  it('should ...', inject([UnderscoreService], (service: UnderscoreService) => {
    expect(service).toBeTruthy();
  }));
});
