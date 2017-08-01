import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactsComponent } from "./contacts.component";
import { PresentationComponent } from "./presentation.component";
import { AppRoutingModule } from "./app-routing.module";
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        'swipe': { velocity: 0.4, threshold: 10 }, // override default settings
        'pinch': { enable: false },
        'rotate': { enable: false }
    }
}


@NgModule({
  declarations: [
      AppComponent,
      PresentationComponent,
      ContactsComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule
  ],
  providers: [{
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
