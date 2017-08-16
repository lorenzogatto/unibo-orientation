import { Headers, Http, RequestOptions } from '@angular/http';
import * as HttpStatus from 'http-status-codes';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Injectable, OnInit } from "@angular/core";
import { AuthenticationService } from "../user/authentication.service";
import { CoursesGroup } from "../shared/CoursesGroup";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

declare var EventSource: any
@Injectable()
export class NotificationsService {
    private notificationsUrl = '/api/notifications/get_notifications_SSE';
    private deleteNotificationUrl = '/api/notifications/delete';
    private notificationsSubject: Subject<number>;

    constructor(private http: Http, private authenticationService: AuthenticationService) {
        this.notificationsSubject = new Subject<number>();
        this.SSEConnect();
    }

    public getNotifications(): Observable<any> {
        return this.notificationsSubject;
    }

    private SSEConnect() {
        let email = "";
        if (this.authenticationService.getUser())
            email = this.authenticationService.getUser().email
        if (typeof (EventSource) !== "undefined") {
            var source = new EventSource(this.notificationsUrl + "?email=" + email);
            source.onmessage = event => {
                //alert(event.data);
                console.log(event.data);
                this.notificationsSubject.next(JSON.parse(event.data));
            };
            //source.onopen = () => console.log("SSE opened");
            source.onerror = (err) => {
                console.log(err);
                source.close();//to have a consistent behaviour: always reconnect
                setTimeout(() => this.SSEConnect(), 10000);
            };
        }
    }

    public deleteNotification(notification_id: string) {
        let headers = new Headers();
        let token = this.authenticationService.getLoginToken();
        if (token) {
            headers.append('x-access-token', this.authenticationService.getLoginToken());
        }
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(this.deleteNotificationUrl + "?id=" + notification_id, options).toPromise()
            .catch(err => console.log(err));
    }
}