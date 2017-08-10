import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from "../forum.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import * as $ from 'jquery';
@Component({
    selector: 'forum-reply',
    templateUrl: 'forum-reply.component.html',
    styleUrls: ['../../shared/forms.scss', 'forum-reply.component.scss']
})
export class ForumReplyComponent{

    @Input() question;
    

    constructor(private forumService: ForumService, private router: Router) { }

    accordion(event: Event) {
        console.log(event);
        let button: any = event.target;
        var panel = button.nextElementSibling;
        var xd: any = $(panel)
        xd.slideToggle();
        return false;
    }

    onSubmit(x) {
        let form: HTMLFormElement = x.target;
        console.log(x);
        let reply = form.elements["reply"].value;
        let question_id = form.elements["_id"].value;
        this.forumService.postReply(question_id, reply)
            .then(() => this.question.reply = reply)
            .catch(() => alert("OBAMA"));
        return false;
    }
}
