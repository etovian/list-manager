/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthorizedUserService } from './authorized-user.service';

describe('AuthorizedUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizedUserService]
    });
  });

  it('should ...', inject([AuthorizedUserService], (service: AuthorizedUserService) => {
    expect(service).toBeTruthy();
  }));
});
