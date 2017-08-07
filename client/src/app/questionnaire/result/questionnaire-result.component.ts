import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from "./../../app-routing.module";
import { Router } from "@angular/router";
import { QuestionnaireService } from "../questionnaire.service";
import { CourseService } from "../../courses/course.service";
import { CoursesGroup } from "../../shared/CoursesGroup";
import * as $ from 'jquery';

@Component({
    selector: 'questionnaire-result',
    templateUrl: 'questionnaire-result.component.html',
    styleUrls: ['../../courses/courses.component.css']
})
export class QuestionnaireResultComponent implements OnInit {
    courseGroups: CoursesGroup[];

    constructor(
        private router: Router,
        private questionnaireService: QuestionnaireService,
        private courseService: CourseService) { }

    ngOnInit(): void {
        this.questionnaireService.getResult().then(courseGroups => {
            this.courseService.getCourses().then(courses => {
                for (let i = 0; i < courseGroups.length; i++) {
                    courseGroups[i].courses = [];
                    for (let k = 0; k < (<any>courseGroups[i]).courseCodes.length; k++) {
                        for (let z = 0; z < courses.length; z++) {
                            if (courses[z].code === (<any>courseGroups[i]).courseCodes[k])
                                courseGroups[i].courses.push(courses[z]);
                        }
                    }
                }
                this.courseGroups = courseGroups;
            }).catch(reason => alert(reason));
        }).catch(reason => alert(reason));
    }

    accordionClick(event: Event) {
        console.log(event);
        let button: any = event.target;
        button.classList.toggle("active");
        var panel = button.nextElementSibling;
        var xd: any = $(panel)
        xd.slideToggle();
    }


}
