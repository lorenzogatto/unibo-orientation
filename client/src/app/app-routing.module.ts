import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from "./contacts/contacts.component";
import { PresentationComponent } from "./presentation/presentation.component";
import { CoursesComponent } from "./courses/courses.component";
import { QuestionnaireComponent } from "./questionnaire/questionnaire.component";
import { QuestionsComponent } from "./forum/questions.component";
import { QuestionnaireHomeComponent } from "./questionnaire/home/questionnaire-home.component";
import { QuestionnaireQuestionsComponent } from "./questionnaire/questions/questionnaire-questions.component";
import { QuestionnaireResultComponent } from "./questionnaire/result/questionnaire-result.component";
import { UserRegisterComponent } from "./user/register/user-register.component";
import { UserLoginComponent } from "./user/login/user-login.component";
import { UserComponent } from "./user/user.component";
import { UserInfoComponent } from "./user/info/user-info.component";

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
          path: 'questionnaire/questions',
        component: QuestionnaireQuestionsComponent
    }, {
        path: 'questionnaire/result',
        component: QuestionnaireResultComponent
    }, {
        path: 'questions',
        component: QuestionsComponent
    }, {
        path: 'contacts',
        component: ContactsComponent
    }, {
        path: 'user',
        component: UserComponent
    }, {
        path: 'user/register',
        component: UserRegisterComponent
    }, {
        path: 'user/login',
        component: UserLoginComponent
    }, {
        path: 'user/info',
        component: UserInfoComponent
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