import { Injectable } from '@angular/core';
import {Notification} from "../interfaces/notification";
import {UnderscoreService} from "./underscore.service";

@Injectable()
export class NotificationService {

    private readonly TIMEOUT_INTERVAL = 5 * 1000;
    private notifications: Notification[] = [];
    constructor(private underscoreService: UnderscoreService) {
    }

    addNotification(notification: Notification) {
        this.notifications.push(notification);
        if(notification.pinned == false) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, this.TIMEOUT_INTERVAL);
        }
    }

    getNotifications(): Notification[] {
        return this.notifications;
    }

    removeNotification(notification: Notification): void {
        this.notifications = this.underscoreService.get().without(this.notifications, notification);
    }

}
