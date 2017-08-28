import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from "../forum.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { AuthenticationService } from "../../user/authentication.service";
import * as $ from 'jquery';
declare var toastr: any;

@Component({
    selector: 'forum-reply',
    templateUrl: 'forum-reply.component.html',
    styleUrls: ['../../shared/forms.scss', 'forum-reply.component.scss']
})
export class ForumReplyComponent{

    @Input() question;

    constructor(private forumService: ForumService, private router: Router, public authenticationService: AuthenticationService) { }

    accordion(event: Event) {
        console.log(event);
        let button: any = event.target;
        var panel = button.nextElementSibling;
        var jPanel: any = $(panel)
        jPanel.slideToggle();
        return false;
    }

    onSubmit(event) {
        let form: HTMLFormElement = event.target;
        let reply = form.elements["reply"].value;
        let question_id = form.elements["_id"].value;
        this.forumService.postReply(question_id, reply)
            .then(() => {
                this.question.reply = reply;
                this.question.reply_username = this.authenticationService.getUser().username;
                this.question.reply_datetime = new Date().getTime();
            })
            .catch(() => toastr.error('Errore, riprovare più tardi', '', { timeOut: 2500 }));
        return false;
    }
}
