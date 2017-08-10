import { Component, OnInit } from '@angular/core';
declare var google: any;
@Component({
    selector: 'contacts',
    templateUrl: 'contacts.component.html',
    styleUrls: []
})
export class ContactsComponent implements OnInit {
    ngOnInit(): void {
        if (typeof google === "undefined") {
            document.getElementById("google-maps").addEventListener("load", () => this.initMap());
            
        } else {
            this.initMap();
        }
    }
    initMap() {
        let bolognaPolo = { lat: 44.496218, lng: 11.35438 };
        let cesenaPolo = { lat: 44.141192, lng: 12.244875 };
        let forliPolo = { lat: 44.221470, lng: 12.040395 };
        let ravennaPolo = { lat: 44.412631, lng: 12.200521 };
        let riminiPolo = { lat: 44.062057, lng: 12.569986 };
        var mapOptions = {
            center: forliPolo,
            zoom: 9
        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker1 = new google.maps.Marker({
            position: bolognaPolo,
            map: map,
            title: "Università di Bologna"
        });
        let infowindow1 = new google.maps.InfoWindow({
            content: "<h3>Università di Bologna</h3>\
Via Zamboni 33, 40126 - Bologna"
        });
        marker1.addListener('click', function () {
            infowindow1.open(map, marker1);
        });


        var marker_cesena = new google.maps.Marker({
            position: cesenaPolo,
            map: map,
            title: "Polo Scientifico - Didattico di Cesena"
        });
        let infowindow_cesena = new google.maps.InfoWindow({
            content: "<h3>Polo Scientifico - Didattico di Cesena</h3>\
Via Gaspare Finali, 56 Cesena"
        });
        marker_cesena.addListener('click', function () {
            infowindow_cesena.open(map, marker_cesena);
        });

        var marker_forli = new google.maps.Marker({
            position: forliPolo,
            map: map,
            title: "Polo Scientifico - Didattico di Forlì"
        });
        let infowindow_forli = new google.maps.InfoWindow({
            content: "<h3>Polo Scientifico - Didattico di Forlì</h3>\
Via Volturno, 7 Forlì"
        });
        marker_forli.addListener('click', function () {
            infowindow_forli.open(map, marker_forli);
        });

        var marker_ravenna = new google.maps.Marker({
            position: ravennaPolo,
            map: map,
            title: "Polo Scientifico - Didattico di Ravenna"
        });
        let infowindow_ravenna = new google.maps.InfoWindow({
            content: "<h3>Polo Scientifico - Didattico di Ravenna</h3>\
Via Baccarini, 27 Ravenna"
        });
        marker_ravenna.addListener('click', function () {
            infowindow_forli.open(map, marker_ravenna);
        });

        var marker_rimini = new google.maps.Marker({
            position: riminiPolo,
            map: map,
            title: "Polo Scientifico - Didattico di Ravenna"
        });
        let infowindow_rimini = new google.maps.InfoWindow({
            content: "<h3>Polo Scientifico - Didattico di Rimini</h3>\
Via Angherà, 22 Rimini"
        });
        marker_rimini.addListener('click', function () {
            infowindow_forli.open(map, marker_rimini);
        });
    }
}
