import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";
import { SessionStorage } from "../shared/sessionStorage";

/**
 * Service to manage authentication.
 * It allows to register, login, logout, ecc..
 * If a user is logged there will be a token saved locally.
 */
@Injectable()
export class AuthenticationService {
    private registrationUrl = 'api/user/register';
    private loginUrl = 'api/user/login';
    private storage;

    constructor(private http: Http) {
        let supported = this.isLocalStorageNameSupported();
        //console.log(supported);
        if (supported)
            this.storage = localStorage;
        else {
            this.storage = new SessionStorage();
        }
    }

    /**
     * This spots two main problems:
     * with some versions of IE localStorage.setItem happens to be a string
     * https://stackoverflow.com/questions/21155137/javascript-localstorage-object-broken-in-ie11-on-windows-7
     * Plus localStorage and sessionStorage do not work on iOS private mode
     */
    private isLocalStorageNameSupported() {
        var testKey = 'test', storage = window.localStorage;
        try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

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
                //alert(typeof localStorage);
                //alert(typeof localStorage.setItem);
                if (res.feedback === "ok") {
                    let token = res.token;
                    let user = res.user;
                    //console.log(user);
                    //console.log(token);
                    //console.log(token.length);
                    this.storage.setItem("token", token);
                    this.storage.setItem("user", JSON.stringify(user));
                }
                return response;
            });
    }

    /**
     * If a user is logged in there will be a token saved locally.
     * It is needed to authenticate in some pages by putting it in 'x-access-token' header.
     */
    getLoginToken(): string {
        return this.storage.getItem("token");
    }

    getUser(): any {
        return JSON.parse(this.storage.getItem("user"));
    }

    logout() {
        this.storage.removeItem("token");
        this.storage.removeItem("user");
    }

    isLoggedIn(): boolean {
        return this.getLoginToken() ? true : false;
    }
}