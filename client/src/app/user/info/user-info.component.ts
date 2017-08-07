import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
    selector: 'user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['../../shared/forms.css']
})
export class UserInfoComponent implements OnInit {
    user;
    constructor(private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit(): void {
        if (!this.authenticationService.getLoginToken()) {
            this.router.navigateByUrl("/user/login");
        }
        this.user = this.authenticationService.getUser()
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigateByUrl("/user/login");
    }
}
