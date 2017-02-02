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

    getListItems(list: List): ListItem[] {
        let listItems: ListItem[] = [];
        for(let key in list.items) {
            let listItem: ListItem = list.items[key];
            listItems.push(listItem);
        }

        // let sortedListItems = _(listItems).chain()
        //     .sortBy(listItem => { return listItem.isDone; })
        //     .sortBy(listItem => { return listItem.name; })
        //     .value();
        //
        // return sortedListItems;

        return listItems;
    }

    update(observable: FirebaseObjectObservable<any>, list: List): Promise<any> {
        console.log(observable);
        return observable.update(list);
    }
}
