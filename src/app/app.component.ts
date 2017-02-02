import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoginService} from "./services/login.service";
import {AuthorizedUser} from "./classes/authorized-user";
import {Router} from "@angular/router";
import {AuthorizedUserService} from "./services/authorized-user.service";
import {Subscription} from "rxjs";
import {AngularFire} from "angularfire2";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    authorizationSubscription: Subscription;
    title = 'List Manager';
    currentUser: AuthorizedUser = null;

    constructor(
        private loginService: LoginService,
        private af: AngularFire,
        private authorizedUserService: AuthorizedUserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        console.log('app component init fired');
        this.subscribeToAuth();
    }

    ngOnDestroy(): void {
        this.authorizationSubscription.unsubscribe();
    }

    logout(): void {
        this.loginService.logout().then(() => console.log('logged out'));
        this.currentUser = null;
        this.router.navigate(['/login']);
    }

    subscribeToAuth(): void {
        console.log('subscribe to auth fired');
        this.authorizationSubscription = this.af.auth.subscribe(auth => {
            console.log('subscribe to auth callback fired');
            if(auth) {
                console.log('auth.uid is truthy');
                this.authorizedUserService.get(auth.uid).subscribe(snapshot => {
                    this.currentUser = snapshot.val();
                });
            } else {
                this.currentUser = null;
            }
        });
    }
}
