import { Component, OnInit } from '@angular/core';
import { ForumService } from "../forum.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from "rxjs/Subject";
@Component({
    selector: 'forum-detail',
    templateUrl: 'forum-detail.component.html',
    styleUrls: ['../../shared/forms.scss', 'forum-detail.component.scss']
})
export class ForumDetailComponent implements OnInit {
        
    question;
    error: string;

    constructor(private forumService: ForumService, private router: Router, private route: ActivatedRoute) { }
    ngOnInit(): void {
        this.route.paramMap.switchMap((params: ParamMap) => this.forumService.getQuestion(params.get('id')))
            .subscribe(question => this.question = question);
    }
}
