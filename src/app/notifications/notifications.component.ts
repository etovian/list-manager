import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../services/notification.service';
import {Notification} from "../interfaces/notification";

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
    }

    getNotifications(): Notification[] {
        return this.notificationService.getNotifications();
    }

    getClasses(notification: Notification): any {
        let classes = {
            alert: true
        };
        classes[`alert-${notification.type}`] = true;
        return classes;
    }
}
