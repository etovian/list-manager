import { Component, OnInit } from '@angular/core';
import { MainMenuItemService } from '../services/main-menu-item.service';
import { MainMenuItem } from '../classes/main-menu-item';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
    providers: [MainMenuItemService]
})
export class WelcomeComponent implements OnInit {

    constructor(private mainMenuItemService: MainMenuItemService) { }

    ngOnInit() {
        this.fetchMenuItems();
    }

    menuItems: MainMenuItem[];

    fetchMenuItems(): void {
        this.menuItems = this.mainMenuItemService.getMenuItems();
    }
}
