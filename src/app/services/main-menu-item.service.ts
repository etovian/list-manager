import { Injectable } from '@angular/core';
import { MainMenuItem } from '../classes/main-menu-item';

@Injectable()
export class MainMenuItemService {

    constructor() { }

    getMenuItems(): MainMenuItem[] {
        return [
            { text: 'Lists', url: '/lists' },
            { text: 'Regular Items', url: '/regular-items' }
        ];
    }
}
