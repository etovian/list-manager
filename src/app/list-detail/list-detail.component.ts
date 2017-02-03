import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ListService} from '../services/list.service';

import { List } from '../classes/list';
import {ListItem} from "../classes/list-item";
import {FirebaseObjectObservable} from "angularfire2";
import {ModalComponent} from "../modal/modal.component";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-list-detail',
    templateUrl: './list-detail.component.html',
    styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit, OnDestroy {

    list: List;
    listItems: ListItem[];
    listSubscription: Subscription;
    observableList: FirebaseObjectObservable<List>;

    @ViewChild(ModalComponent)
    public readonly modal: ModalComponent;

    constructor(
        private route: ActivatedRoute,
        private listService: ListService,
    ) { }

    ngOnDestroy(): void {
        this.listSubscription.unsubscribe();
    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.observableList = this.listService.get(params['id']);
        });

        this.listSubscription = this.observableList.subscribe(list => {
            this.list = list;
            this.listItems = this.getListItems(list);
        })
    }

    confirmDelete(): void {
        this.modal.show();
    }

    cancel(): void {
        this.modal.hide();
    }

    removeCompletedItems(): void {
        this.listService.removeCompletedListItems(this.list);
    }

    delete(): void {
        this.modal.hide();
    }

    getListItems(list: List): ListItem[] {
        return this.listService.getListItems(list);
    }

    toggleIsDone(item): void {
        item.isDone = !item.isDone;
        this.listService.update(this.observableList, this.list);
    }
}
