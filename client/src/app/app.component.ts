import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
import { AuthenticationService } from "./user/authentication.service";
import { ForumService } from "./forum/forum.service";

let urls: string[] = ['/home',
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

export class AppComponent implements OnInit {

    newRepliesNumber: string = "";

    constructor(public router: Router, public authenticationService: AuthenticationService, private forumService: ForumService,
        private changeDetector: ChangeDetectorRef ) { }

    ngOnInit(): void {
        this.forumService.getNewRepliesNumber()
            .subscribe((newReplies) => {
                this.newRepliesNumber = newReplies.toString();
                this.changeDetector.detectChanges();
                console.log("nnn", newReplies);
            });
    }


    swipe(direction: string, event) {
        //alert(event.pointerType);
        if (this.fromMap(event)) return;
        console.log(event);
        let index = urls.findIndex((e) => this.router.url.startsWith(e));
        if (index === -1) {
            console.log("Url not found in array");
            return;
        }
        if (direction === 'left') {
            index = Math.min(index + 1, urls.length - 1);
        } else {
            index = Math.max(index - 1, 0);
        }
        this.router.navigateByUrl(urls[index]);
    }
    fromMap(event) {
        let path: any[] = event.srcEvent.path;
        for (let i = 0; i < path.length; i++)
            if (path[i].id === "map")
                return true;
        return false;
    }
}
