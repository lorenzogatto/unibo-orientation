import { Course } from "./course";

export class School {
    name: string;
    color: string;
    courses: Course[];

    constructor() {
        this.courses = [];
    }

    insert(course: Course) {
        this.courses.push(course);
    }
}