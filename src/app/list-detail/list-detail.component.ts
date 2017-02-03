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
    newListName: string;
    newListItemName: string;
    observableList: FirebaseObjectObservable<List>;

    @ViewChild('confirmModal')
    public readonly confirmModal: ModalComponent;

    @ViewChild('editModal')
    public readonly editModal: ModalComponent;

    @ViewChild('addModal')
    public readonly addModal: ModalComponent;

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
        this.confirmModal.show();
    }

    cancel(): void {
        this.confirmModal.hide();
    }

    cancelAdd(): void {
        this.addModal.hide();
    }

    cancelEdit(): void {
        this.editModal.hide();
    }

    changeListName(): void {
        this.list.name = this.newListName;
        this.editModal.hide();
        this.save();
    }

    removeCompletedItems(): void {
        this.listService.removeCompletedListItems(this.list);
    }

    delete(): void {
        this.confirmModal.hide();
    }

    getListItems(list: List): ListItem[] {
        return this.listService.getListItems(list);
    }

    openAddModal(): void {
        this.newListItemName = 'New List Item';
        this.addModal.show();
    }

    openEditModal(): void {
        this.newListName = this.list.name;
        this.editModal.show();
    }

    save(): void {
        this.listService.update(this.observableList, this.list);
    }

    saveNewListItem(): void {
        this.listService.addListItem(this.list, this.newListItemName).then(() => this.addModal.hide());
    }

    toggleIsDone(item): void {
        item.isDone = !item.isDone;
        this.save();
    }
}
