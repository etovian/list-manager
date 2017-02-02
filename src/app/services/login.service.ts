import { Injectable } from '@angular/core';
import {AngularFire} from 'angularfire2';
import Thenable = firebase.Thenable;

@Injectable()
export class LoginService {

    constructor(private af: AngularFire) { }

    login(credentials): Thenable<any> {
        return this.af.auth.login(credentials)
            .then((auth) => {
                console.log('Login success!', auth);
                return true;
            }).catch( error => console.log(error));
    }

    logout(): Promise<any> {
        return this.af.auth.logout();
    }
}
