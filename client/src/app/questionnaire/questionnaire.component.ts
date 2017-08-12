import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "./../app-routing.module";
import { Router } from "@angular/router";
import { QuestionnaireService } from "./questionnaire.service";

@Component({
    selector: 'questionnaire',
    template: '<h2>&nbsp;</h2><sk-circle></sk-circle>',
    styleUrls: []
})
export class QuestionnaireComponent implements OnInit {

    constructor(private router: Router, private questionnaireService: QuestionnaireService) { }
    ngOnInit(): void {
        this.questionnaireService.getResult()
            .then(() => {
                if (this.router.url.indexOf("questionnaire") != -1)
                  this.router.navigateByUrl("/questionnaire/result");
            })
            .catch(() => {
                if (this.router.url.indexOf("questionnaire") != -1)
                  this.router.navigateByUrl("/questionnaire/home");
            });
    }


}
