/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MainMenuItemService } from './main-menu-item.service';

describe('MainMenuItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainMenuItemService]
    });
  });

  it('should ...', inject([MainMenuItemService], (service: MainMenuItemService) => {
    expect(service).toBeTruthy();
  }));
});
