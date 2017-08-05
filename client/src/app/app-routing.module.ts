import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from "./contacts/contacts.component";
import { PresentationComponent } from "./presentation/presentation.component";
import { CoursesComponent } from "./courses/courses.component";
import { QuestionnaireComponent } from "./questionnaire/questionnaire.component";
import { QuestionsComponent } from "./forum/questions.component";
import { QuestionnaireHomeComponent } from "./questionnaire/home/questionnaire-home.component";

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
        path: 'questionnaire/home',
        component: QuestionnaireHomeComponent
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