import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { List } from '../classes/list';
import { ListItem } from '../classes/list-item';
import Promise = firebase.Promise;
// import * as _ from '@types/underscore';

@Injectable()
export class ListService {

    private url = '/lists';

    constructor(private af: AngularFire) { }

    getAll(): FirebaseListObservable<List[]> {
        return this.af.database.list(this.url);
    }

    get(id: string): FirebaseObjectObservable<List[]> {
        return this.af.database.object(`/lists/${id}`, { preserveSnapshot: true });
    }

    getListItemKey(list: List, matchListItem: ListItem) {
        let listItemKey: string;
        for(let key in list.items) {
            let listItem = list.items[key];
            if(listItem === matchListItem) {
                listItemKey = key;
            }
        }
        return listItemKey;
    }

    getListItems(list: List): ListItem[] {
        let listItems: ListItem[] = [];
        for(let key in list.items) {
            let listItem: ListItem = list.items[key];
            listItem.id = key;
            listItems.push(listItem);
        }

        let sortedItems = listItems.sort((list1, list2) => {
            return (list1.name > list2.name) ? 1 : -1;
        });

        return sortedItems;
    }

    // removeItem(listKey: string, listItem: ListItem): void {
    //
    // }

    update(observable: FirebaseObjectObservable<any>, list: List): Promise<any> {
        console.log(observable);
        return observable.update(list);
    }
}
