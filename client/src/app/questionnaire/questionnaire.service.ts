import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";
import { Question } from "./question";

@Injectable()
export class QuestionnaireService {
    private getQuestionsUrl = 'api/get_questions';
    constructor(private http: Http) { }

    getQuestions(): Promise<Question[]> {
        return this.http.get(this.getQuestionsUrl)
            .toPromise()
            .then(response => response.json().data as Question[]);
    }
}