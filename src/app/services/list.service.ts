import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { List } from '../classes/list';
import { ListItem } from '../classes/list-item';
import {UnderscoreService} from "./underscore.service";

@Injectable()
export class ListService {

    private url = '/lists';

    constructor(private af: AngularFire, private underscoreService: UnderscoreService) { }

    _ = this.underscoreService.get();

    addList(observable: FirebaseListObservable<List[]>): string {
        return observable.push({
            name: 'New List'
        }).key;
    }

    addListItem(list: List, listItemName: string): Promise<any> {
        let url = `${this.url}/${list.$key}/items`;
        return Promise.resolve(this.af.database.list(url).push({
            name: listItemName,
            isDone: false
        }).then(newList => { return newList; }));
    }

    deleteList(observableList: FirebaseObjectObservable<List>): Promise<any> {
        return Promise.resolve(observableList.remove());
    }

    getAll(): FirebaseListObservable<List[]> {
        return this.af.database.list(this.url);
    }

    get(id: string): FirebaseObjectObservable<List> {
        return this.af.database.object(`/lists/${id}`);
    }

    getListItems(list: List): ListItem[] {
        //https://blog.falafel.com/nifty-underscore-tricks-sorting-by-multiple-properties-with-underscore/
        return this._(list.items).chain()
            .sortBy('name')
            .sortBy('isDone')
            .value();
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
            items: list.items || []
        }));
    }
}
