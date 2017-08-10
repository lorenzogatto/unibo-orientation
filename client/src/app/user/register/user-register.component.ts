import { Component } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
    selector: 'user-register',
    templateUrl: './user-register.component.html',
    styleUrls: ['../../shared/forms.scss']
})
export class UserRegisterComponent {

    username: string;
    usernameError: string;
    email: string;
    emailError: string;
    password: string;
    error: string;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.username = "";
        this.password = "";
        this.email = "";
    }

    onSubmit() {
        this.usernameError = "";
        this.emailError = "";

        this.authenticationService.register(this.username, this.email, this.password).then(response => {
            console.log(response);
            let res = response.json().data;
            if (res.feedback === "ok") {
                this.router.navigateByUrl("/user/login");
            } else if (res.feedback === "username") {
                this.usernameError = "Errore: username già in uso";
            } else if (res.feedback === "email") {
                this.emailError = "Errore: indirizzo e-mail già in uso";
            } else {
                this.error = "Errore imprevisto!";
            }
        }).catch(error => {
            console.log(error);
            if (error.status !== undefined) {
                this.error = "Errore durante la registrazione, riprova più tardi!";
            }
        });
        console.log(this.username, this.password, this.email);
    }
}
