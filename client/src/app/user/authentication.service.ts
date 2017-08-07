import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthenticationService {
    private registrationUrl = 'api/user/register';
    private loginUrl = 'api/user/login';
    constructor(private http: Http) { }

    register(username, email, password) {
        let newUser = {
            username: username,
            email: email,
            password: password
        };

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.registrationUrl, JSON.stringify(newUser), options).toPromise();
    }

    login(email, password) {
        let user = {
            email: email,
            password: password
        };

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.loginUrl, JSON.stringify(user), options).toPromise()
            .then(response => {
                var res = response.json();
                if (res.feedback === "ok") {
                    let token = res.token;
                    let user = res.user;
                    console.log(user);
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", JSON.stringify(user));
                }
                return response;
            });
    }

    getLoginToken() {
        return localStorage.getItem("token");
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
}