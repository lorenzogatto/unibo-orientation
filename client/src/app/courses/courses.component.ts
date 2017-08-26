import { Component, OnInit } from '@angular/core';
import { CourseService } from "./course.service";
import { Course } from "./course";
import { School } from "./school";
import * as $ from 'jquery';
import { accordionToggle } from "../shared/accordion/accordion";

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styleUrls: ['../shared/accordion/accordion.scss'],
})
export class CoursesComponent implements OnInit {

    public schools: School[];
    private schoolNames: string[];
    public loadingError: boolean = false;

    constructor(private courseService: CourseService) { }

    ngOnInit(): void {
        this.courseService.getCoursesBySchool()
            .then((schools) => {
                this.schools = schools;
                console.log(schools);
            })
            .catch((err) => {
                this.loadingError = true;
                console.log("Errore " + err)
            });
    }
    accordionClick(event: Event) {
        accordionToggle(event);
    }
}
