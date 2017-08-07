import { Course } from "../courses/course";

export class CoursesGroup {
    name: string;
    courses: Course[];

    constructor() {
        this.courses = [];
    }

    insert(course: Course) {
        this.courses.push(course);
    }
}