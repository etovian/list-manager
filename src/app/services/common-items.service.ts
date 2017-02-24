import { Injectable } from '@angular/core';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import Thenable = firebase.Thenable;

@Injectable()
export class CommonItemsService {

    private readonly url = '/common-items';

    constructor(private af: AngularFire) { }

    add(itemName: string): Thenable<any> {
        return this.af.database.list(this.url).push({
            name: itemName
        });
    }

    getAll(): FirebaseListObservable<any> {
        return this.af.database.list(this.url);
    }

    getSortedItems(items): any {
        let sortedItems = items.sort((item1, item2) => {
            return (item1.name > item2.name) ? 1 : -1;
        })
        return sortedItems;
    }

    delete(fromItems: FirebaseListObservable<any>, key): Thenable<any> {
        return fromItems.remove(key);
    }

}
