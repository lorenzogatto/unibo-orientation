import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "./user/authentication.service";

let urlsMatch: string[] = ['/home',
    '/courses',
    '/questionnaire',
    '/forum',
    '/contacts',
    '/user'
];
let urlsForRedirect: string[] = ['/home',
    '/courses',
    '/questionnaire',
    '/forum/questions',
    '/contacts',
    '/user'
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],

})

export class AppComponent {

    constructor(
        public router: Router,
        public authenticationService: AuthenticationService) {
    }

    /**
     * Listens to the swipe event from hammerJS
     * @param direction
     * @param event
     */
    swipe(event) {
        //alert(event.pointerType);
        console.log(event);
        if (this.fromMap(event)) return;
        console.log(event);
        let index = urlsMatch.findIndex((e) => this.router.url.startsWith(e));
        if (index === -1) {
            console.log("Url not found in array");
            return;
        }
        if (event.type === 'swipeleft') {
            index = Math.min(index + 1, urlsMatch.length - 1);
        } else {
            index = Math.max(index - 1, 0);
        }
        this.router.navigateByUrl(urlsForRedirect[index]);
    }

    fromMap(event) {
        let current = event.target;
        while (current) {
            if (current.id === "map")
                return true;
            current = current.parentElement;
        }
        return false;
    }
}
