import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ListService} from "../services/list.service";

@Injectable()
export class ListsResolverService implements Resolve<any> {

    constructor(private listService: ListService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
        /*
         Firebase observables must be wrapped in a Promise.resolve
         for routing; otherwise the route is not resolved
         not sure why this is happening, but there's much discussion about it here:
         https://github.com/angular/angularfire2/issues/624
         */
        return Promise.resolve(this.listService.getAll());
    }
}
