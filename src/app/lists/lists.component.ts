import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FirebaseListObservable } from 'angularfire2';
import { List } from '../classes/list';
import { ListService } from '../services/list.service';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css'],
    providers: [ListService]
})
export class ListsComponent implements OnInit {

    lists: FirebaseListObservable<List[]>;

    constructor(
        private listService: ListService,
        private router: Router,
        private route: ActivatedRoute
    ) { }


    ngOnInit() {
        this.lists = this.route.snapshot.data['lists'];
    }

    goToDetail(list: List): void {
        this.router.navigate(['/list', list.$key])
    }
}
