webpackJsonp([1],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contacts_component__ = __webpack_require__("../../../../../src/app/contacts.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__presentation_component__ = __webpack_require__("../../../../../src/app/presentation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__courses_component__ = __webpack_require__("../../../../../src/app/courses.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__questionnaire_component__ = __webpack_require__("../../../../../src/app/questionnaire.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__questions_component__ = __webpack_require__("../../../../../src/app/questions.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [{
        path: 'home',
        component: __WEBPACK_IMPORTED_MODULE_3__presentation_component__["a" /* PresentationComponent */]
    }, {
        path: 'courses',
        component: __WEBPACK_IMPORTED_MODULE_4__courses_component__["a" /* CoursesComponent */]
    }, {
        path: 'questionnaire',
        component: __WEBPACK_IMPORTED_MODULE_5__questionnaire_component__["a" /* QuestionnaireComponent */]
    }, {
        path: 'questions',
        component: __WEBPACK_IMPORTED_MODULE_6__questions_component__["a" /* QuestionsComponent */]
    }, {
        path: 'contacts',
        component: __WEBPACK_IMPORTED_MODULE_2__contacts_component__["a" /* ContactsComponent */]
    }, {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".fixed-top-nav {\r\n  display: -ms-flexbox;\r\n  display: -webkit-box;\r\n  display: flex;\r\n  position: fixed;\r\n  top: 0px;\r\n  left: 0px;\r\n  margin: 0px;\r\n  width: 100%;\r\n  height: 2.5rem;\r\n  background-color: #bb2e29;\r\n  z-index: 1; }\r\n  .fixed-top-nav a {\r\n    margin: 0 auto;\r\n    padding: 0.3rem;\r\n    color: white;\r\n    width: 16.6666%;\r\n    text-decoration: none;\r\n    text-align: center;\r\n    line-height: 1.9rem;\r\n    font-size: 1.9rem; }\r\n    .fixed-top-nav a span.bordered-text {\r\n      border: 0.15rem solid white;\r\n      border-radius: 0.95rem;\r\n      width: 1.9rem;\r\n      height: 1.9rem;\r\n      display: inline-block;\r\n      vertical-align: text-top;\r\n      position: relative; }\r\n      .fixed-top-nav a span.bordered-text span {\r\n        height: 1.9rem;\r\n        width: 1.9rem;\r\n        line-height: 1.9rem;\r\n        font-size: 1.6rem;\r\n        display: inline-block;\r\n        vertical-align: text-top;\r\n        position: absolute;\r\n        left: -0.15rem;\r\n        top: -0.15rem; }\r\n    @media (hover: hover) {\r\n      .fixed-top-nav a:hover {\r\n        background-color: #d23732; } }\r\n    .fixed-top-nav a.active {\r\n      color: #bb2e29;\r\n      background: white; }\r\n      .fixed-top-nav a.active span.bordered-text {\r\n        border-color: #bb2e29; }\r\n\r\n.fixed-top-nav-placeholder {\r\n  height: 2.5rem;\r\n  display: block; }\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"fixed-top-nav\">\r\n  <a routerLink=\"/home\" routerLinkActive=\"active\">\r\n    <i class=\"fa fa-home\" aria-hidden=\"true\"></i>\r\n  </a>\r\n  <a routerLink=\"/courses\" routerLinkActive=\"active\">\r\n    <i class=\"fa fa-list\" aria-hidden=\"true\"></i>\r\n  </a>\r\n  <a routerLink=\"/questionnaire\"  routerLinkActive=\"active\">\r\n    <span class=\"bordered-text\"><span class=\"notranslate\">Q</span></span>\r\n  </a>\r\n  <a routerLink=\"/questions\"  routerLinkActive=\"active\">\r\n    <span class=\"bordered-text\"><span class=\"notranslate\">?</span></span>\r\n  </a>\r\n  <a routerLink=\"/contacts\" routerLinkActive=\"active\">\r\n    <span class=\"bordered-text\"><span style=\"font-family:Georgia, serif\" class=\"notranslate\">i</span></span>\r\n  </a>\r\n  <a routerLink=\"todo.com\">\r\n    <i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i>\r\n  </a>\r\n</nav>\r\n<!--This div listens to swipe events that are external to other divs -->\r\n<div style=\"position:fixed;width: 100%;height:100%\" (swipeleft)=\"swipe('left', $event);\" (swiperight)=\"swipe('right', $event);\"></div>\r\n<div>\r\n  <div class=\"fixed-top-nav-placeholder\"></div>\r\n  <div class=\"container\" style=\"width: 90%;margin:auto;\" (swipeleft)=\"swipe('left', $event);\" (swiperight)=\"swipe('right', $event);\">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var urls = ['/home',
    '/courses',
    '/questionnaire',
    '/questions',
    '/contacts'
];
var AppComponent = (function () {
    function AppComponent(router) {
        this.router = router;
        this.router = router;
    }
    AppComponent.prototype.swipe = function (direction, event) {
        var _this = this;
        //alert(event.pointerType);
        console.log(event);
        var index = urls.findIndex(function (e) { return e === _this.router.url; });
        if (index === -1) {
            console.log("Url not found in array");
            return;
        }
        if (direction === 'left') {
            index = Math.min(index + 1, urls.length - 1);
        }
        else {
            index = Math.max(index - 1, 0);
        }
        this.router.navigateByUrl(urls[index]);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], AppComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__contacts_component__ = __webpack_require__("../../../../../src/app/contacts.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__presentation_component__ = __webpack_require__("../../../../../src/app/presentation.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__courses_component__ = __webpack_require__("../../../../../src/app/courses.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__questionnaire_component__ = __webpack_require__("../../../../../src/app/questionnaire.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__questions_component__ = __webpack_require__("../../../../../src/app/questions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_hammerjs__);
/* unused harmony export MyHammerConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











delete Hammer.defaults.cssProps.userSelect;
var MyHammerConfig = (function (_super) {
    __extends(MyHammerConfig, _super);
    function MyHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = {
            'swipe': { velocity: 0.4, threshold: 10 },
            'pinch': { enable: false },
            'rotate': { enable: false },
        };
        return _this;
        /*buildHammer(element: HTMLElement): HammerInstance {
            let mc = new Hammer(element, { touchAction: 'pan-y' });
            mc.on('pinch', e => { alert(e);})
            return mc;
        }*/
    }
    return MyHammerConfig;
}(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* HammerGestureConfig */]));

var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_4__presentation_component__["a" /* PresentationComponent */],
            __WEBPACK_IMPORTED_MODULE_6__courses_component__["a" /* CoursesComponent */],
            __WEBPACK_IMPORTED_MODULE_7__questionnaire_component__["a" /* QuestionnaireComponent */],
            __WEBPACK_IMPORTED_MODULE_8__questions_component__["a" /* QuestionsComponent */],
            __WEBPACK_IMPORTED_MODULE_3__contacts_component__["a" /* ContactsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_5__app_routing_module__["a" /* AppRoutingModule */]
        ],
        providers: [{
                provide: __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["c" /* HAMMER_GESTURE_CONFIG */],
                useClass: MyHammerConfig
            }],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/contacts.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ContactsComponent = (function () {
    function ContactsComponent() {
    }
    return ContactsComponent;
}());
ContactsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'contacts',
        template: '<br/><br/><br/><br/><br/><br/><br/><br/>contatti',
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], ContactsComponent);

//# sourceMappingURL=contacts.component.js.map

/***/ }),

/***/ "../../../../../src/app/courses.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CoursesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var CoursesComponent = (function () {
    function CoursesComponent() {
    }
    return CoursesComponent;
}());
CoursesComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'courses',
        template: __webpack_require__("../../../../../src/app/presentation.component.html"),
        styles: [__webpack_require__("../../../../../src/app/presentation.component.css")]
    })
], CoursesComponent);

//# sourceMappingURL=courses.component.js.map

/***/ }),

/***/ "../../../../../src/app/presentation.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/presentation.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"flex-center\">\r\n  <div style=\"position: relative;\">\r\n    <h1 style=\"display: inline-block;\">Sito di orientamento dell'Università di Bologna</h1><br _ngcontent-c1=\"\">\r\n\r\n    <section style=\"position: absolute;top: 100%;width: 100%;\">\r\n      Questo sito ti aiuterà a trovare il percorso di studi che fa per te!<br />\r\n      L'Università di Bologna, la prima università al mondo, è presente nelle città di Bologna, Cesena, Forlì, Ravenna e Rimini.<br/>\r\n      Osserva la <a routerLink=\"/courses\">lista dei corsi</a> offerti dall'Università\r\n      o compila il <a routerLink=\"/questionnaire\">questionario</a> che ti aiuterà a trovare il corso di studio\r\n      più adatto a te!<br />\r\n      Se avrai dubbi o domande, potrai porle nell'apposita <a routerLink=\"/questions\">pagina</a>.<br />\r\n      Per guardare la mappa dei Campus o avere informazioni generali, clicchi <a routerLink=\"/contacts\">qui</a>\r\n      <br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a<br />a\r\n    </section>\r\n  </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/presentation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PresentationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var PresentationComponent = (function () {
    function PresentationComponent() {
    }
    return PresentationComponent;
}());
PresentationComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'presentation',
        template: __webpack_require__("../../../../../src/app/presentation.component.html"),
        styles: [__webpack_require__("../../../../../src/app/presentation.component.css")]
    })
], PresentationComponent);

//# sourceMappingURL=presentation.component.js.map

/***/ }),

/***/ "../../../../../src/app/questionnaire.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionnaireComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var QuestionnaireComponent = (function () {
    function QuestionnaireComponent() {
    }
    return QuestionnaireComponent;
}());
QuestionnaireComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'questionnaire',
        template: '<br/><br/><br/><br/><br/><br/><br/><br/>contatti',
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], QuestionnaireComponent);

//# sourceMappingURL=questionnaire.component.js.map

/***/ }),

/***/ "../../../../../src/app/questions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var QuestionsComponent = (function () {
    function QuestionsComponent() {
    }
    return QuestionsComponent;
}());
QuestionsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_11" /* Component */])({
        selector: 'questions',
        template: __webpack_require__("../../../../../src/app/presentation.component.html"),
        styles: [__webpack_require__("../../../../../src/app/presentation.component.css")]
    })
], QuestionsComponent);

//# sourceMappingURL=questions.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map