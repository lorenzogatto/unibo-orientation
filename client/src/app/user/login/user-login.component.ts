import { Component } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";

@Component({
    selector: 'user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['../shared/shared-user.css']
})
export class UserLoginComponent {
    
    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    error: string;

    constructor(private authenticationService: AuthenticationService, private router: Router) {
        this.password = "";
        this.email = "";
    }

    onSubmit() {
        this.emailError = "";
        this.passwordError = "";
        this.error = "";

        this.authenticationService.login(this.email, this.password).then(response => {
            console.log(response);
            let res = response.json();
            var feedback: string = res.feedback;
            if (feedback === "ok") {
                this.router.navigateByUrl("/home");
            } else if (feedback.indexOf("e-mail") !== -1) {
                this.emailError = "Errore: " + feedback;
            } else if (feedback.indexOf("password") !== -1) {
                this.passwordError = "Errore: " + feedback;
            } else {
                this.error = "Errore: " + feedback;
            }
        }).catch(error => {
            console.log(error);
            if (error.status !== undefined) {
                this.error = "Errore durante il login, riprova più tardi!";
            }
        });
        console.log(this.password, this.email);
    }
}
