import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from "./contacts/contacts.component";
import { PresentationComponent } from "./presentation/presentation.component";
import { AppRoutingModule } from "./app-routing.module";
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CoursesComponent } from "./courses/courses.component";
import { QuestionnaireComponent } from "./questionnaire/questionnaire.component";
import { HammerInstance } from "@angular/platform-browser/src/dom/events/hammer_gestures";
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import "hammerjs";
import { CourseService } from "./courses/course.service";
import { HttpModule } from "@angular/http";
import { QuestionnaireHomeComponent } from "./questionnaire/home/questionnaire-home.component";
import { QuestionnaireQuestionsComponent } from "./questionnaire/questions/questionnaire-questions.component";
import { QuestionnaireResultComponent } from "./questionnaire/result/questionnaire-result.component";
import { QuestionnaireService } from "./questionnaire/questionnaire.service";
import { UserRegisterComponent } from "./user/register/user-register.component";
import { AuthenticationService } from "./user/authentication.service";
import { UserLoginComponent } from "./user/login/user-login.component";
import { UserInfoComponent } from "./user/info/user-info.component";
import { UserComponent } from "./user/user.component";
import { ForumQuestionsComponent } from "./forum/questions/forum-questions.component";
import { ForumAskComponent } from "./forum/ask/forum-ask.component";
import { ForumService } from "./forum/forum.service";
import { ForumReplyComponent } from "./forum/reply/forum-reply.component";
import { NgSpinKitModule } from 'ng-spin-kit';
import { NewTextareaComponent } from "./shared/new-textarea/new-textarea.component";
import { ForumDetailComponent } from "./forum/detail/forum-detail.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsService } from "./notifications/notifications.service";
import { NotificationsComponent } from "./notifications/notifications.component";
//import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ClipboardModule } from 'ngx-clipboard';


delete Hammer.defaults.cssProps.userSelect;
export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'swipe': { velocity: 0.4, threshold: 10 }, // override default settings
        'pinch': { enable: false },
        'rotate': { enable: false },
    };
}

@NgModule({
  declarations: [
      AppComponent,
      PresentationComponent,
      CoursesComponent,
      QuestionnaireComponent,
      QuestionnaireHomeComponent,
      QuestionnaireQuestionsComponent,
      QuestionnaireResultComponent,
      ForumQuestionsComponent,
      ForumAskComponent,
      ForumReplyComponent,
      ForumDetailComponent,
      ContactsComponent,
      UserRegisterComponent,
      UserLoginComponent,
      UserComponent,
      UserInfoComponent,
      NewTextareaComponent,
      NotificationsComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpModule,
      FormsModule,
      InfiniteScrollModule,
      NgSpinKitModule,
      BrowserAnimationsModule,
      ClipboardModule
      //ToastModule.forRoot()
  ],
  providers: [{
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
  },
      CourseService,
      QuestionnaireService,
      AuthenticationService,
      ForumService,
      NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
