import { NotificationsService } from "./notifications.service";
import { OnInit, Component, NgZone } from "@angular/core";
import { Router } from "@angular/router";
declare var toastr: any;


@Component({
    selector: 'notifications',
    template: ''

})
export class NotificationsComponent implements OnInit {
    constructor(
        private router: Router,
        private notificationsService: NotificationsService,
        private zone: NgZone) {
    }

    ngOnInit(): void {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": true,
            "showDuration": "0",
            "hideDuration": "1000",
            "timeOut": "0",
            "extendedTimeOut": "0",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }

        this.notificationsService.getNotifications()
            .subscribe((notification) => {
                if (notification.type === "newanswer") {
                    toastr.info('Nuova risposta per la domanda ' + notification.data.question,
                        '', {
                            onclick: () => this.changeUrl(notification.data.question_id),
                            onHidden: () => this.notificationsService.deleteNotification(notification._id)
                        });
                }
                console.log("nnn", notification);
            });
    }

    changeUrl(question_id) {
        //using zone otherwise the url would change but not the page
        //https://stackoverflow.com/questions/39786307/ngoninit-doesnt-run-until-after-i-navigate-to-another-component
        this.zone.run(() => {
            this.router.navigate(["/forum/question", question_id]);
        });
    }
}