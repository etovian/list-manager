import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListService} from '../services/list.service';

import { List } from '../classes/list';
import {ListItem} from "../classes/list-item";
import {FirebaseObjectObservable} from "angularfire2";
import {ModalComponent} from "../modal/modal.component";

@Component({
    selector: 'app-list-detail',
    templateUrl: './list-detail.component.html',
    styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

    list: List;
    listKey: string;
    observable: FirebaseObjectObservable<any>;

    @ViewChild(ModalComponent)
    public readonly modal: ModalComponent;

    constructor(
        private route: ActivatedRoute,
        private listService: ListService,
    ) { }

    ngOnInit() {
        this.route.params
            .subscribe(params => {
                this.observable = this.listService.get(params['id']);
                this.observable.subscribe(snapshot => {
                    this.list = snapshot.val();
                    this.listKey = snapshot.key;
                });
            });

    }

    confirmDelete(): void {

        this.modal.show();
    }

    cancel(): void {
        this.modal.hide();
    }

    clearCompletedItems(): void {
        this.getListItems().forEach(item => {
            if(item.isDone) {
                // this.listService.removeItem()
            }
        });
    }

    delete(): void {
        console.log(`deleting ${this.list.name}`);
        this.modal.hide();
    }

    getListItems(): ListItem[] {
        return this.listService.getListItems(this.list);
    }

    toggleIsDone(item): void {
        item.isDone = !item.isDone;
        this.listService.update(this.observable, this.list);
    }
}
