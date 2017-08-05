﻿import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from "./contacts/contacts.component";
import { PresentationComponent } from "./presentation/presentation.component";
import { AppRoutingModule } from "./app-routing.module";
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CoursesComponent } from "./courses/courses.component";
import { QuestionnaireComponent } from "./questionnaire/questionnaire.component";
import { QuestionsComponent } from "./forum/questions.component";
import { HammerInstance } from "@angular/platform-browser/src/dom/events/hammer_gestures";
import "hammerjs";
import { CourseService } from "./courses/course.service";
import { HttpModule } from "@angular/http";
import { QuestionnaireHomeComponent } from "./questionnaire/home/questionnaire-home.component";


delete Hammer.defaults.cssProps.userSelect;
export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'swipe': { velocity: 0.4, threshold: 10 }, // override default settings
        'pinch': { enable: false },
        'rotate': { enable: false },
    };
    /*buildHammer(element: HTMLElement): HammerInstance {
        let mc = new Hammer(element, { touchAction: 'pan-y' });
        mc.on('pinch', e => { alert(e);})
        return mc;
    }*/

}

@NgModule({
  declarations: [
      AppComponent,
      PresentationComponent,
      CoursesComponent,
      QuestionnaireComponent,
      QuestionnaireHomeComponent,
      QuestionsComponent,
      ContactsComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpModule
  ],
  providers: [{
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
  }, CourseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
