import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    styleUrls: ['../../shared/forms.scss']
})
export class ForumQuestionsComponent implements OnInit {
    replyQuestion: any;
    loadingError: boolean = false;

    public currentQueryString: string;
    public showedQuestions: any[];
    private hiddenQuestions: any[];
    private nextQueryString: string;
    private searchTerms = new Subject<string>();
    private questions: Observable<any>;

    constructor(private forumService: ForumService, private router: Router) { }
    ngOnInit(): void {
        this.questions = this.searchTerms
            //.debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(query => { // switch to new observable each time the term changes
                this.nextQueryString = query;
                return this.forumService.getQuestions(query);// return the http search observable
            })
            .catch(error => {
                console.log(error);
                this.loadingError = true;
                return Observable.of<any[]>([]);
            });
        this.questions.subscribe((next: any[]) => {
            this.currentQueryString = this.nextQueryString;
            this.hiddenQuestions = next;
            this.showedQuestions = next.slice(0, 10);
        });
        setTimeout(() => this.search(""), 1);
    }

    // Push a search term into the observable stream.
    search(term: string): void {
        this.searchTerms.next(term);
    }

    onScrollDown() {
        console.log('scrolled down!');
        let newQuestions = this.hiddenQuestions.slice(this.showedQuestions.length, this.showedQuestions.length + 10);
        console.log(this.hiddenQuestions);
        console.log(newQuestions);
        this.showedQuestions = this.showedQuestions.concat(newQuestions);
    }   
}
