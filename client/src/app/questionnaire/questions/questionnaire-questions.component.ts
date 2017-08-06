import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "./../../app-routing.module";
import { Router } from "@angular/router";
import { Question } from "../question";
import { QuestionnaireService } from "../questionnaire.service";

@Component({
    selector: 'questionnaire-questions',
    templateUrl: 'questionnaire-questions.component.html',
    styleUrls: ['questionnaire-questions.component.css']
})
export class QuestionnaireQuestionsComponent implements OnInit {
    questions: Question[];

    constructor(private router: Router, private questionnaireService: QuestionnaireService) { }
    ngOnInit(): void {
        this.questionnaireService.getQuestions()
            .then(questions => this.questions = questions)
            .catch(reason => console.log(reason));
    }


}
