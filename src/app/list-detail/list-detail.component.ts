import {Component, OnInit, ViewChild, OnDestroy, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ListService} from '../services/list.service';

import { List } from '../classes/list';
import {ListItem} from "../classes/list-item";
import {FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {ModalComponent} from "../modal/modal.component";
import {Subscription, Observable} from "rxjs";
import {EventEmitter} from "@angular/common/src/facade/async";
import {CommonItemsService} from "../services/common-items.service";
import {NotificationService} from "../services/notification.service";
import {MdSidenav} from "@angular/material";
import {DialogService} from "../services/dialog.service";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'app-list-detail',
    templateUrl: './list-detail.component.html',
    styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit, OnDestroy {

    commonItems = [];
    commonItemsObservable: FirebaseListObservable<any>;
    commonItemsSubscription: Subscription;
    filteredCommonItems: Observable<string[]>;
    list: List;
    listItems: ListItem[];
    listSubscription: Subscription;
    newItemControl = new FormControl();
    newListName: string;
    newListItemName: string;
    observableList: FirebaseObjectObservable<List>;
    private readonly AUTO_FOCUS_DELAY = 500;

    //view children
    @ViewChild('confirmModal')
    public readonly confirmModal: ModalComponent;

    @ViewChild('sidenav')
    // public readonly addModal: ModalComponent;
    public readonly sidenav: MdSidenav;

    //modal focus events
    public addModalFocusTriggeringEventEmitter = new EventEmitter<boolean>();

    constructor(
        private route: ActivatedRoute,
        private listService: ListService,
        private commonItemsService: CommonItemsService,
        private router: Router,
        private notificationService: NotificationService,
        private dialogService: DialogService,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnDestroy(): void {
        this.listSubscription.unsubscribe();
        this.commonItemsSubscription.unsubscribe();
    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.observableList = this.listService.get(params['id']);
        });

        this.listSubscription = this.observableList.subscribe(list => {
            this.list = list;
            this.listItems = this.getListItems(list);
        });

        this.commonItemsObservable = this.commonItemsService.getAll();
        this.commonItemsSubscription = this.commonItemsObservable.subscribe(commonItems => {
            this.commonItems = this.commonItemsService.getSortedItems(commonItems);
        });

        this.filteredCommonItems = this.newItemControl.valueChanges
            .startWith(null)
            .map(val => val ? this.filterCommonItems(val) : this.commonItems.slice());
    }

    confirmDelete(): void {
        this.dialogService
            .confirm('Delete List', `Are you sure you want to delete ${this.list.name}?`, this.viewContainerRef)
            .subscribe(confirm => {
                if(confirm) {
                    this.delete();
                }
            });
    }

    cancel(): void {
        this.confirmModal.hide();
    }

    cancelAdd(): void {
        this.sidenav.toggle();
    }

    changeListName(): void {
        this.list.name = this.newListName;
        this.save();
    }

    filterCommonItems(val: string): string[] {
        return this.commonItems.filter(item => item.name.toLowerCase().includes(val.toLowerCase()));
    }

    removeCompletedItems(): void {
        this.listService.removeCompletedListItems(this.list);
    }

    delete(): void {
        let listName = this.list.name;
        this.listService.deleteList(this.observableList).then(() => {
            this.router.navigate(['/lists']);
            this.notificationService.addNotification({
                title: 'Deleted',
                text: `${listName} was deleted.`,
                type: 'danger',
                pinned: false
            });
        });

    }

    getListItems(list: List): ListItem[] {
        return this.listService.getListItems(list);
    }

    openSidebar(): void {
        this.newListItemName = 'New List Item';
        this.newListName = this.list.name;
        this.sidenav.toggle();
        if(this.sidenav.opened) {
            setTimeout(() => {
                this.addModalFocusTriggeringEventEmitter.emit(true);
            }, this.AUTO_FOCUS_DELAY);
        }
    }

    save(): void {
        this.listService.update(this.observableList, this.list);
    }

    saveNewListItem(): void {
        this.listService.addListItem(this.list, this.newListItemName)
            .then(() => {
                this.addModalFocusTriggeringEventEmitter.emit(true);
                this.notificationService.addNotification({
                    title: 'Item Added',
                    text: `${this.newListItemName} was added to the list.`,
                    type: 'success',
                    pinned: false
                });
            });
    }

    toggleIsDone(item): void {
        item.isDone = !item.isDone;
        this.save();
    }
}
