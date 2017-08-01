import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from "./contacts.component";
import { PresentationComponent } from "./presentation.component";

const routes: Routes = [
    {
        path: 'home',
        component: PresentationComponent
    },
    {
        path: 'contacts',
        component: ContactsComponent
    },
    {
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