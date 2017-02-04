/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommonItemsService } from './common-items.service';

describe('CommonItemsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonItemsService]
    });
  });

  it('should ...', inject([CommonItemsService], (service: CommonItemsService) => {
    expect(service).toBeTruthy();
  }));
});
