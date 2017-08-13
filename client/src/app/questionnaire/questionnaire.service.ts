import { Headers, Http, RequestOptions } from '@angular/http';
import * as HttpStatus from 'http-status-codes';
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";
import { Question } from "./question";
import { AuthenticationService } from "../user/authentication.service";
import { CoursesGroup } from "../shared/CoursesGroup";

@Injectable()
export class QuestionnaireService {
    private getQuestionsUrl = 'api/questionnaire/get_questions';
    private getResultUrl = 'api/questionnaire/get_result';
    private putAnswersUrl = 'api/questionnaire/put_answers';
    constructor(private http: Http, private authenticationService: AuthenticationService) { }

    getQuestions(): Promise<Question[]> {
        let headers = new Headers();
        headers.append('x-access-token', this.authenticationService.getLoginToken());
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.getQuestionsUrl, options)
            .toPromise()
            .then(response => response.json().data as Question[]);
    }

    putAnswers(answers): Promise<any> {
        let headers = new Headers();
        headers.append('x-access-token', this.authenticationService.getLoginToken());
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        console.log(JSON.stringify(answers));
        return this.http.put(this.putAnswersUrl, JSON.stringify(answers), options)
            .toPromise();
    }

    getResult(): Promise<CoursesGroup[]> {
        let headers = new Headers();
        headers.append('x-access-token', this.authenticationService.getLoginToken());
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.getResultUrl, options)
            .toPromise()
            .then(response => { console.log(response);return response.json() as CoursesGroup[]; })
            .catch(reason => {
                console.log(reason);
                if (reason.status === HttpStatus.UNAUTHORIZED) {
                    this.authenticationService.logout();
                }
                throw reason;
            });
    }
}