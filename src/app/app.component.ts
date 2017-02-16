import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoginService} from "./services/login.service";
import {AuthorizedUser} from "./classes/authorized-user";
import {Router} from "@angular/router";
import {AuthorizedUserService} from "./services/authorized-user.service";
import {Subscription} from "rxjs";
import {AngularFire} from "angularfire2";
import {NotificationService} from "./services/notification.service";

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
        private router: Router,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        this.subscribeToAuth();
        this.notificationService.addNotification({
            title: 'Howdy!',
            text: 'Welcome to the List Manager',
            type: 'info',
            pinned: false
        });
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
        this.authorizationSubscription = this.af.auth.subscribe(auth => {
            if(auth) {
                this.authorizedUserService.get(auth.uid).subscribe(snapshot => {
                    this.currentUser = snapshot.val();
                });
            } else {
                this.currentUser = null;
            }
        });
    }
}
