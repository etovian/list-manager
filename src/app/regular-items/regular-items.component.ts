import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonItemsService} from "../services/common-items.service";
import {FirebaseListObservable} from "angularfire2";
import {Subscription} from "rxjs";
import {EventEmitter} from "@angular/common/src/facade/async";
import {NotificationService} from "../services/notification.service";

@Component({
    selector: 'app-regular-items',
    templateUrl: './regular-items.component.html',
    styleUrls: ['./regular-items.component.css']
})
export class RegularItemsComponent implements OnInit, OnDestroy {

    items = [];
    itemsObservable: FirebaseListObservable<any>;
    itemsSubscription: Subscription;
    newItemName = 'New Item';

    public newItemFocusTriggeringEventEmitter = new EventEmitter<boolean>();

    constructor(private commonItemsService: CommonItemsService, private notificationService: NotificationService) { }

    ngOnInit() {
        this.itemsObservable = this.commonItemsService.getAll()

        this.itemsSubscription = this.itemsObservable.subscribe(items => {
            this.items = this.commonItemsService.getSortedItems(items);
        });
    }

    ngOnDestroy(): void {
        this.itemsSubscription.unsubscribe();
    }

    addItem(): void {
        this.commonItemsService.add(this.newItemName).then(() => {
            this.notificationService.addNotification({
                title: 'Item Added',
                text: `${this.newItemName} was added.`,
                type: 'success',
                pinned: false
            });
        });
        this.newItemFocusTriggeringEventEmitter.emit(true);
    }

    remove(item): void {
        let itemName = item.name;
        this.commonItemsService.delete(this.itemsObservable, item).then(() => {
            this.notificationService.addNotification({
                title: 'Item Deleted',
                text: `${itemName} was deleted.`,
                type: 'danger',
                pinned: false
            });
        });
    }

}
