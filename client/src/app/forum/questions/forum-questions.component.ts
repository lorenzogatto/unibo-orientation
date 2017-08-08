import { Component, OnInit } from '@angular/core';
import { ForumService } from "../forum.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from "rxjs/Subject";
@Component({
    selector: 'forum-questions',
    templateUrl: 'forum-questions.component.html',
    styleUrls: ['../../shared/forms.css', 'forum-questions.component.css']
})
export class ForumQuestionsComponent implements OnInit {

    private searchTerms = new Subject<string>();
    public questions: Observable<any>;
    


    constructor(private forumService: ForumService, private router: Router) { }
    ngOnInit(): void {
        this.questions = this.searchTerms
            //.debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            //.subscribe((next) => alert(next))
            .switchMap(query =>    // switch to new observable each time the term changes
                // return the http search observable
                 this.forumService.getQuestions(query))
                // or the observable of empty heroes if there was no search term
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<any[]>([]);
            });

        setTimeout(() => this.search(""), 1);
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

}
