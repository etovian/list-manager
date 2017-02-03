import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { List } from '../classes/list';
import { ListItem } from '../classes/list-item';

@Injectable()
export class ListService {

    private url = '/lists';

    constructor(private af: AngularFire) { }

    addListItem(list: List, listItemName: string): Promise<any> {
        let url = `${this.url}/${list.$key}/items`;
        return Promise.resolve(this.af.database.list(url).push({
            name: listItemName,
            isDone: false
        }));
    }

    getAll(): FirebaseListObservable<List[]> {
        return this.af.database.list(this.url);
    }

    get(id: string): FirebaseObjectObservable<List> {
        return this.af.database.object(`/lists/${id}`);
    }

    getListItems(list: List): ListItem[] {
        let listItems: ListItem[] = [];
        for(let key in list.items) {
            let listItem: ListItem = list.items[key];
            listItems.push(listItem);
        }

        let sortedItems = listItems.sort((list1, list2) => {
            return (list1.name > list2.name) ? 1 : -1;
        });

        return sortedItems;
    }

    removeCompletedListItems(list: List): void {
        for(let itemKey in list.items) {
            let listItem: ListItem = list.items[itemKey];
            if(listItem.isDone) {
                let url = `/lists/${list.$key}/items/${itemKey}`;
                this.af.database.object(url).remove();
            }
        }
    }

    update(observable: FirebaseObjectObservable<any>, list: List): Promise<any> {
        return Promise.resolve(observable.update({
            name: list.name,
            items: list.items
        }));
    }
}
