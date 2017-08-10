import { Component } from '@angular/core';
import { ForumService } from "../forum.service";
import { Router } from "@angular/router";

@Component({
    selector: 'forum-ask',
    templateUrl: 'forum-ask.component.html',
    styleUrls: ['../../shared/forms.scss']
})
export class ForumAskComponent {
    error: boolean = false;

    constructor(private forumService: ForumService, private router: Router) { }

    onSubmit() {
        this.error = false;
        let form = document.forms["ask-form"];
        let question: any = {};
        question.question = form.question.value;
        question.details = form.details.value;
        this.forumService.postQuestion(question)
            .then(v => this.router.navigateByUrl("forum/questions"))
            .catch(err => {
                this.error = true;
                console.log(err);
            });
        return false;
    }
}
