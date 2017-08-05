import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "./../../app-routing.module";
import { Router } from "@angular/router";

@Component({
    selector: 'questionnaire-home',
    template: 'Fai il questionario!!!!!',
    styleUrls: []
})
export class QuestionnaireHomeComponent implements OnInit {

    constructor(private router: Router) { }
    ngOnInit(): void {
        
    }


}
