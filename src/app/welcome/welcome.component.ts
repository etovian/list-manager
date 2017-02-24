import { Component, OnInit } from '@angular/core';
import { MainMenuItemService } from '../services/main-menu-item.service';
import { MainMenuItem } from '../classes/main-menu-item';
import {Router} from "@angular/router";

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
    providers: [MainMenuItemService]
})
export class WelcomeComponent implements OnInit {

    constructor(private mainMenuItemService: MainMenuItemService, private router: Router) { }

    ngOnInit() {
        this.fetchMenuItems();
    }

    menuItems: MainMenuItem[];

    go(item: MainMenuItem): void {
        this.router.navigate([item.path])
    }

    fetchMenuItems(): void {
        this.menuItems = this.mainMenuItemService.getMenuItems();
    }
}
