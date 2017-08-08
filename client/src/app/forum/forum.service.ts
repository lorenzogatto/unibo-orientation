import { Headers, Http, RequestOptions } from '@angular/http';
import * as HttpStatus from 'http-status-codes';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../user/authentication.service";
import { CoursesGroup } from "../shared/CoursesGroup";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ForumService {
    private postQuestionUrl = 'api/forum/post_question';
    private getQuestionsUrl = 'api/forum/get_questions';
    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    postQuestion(question): Promise<any> {
        let headers = new Headers();
        headers.append('x-access-token', this.authenticationService.getLoginToken());
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify(question));
        return this.http.post(this.postQuestionUrl, JSON.stringify(question), options)
            .toPromise();
    }

    getQuestions(query: string): Observable<any[]> {
        let headers = new Headers();
        let token = this.authenticationService.getLoginToken();
        if (token) {
            headers.append('x-access-token', this.authenticationService.getLoginToken());
        }
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        //console.log(JSON.stringify(question));
        return this.http.put(this.getQuestionsUrl, JSON.stringify({ query: query }), options)
            .map(response => response.json());;
    }
}