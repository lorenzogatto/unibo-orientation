import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Component({
    selector: 'user-redirect',
    template: ''
})
export class UserComponent implements OnInit {

    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit(): void {
        if (this.authenticationService.getLoginToken) {
            this.router.navigateByUrl("/user/info");
        } else {
            this.router.navigateByUrl("/user/login");
        }
    }
}