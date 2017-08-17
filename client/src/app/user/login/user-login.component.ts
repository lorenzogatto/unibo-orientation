import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authentication.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
declare var toastr: any;

@Component({
    selector: 'user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['../../shared/forms.scss']
})
export class UserLoginComponent implements OnInit {

    email: string;
    emailError: string;
    password: string;
    passwordError: string;
    error: string;

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {

        this.password = "";
        this.email = "";
    }

    ngOnInit(): void {
        console.log("Accan");
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            console.log(typeof params['validate']);
            let isValidate: boolean = typeof params['validate'] !== "undefined";
            if (isValidate) {
                toastr.success('Account attivato con successo','',  { timeOut: 2500 });
            }
        });
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
