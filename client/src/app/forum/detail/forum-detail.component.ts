import { Component, OnInit, Input } from '@angular/core';
import { ForumService } from "../forum.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from "rxjs/Subject";
import * as $ from 'jquery';
import { AuthenticationService } from "../../user/authentication.service";
declare var toastr: any;

@Component({
    selector: 'forum-detail',
    templateUrl: 'forum-detail.component.html',
    styleUrls: ['../../shared/forms.scss', 'forum-detail.component.scss']
})
export class ForumDetailComponent implements OnInit {
        
    @Input() question;
    detailPage: boolean = true;
    loadingError: string = "";
    location: string;

    constructor(
        private forumService: ForumService,
        private router: Router,
        private route: ActivatedRoute,
        public authenticationService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.location = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        if (this.router.url.indexOf("forum/questions") != -1) {
            this.detailPage = false;
            return;
        }        
        this.route.paramMap.switchMap((params: ParamMap) => this.forumService.getQuestion(params.get('id')))
            .subscribe(question => {
                this.question = question;
                this.loadingError = "";
            }, error => {
                console.log(error);
                if (error.status === 404)
                    this.loadingError = "Errore: domanda non trovata!";
                else
                  this.loadingError = "Errore nel caricamento delle domande, riprovare più tardi!";
            });
    }

    /**
     * When user clicks on pointing down arrow on the right part of a question
     * @param event
     */
    chevronToggle(event) {
        //console.log(event);
        let target: any = event.target;
        //sometimes the target is the "i" element inside the outer "a" element and I always want it to be the outer "a" element
        if (target.tagName.toLowerCase() === "i")
            target = target.parentNode;
        //console.log(button);
        target.classList.toggle("active");
        let panel: Element = target.nextElementSibling;
        //If I'm opening an accordion, first close any open accordion there might be
        if (!panel.classList.contains("open")) {
            this.closeOpenAccordion();
        }
        console.log(target);
        var jPanel: any = $(panel);
        panel.classList.toggle("open");
        jPanel.slideToggle();
        return false;
    }
    /**
     * Finds and close the open accordion.
     * The code in this class makes sure there is always at most one open
     */
    private closeOpenAccordion() {
        let openElements = document.getElementsByClassName("open");
        if (openElements.length === 0) return;
        var jPanel: any = $(openElements[0]);
        openElements[0].classList.toggle("open");
        jPanel.slideUp();
        return true;
    }

    /**
     * Copy on clipboard button click event listener
     */
    onCopy() {
        this.closeOpenAccordion();
        toastr.success('Link permanente copiato nella clipboard', '', { timeOut: 1500 });
        return true;
    }

    /**
     * Delete question listener
     * @param question_id
     */
    onDelete(question_id) {
        let userFeedback = window.confirm("Sicuro di voler cancellare la domanda?");
        if (userFeedback == false) return false;
        this.forumService.deleteQuestion(question_id)
            .then(() => {
                let element = document.getElementById(question_id);
                element.parentNode.removeChild(element);
                toastr.success('Domanda eliminata', '', { timeOut: 1500 });
            })
            .catch((err) => {
                toastr.error('Errore nella cancellazione della domanda', '', { timeOut: 1500 });
                console.log(err);
        })
    }

    /**
     * When the user triggers with the keyboard an event equivalent to a mouse click,
     * that is it clicks space or enter on an element
     * @param callback
     */
    onKeyboardClick(event: KeyboardEvent, command, parameter) {
        console.log(event);
        let KEY_SPACE = 32;
        let KEY_ENTER = 13;
        if (event.keyCode != KEY_SPACE && event.keyCode != KEY_ENTER)
            return;
        event.preventDefault();
        event.stopPropagation();
        if (command === 'copy') {
            this.onCopy();
        } else if (command === "delete") {
            this.onDelete(parameter);
        } else if (command === 'chevron') {
            this.chevronToggle(event);
        }
    }
}
