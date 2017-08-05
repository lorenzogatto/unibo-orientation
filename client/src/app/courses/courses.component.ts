import { Component, OnInit } from '@angular/core';
import { CourseService } from "./course.service";
import { Course } from "./course";
import { School } from "./school";
import * as $ from 'jquery';

@Component({
    selector: 'courses',
    templateUrl: './courses.component.html',
    styleUrls: ['courses.component.css'],
})
export class CoursesComponent implements OnInit {

    public schools: School[];
    private schoolNames: string[];
    private errorGettingCourses: boolean = false;
    constructor(private courseService: CourseService) { }

    ngOnInit(): void {
        this.courseService.getCoursesBySchool()
            .then((schools) => {
                this.schools = schools;
                console.log(schools);
            })
            .catch((err) => {
                this.errorGettingCourses = true;
                console.log("Errore " + err)
            });
    }
    accordionClick(event: Event) {
        console.log(event);
        let button: any = event.target;
        button.classList.toggle("active");
        var panel = button.nextElementSibling;
        var xd: any = $(panel)
        xd.slideToggle();
        console.log("Cmin");
        /*if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            //setTimeout(() => { panel.style.maxHeight = 'none'; }, 500);
        }*/
        
    }
}
