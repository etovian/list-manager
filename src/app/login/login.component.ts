import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})
export class LoginComponent implements OnInit {

    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit() {

    }

    email: string;
    password: string;

    login(): void {
        let credentials = {
            email: this.email,
            password: this.password
        };
        this.loginService.login(credentials).then((isSuccess) => {
            if(isSuccess) {
                this.router.navigate(['/welcome']);
            }
        });
    }

    onKeyup(event): void {
        const ENTER = 13;
        if(event.keyCode === ENTER) {
            this.login();
        }
    }

}
