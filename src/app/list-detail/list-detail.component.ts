import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListService} from '../services/list.service';

import { List } from '../classes/list';
import {ListItem} from "../classes/list-item";
import {FirebaseObjectObservable} from "angularfire2";

@Component({
    selector: 'app-list-detail',
    templateUrl: './list-detail.component.html',
    styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private listService: ListService,
    ) { }

    list: List;
    observable: FirebaseObjectObservable<any>;

    ngOnInit() {
        this.route.params
            .subscribe(params => {
                this.observable = this.listService.get(params['id']);
                this.observable.subscribe(snapshot => {
                    this.list = snapshot.val();
                });
            });
    }


    getListItems(): ListItem[] {
        return this.listService.getListItems(this.list);
    }

    toggleIsDone(item): void {
        item.isDone = !item.isDone;
        this.listService.update(this.observable, this.list);
    }
}
