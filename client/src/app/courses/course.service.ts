import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";
import { Course } from "./course";
import { School } from "./school";

@Injectable()
export class CourseService {
    private getCoursesUrl = 'api/get_courses';
    constructor(private http: Http) { }

    getCourses(): Promise<Course[]> {
        return this.http.get(this.getCoursesUrl)
            .toPromise()
            .then(response => response.json().data as Course[]);
    }

    getCoursesBySchool(): Promise<School[]> {
        return this.getCourses().then((courses) => {
            let schools = {};//map from school name to school object
            for (let i = 0; i < courses.length; i++) {
                let schoolName = courses[i].school.name;
                if (schools[schoolName] === undefined) {
                    schools[schoolName] = new School();
                    schools[schoolName].name = schoolName;
                    schools[schoolName].color = courses[i].school.color;
                }
                schools[schoolName].insert(courses[i]);
            }
            return Object.keys(schools).map(v => schools[v]);
        });
    }
}