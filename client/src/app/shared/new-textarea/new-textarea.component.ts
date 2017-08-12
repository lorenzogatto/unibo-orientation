import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

import * as $ from 'jquery';
@Component({
    selector: 'new-textarea',
    templateUrl: 'new-textarea.component.html',
    styleUrls: ['../../shared/forms.scss', 'new-textarea.component.scss']
})
export class NewTextareaComponent{

    @Input() name: string;
    @Input() identifier: string;
    @Input() maxlength: number;
    @Input() isRequired: boolean;

    constructor() {
    }

    fitContent(event: Event) {
        let target: any = event.target;
        let computedStyle = getComputedStyle(target);
        //console.log(computedStyle);
        let bordersWidth = parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth);
        target.style.height = "0";
        target.style.height = target.scrollHeight + bordersWidth + "px";
    }
}
