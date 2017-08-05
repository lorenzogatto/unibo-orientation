import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "./../app-routing.module";
import { Router } from "@angular/router";

@Component({
    selector: 'questionnaire',
    template: '<br/><br/><br/><br/><br/><br/><br/><br/>question?',
    styleUrls: []
})
export class QuestionnaireComponent implements OnInit {

    constructor(private router: Router) { }
    ngOnInit(): void {
        if (1 == 1) {
            this.router.navigateByUrl("/questionnaire/home");
        }
    }


}
