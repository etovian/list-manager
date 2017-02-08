import { Injectable } from '@angular/core';

@Injectable()
export class UnderscoreService {

    //there is much debate about how to install third-party libraries
    //TODO: figure out a better way than referencing a global variable
    private _ = window["_"];

    constructor() { }

    get(): any {
        return this._;
    }

}
