import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "./../../app-routing.module";
import { Router } from "@angular/router";
import { Question } from "../question";
import { QuestionnaireService } from "../questionnaire.service";

@Component({
    selector: 'questionnaire-questions',
    templateUrl: 'questionnaire-questions.component.html',
    styleUrls: ['questionnaire-questions.component.css', '../../shared/forms.css']
})
export class QuestionnaireQuestionsComponent implements OnInit {
    questions: Question[] = [];

    constructor(private router: Router, private questionnaireService: QuestionnaireService) { }
    ngOnInit(): void {
        this.questionnaireService.getQuestions()
            .then(questions => {
                this.questions = questions;
                console.log(questions);
            })
            .catch(reason => console.log(reason));//TODO
    }

    onSubmit() {
        let answers = {};
        let form: HTMLElement = document["questionnaire-form"]
        let inputs = form.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked)
                answers[inputs[i].name] = parseInt(inputs[i].value);
        }
        this.questionnaireService.putAnswers(answers).
            then((x) => {
                this.router.navigateByUrl("questionnaire/result")
            }).catch(e => console.log(e));//TODO print error
        return false;
    }


}
