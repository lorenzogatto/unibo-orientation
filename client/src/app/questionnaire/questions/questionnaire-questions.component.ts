import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "./../../app-routing.module";
import { Router } from "@angular/router";
import { Question } from "../question";
import { QuestionnaireService } from "../questionnaire.service";
declare var toastr: any;

@Component({
    selector: 'questionnaire-questions',
    templateUrl: 'questionnaire-questions.component.html',
    styleUrls: ['questionnaire-questions.component.scss', '../../shared/forms.scss']
})
export class QuestionnaireQuestionsComponent implements OnInit {
    questions: Question[];
    loadingError: boolean = false;

    constructor(private router: Router, private questionnaireService: QuestionnaireService) { }
    ngOnInit(): void {
        this.questionnaireService.getQuestions()
            .then(questions => {
                this.questions = questions;
                console.log(questions);
            })
            .catch(reason => {
                if (reason.status === 401) {
                    this.router.navigateByUrl("/user/login");
                } else {
                    this.loadingError = true;
                }
            });
    }

    /**
     * When user submits result
     */
    onSubmit() {
        let answers = {};
        let form: HTMLElement = document["questionnaire-form"]
        let inputs = form.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].checked)
                answers[inputs[i].name] = parseInt(inputs[i].value);
        }
        this.questionnaireService.putAnswers(answers).
            then(() => {
                this.router.navigateByUrl("questionnaire/result")
            }).catch(err => {
                console.log(err);
                toastr.error('Errore, riprovare più tardi', '', { timeOut: 2500 })
            });
        return false;
    }


}
