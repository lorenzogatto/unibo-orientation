import { Component } from '@angular/core';
import { Router } from "@angular/router";

let urls: string[] = ['/home',
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
        console.log(event);
        //event.preventDefault();
        let index = urls.findIndex((e) => e === this.router.url);
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
