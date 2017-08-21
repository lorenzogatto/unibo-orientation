import { Component, OnInit } from '@angular/core';
import { ForumService } from "../forum.service";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../user/authentication.service";

@Component({
    selector: 'forum-ask',
    templateUrl: 'forum-ask.component.html',
    styleUrls: ['../../shared/forms.scss']
})
export class ForumAskComponent implements OnInit {

    error: string = "";

    constructor(
        private forumService: ForumService,
        private router: Router,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        if (!this.authenticationService.isLoggedIn()) {
            this.router.navigateByUrl("/user/login");
        }
    }

    /**
     * When the user asks a question
     */
    onSubmit() {
        this.error = "";
        let form = document.forms["ask-form"];
        let question: any = {};
        question.question = form.question.value;
        question.details = form.details.value;
        if (!this.validate(question)) return false;
        this.forumService.postQuestion(question)
            .then(v => this.router.navigateByUrl("forum/questions"))
            .catch(err => {
                this.error = "Errore, riprovare più tardi!";
                console.log(err);
            });
        return false;
    }

    validate(question) { //beyond HTML5 validation
        question.details = question.details.trim();
        let nLines = question.details.split(/\r\n|\r|\n/).length;
        console.log(question.details, " asd", nLines);
        if (nLines > 5) {
            this.error = "Errore, i dettagli possono essere di massimo 5 righe";
            return false;
        }
        return true;
    }
}
