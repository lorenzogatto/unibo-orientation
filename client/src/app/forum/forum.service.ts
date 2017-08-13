import { Headers, Http, RequestOptions } from '@angular/http';
import * as HttpStatus from 'http-status-codes';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Injectable, OnInit } from "@angular/core";
import { AuthenticationService } from "../user/authentication.service";
import { CoursesGroup } from "../shared/CoursesGroup";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
declare var EventSource: any

@Injectable()
export class ForumService {
        

    private postQuestionUrl = 'api/forum/post_question';
    private getQuestionsUrl = 'api/forum/get_questions';
    private getQuestionUrl = 'api/forum/get_question';
    private postReplyUrl = 'api/forum/post_reply';
    private notificationsUrl = '/api/notifications/get_new_replies_number';
    private resetNotificationUrl = '/api/notifications/reset';
    private notificationsSubject: Subject<number>;

    constructor(private http: Http, private authenticationService: AuthenticationService) {
        this.notificationsSubject = new Subject<number>();
        this.SSEConnect();
    }

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
        this.resetNotifications();
        return this.http.put(this.getQuestionsUrl, JSON.stringify({ query: query }), options)
            .map(response => response.json());
    }

    getQuestion(id: string): Observable<any> {
        return this.http.get(this.getQuestionUrl + "?id=" + id)
            .map(response => {
                console.log(response);
                return response.json()
            });
    }

    postReply(_id, reply): Promise<any> {
        let headers = new Headers();
        headers.append('x-access-token', this.authenticationService.getLoginToken());
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify({_id: _id, reply: reply}));
        return this.http.post(this.postReplyUrl, JSON.stringify({ _id: _id, reply: reply }), options)
            .toPromise();
    }

    getNewRepliesNumber(): Observable<number> {
        return this.notificationsSubject;
    }

    private SSEConnect() {
        let email = "";
        if (this.authenticationService.getUser())
            email = this.authenticationService.getUser().email
        if (typeof (EventSource) !== "undefined") {
            var source = new EventSource(this.notificationsUrl + "?email=" + email);
            source.onmessage = event => {
                //alert(event.data);
                //console.log(event.data);
                this.notificationsSubject.next(parseInt(event.data));
            };
            //source.onopen = () => console.log("SSE opened");
            source.onerror = () => {
                source.close();//to avoid reopening of same source
                setTimeout(() => this.SSEConnect(), 10000);
            };
        }
    }

    private resetNotifications() {
        let headers = new Headers();
        let token = this.authenticationService.getLoginToken();
        if (token) {
            headers.append('x-access-token', this.authenticationService.getLoginToken());
        }
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        //console.log(JSON.stringify(question));
        return this.http.get(this.resetNotificationUrl, options).toPromise().catch(err => console.log(err));
    }
}