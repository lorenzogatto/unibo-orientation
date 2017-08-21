import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";

/**
 * Service to manage authentication.
 * It allows to register, login, logout, ecc..
 * If a user is logged there will be a token saved locally.
 */
@Injectable()
export class AuthenticationService {
    private registrationUrl = 'api/user/register';
    private loginUrl = 'api/user/login';
    constructor(private http: Http) { }

    /**
     * Register a new user
     * @param username
     * @param email
     * @param password
     */
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

    /**
     * If a user is logged in there will be a token saved locally.
     * It is needed to authenticate in some pages by putting it in 'x-access-token' header.
     */
    getLoginToken(): string {
        return localStorage.getItem("token");
    }

    getUser(): string {
        return JSON.parse(localStorage.getItem("user"));
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    isLoggedIn(): boolean {
        return this.getLoginToken()? true : false;
    }
}