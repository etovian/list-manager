import {Component, OnInit, OnDestroy} from '@angular/core';
import {CommonItemsService} from "../services/common-items.service";
import {FirebaseListObservable} from "angularfire2";
import {Subscription} from "rxjs";
import {EventEmitter} from "@angular/common/src/facade/async";

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

    constructor(private commonItemsService: CommonItemsService) { }

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
        this.commonItemsService.add(this.newItemName);
        this.newItemFocusTriggeringEventEmitter.emit(true);
    }

    remove(item): void {
        this.commonItemsService.delete(this.itemsObservable, item);
    }

}
