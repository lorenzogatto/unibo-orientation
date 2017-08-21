import { Headers, Http, RequestOptions } from '@angular/http';
import * as HttpStatus from 'http-status-codes';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Injectable, OnInit } from "@angular/core";
import { AuthenticationService } from "../user/authentication.service";
import { CoursesGroup } from "../shared/CoursesGroup";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

/**
 * Class to communicate with the server to get/reply/ask/... questions
 */
@Injectable()
export class ForumService {
    private postQuestionUrl = 'api/forum/post_question';
    private getQuestionsUrl = 'api/forum/get_questions';
    private getQuestionUrl = 'api/forum/get_question';
    private postReplyUrl = 'api/forum/post_reply';
    private deleteQuestionUrl = 'api/forum/delete_question';

    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    /**
     * Submit a new question
     * @param question
     */
    postQuestion(question): Promise<any> {
        let headers = new Headers();
        headers.append('x-access-token', this.authenticationService.getLoginToken());
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify(question));
        return this.http.post(this.postQuestionUrl, JSON.stringify(question), options)
            .toPromise();
    }

    /**
     * Get a list of questions
     * @param query
     */
    getQuestions(query: string): Observable<any[]> {
        let headers = new Headers();
        let token = this.authenticationService.getLoginToken();
        if (token) {
            headers.append('x-access-token', this.authenticationService.getLoginToken());
        }
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.getQuestionsUrl, JSON.stringify({ query: query }), options)
            .map(response => response.json());
    }
    /**
     * Get a single question
     * @param id
     */
    getQuestion(id: string): Observable<any> {
        return this.http.get(this.getQuestionUrl + "?id=" + id)
            .map(response => {
                console.log(response);
                return response.json()
            });
    }

    /**
     * Reply to a question
     * @param _id
     * @param reply
     */
    postReply(_id, reply): Promise<any> {
        let headers = new Headers();
        headers.append('x-access-token', this.authenticationService.getLoginToken());
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify({ _id: _id, reply: reply }));
        return this.http.post(this.postReplyUrl, JSON.stringify({ _id: _id, reply: reply }), options)
            .toPromise();
    }

    /**
     * Delete a question.
     * @param _id
     */
    deleteQuestion(_id): Promise<any> {
        let headers = new Headers();
        headers.append('x-access-token', this.authenticationService.getLoginToken());
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.deleteQuestionUrl + "?id=" + _id, options)
            .toPromise();
    }
}