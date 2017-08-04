import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from "./contacts.component";
import { PresentationComponent } from "./presentation.component";
import { CoursesComponent } from "./courses.component";
import { QuestionnaireComponent } from "./questionnaire.component";
import { QuestionsComponent } from "./questions.component";

const routes: Routes = [{
        path: 'home',
        component: PresentationComponent

    }, {
        path: 'courses',
        component: CoursesComponent
    }, {
        path: 'questionnaire',
        component: QuestionnaireComponent
    }, {
        path: 'questions',
        component: QuestionsComponent
    }, {
        path: 'contacts',
        component: ContactsComponent
    }, {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }