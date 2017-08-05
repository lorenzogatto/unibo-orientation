import { Component } from '@angular/core';
import { Router } from "@angular/router";

let urls: string[] = ['/home',
    '/courses',
    '/questionnaire',
    '/questions',
    '/contacts'
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {
    constructor(private router: Router) {
        this.router = router;
    }
    swipe(direction: string, event) {
        //alert(event.pointerType);
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
}
