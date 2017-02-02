/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListsResolverService } from './lists-resolver.service';

describe('ListsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListsResolverService]
    });
  });

  it('should ...', inject([ListsResolverService], (service: ListsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
