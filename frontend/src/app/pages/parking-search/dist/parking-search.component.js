"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ParkingSearchComponent = void 0;
var core_1 = require("@angular/core");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var L = require("leaflet");
var ParkingSearchComponent = /** @class */ (function () {
    function ParkingSearchComponent(fb, parkingSearchService) {
        this.fb = fb;
        this.parkingSearchService = parkingSearchService;
        //TODO add "no parkings found in your search area in 'Cesena', please expand your search area or search from city center by pressing [icon]"
        this.faUser = free_solid_svg_icons_1.faUser;
        this.faSearch = free_solid_svg_icons_1.faSearch;
        this.availableCities = [];
        this.locationSearchEnabled = false;
        this.searchRange = 1000;
        this.navIcon = L.icon({
            iconUrl: '/assets/images/nav-icon.png',
            iconSize: [35, 20]
        });
        this.cityCenterIcon = L.icon({
            iconUrl: '/assets/images/city-center.png',
            iconSize: [35, 20]
        });
    }
    ParkingSearchComponent.prototype.ngAfterViewInit = function () {
        this.initCities();
        this.initMap();
    };
    ParkingSearchComponent.prototype.locatePosition = function () {
        this.locationSearchEnabled = true;
        this.map.locate({ setView: true, maxZoom: 16 });
    };
    ParkingSearchComponent.prototype.locateCityCenter = function () {
        this.locationSearchEnabled = false;
        // Search city center in DB, place markers and center view.
    };
    ParkingSearchComponent.prototype.onRangeChange = function (value) {
        switch (value) {
            case "1":
                this.searchRange = 250;
                break;
            case "2":
                this.searchRange = 500;
                break;
            case "3":
                this.searchRange = 1000;
                break;
            case "4":
                this.searchRange = 5000;
                break;
            case "5":
                this.searchRange = 10000;
                break;
        }
        this.updateMarkers();
    };
    ParkingSearchComponent.prototype.onSearchCityChange = function (value) {
        this.selectedCity = this.availableCities.find(function (city) { return city.name == value; });
        if (!this.selectedCity) {
            console.error("Could not retrieve the selected city: " + value);
        }
    };
    ParkingSearchComponent.prototype.initCities = function () {
        var _this = this;
        this.parkingSearchService.getAllCities().subscribe(function (cities) {
            _this.availableCities = cities;
        }, function (err) { return console.log(err); });
    };
    ParkingSearchComponent.prototype.initMap = function () {
        var _this = this;
        this.map = L.map('map', {
            zoom: 13
        });
        var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 12,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        tiles.addTo(this.map);
        this.map.on('locationfound', function (e) {
            _this.searchLocation = e.latlng;
            _this.updateMarkers();
        });
        this.map.on('locationerror', function (e) {
            alert("Ooops, couldn't get your current position! Please re-try or select a city ;)");
        });
        this.locatePosition();
    };
    ParkingSearchComponent.prototype.updateMarkers = function () {
        if (this.searchLocation) {
            this.clearMarkers();
            this.currentLocationMarker = L.marker(this.searchLocation, { icon: this.navIcon }).addTo(this.map);
            if (this.locationSearchEnabled) {
                this.searchRadiusMarker = L.circle(this.searchLocation, this.searchRange, { color: "blue", opacity: .5, fill: false }).addTo(this.map);
            }
            else if (this.selectedCity) {
                var center = new L.LatLng(this.selectedCity.latitude, this.selectedCity.longitude);
                this.cityCenterMarker = L.marker(center, { icon: this.cityCenterIcon }).addTo(this.map);
                this.searchRadiusMarker = L.circle(this.cityCenterLocation, this.searchRange, { color: "blue", opacity: .5, fill: false }).addTo(this.map);
            }
        }
    };
    ParkingSearchComponent.prototype.clearMarkers = function () {
        if (this.currentLocationMarker) {
            this.map.removeLayer(this.currentLocationMarker);
        }
        if (this.searchRadiusMarker) {
            this.map.removeLayer(this.searchRadiusMarker);
        }
    };
    ParkingSearchComponent = __decorate([
        core_1.Component({
            selector: 'app-parking-search',
            templateUrl: './parking-search.component.html',
            styleUrls: ['./parking-search.component.css']
        })
    ], ParkingSearchComponent);
    return ParkingSearchComponent;
}());
exports.ParkingSearchComponent = ParkingSearchComponent;
