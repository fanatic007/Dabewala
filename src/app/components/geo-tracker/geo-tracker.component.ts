import { Component, ViewChild, OnInit, Input, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { OrderService } from "../../order.service";
import { Loader } from "@googlemaps/js-api-loader"

@Component({
  selector: 'geo-tracker',
  templateUrl: './geo-tracker.component.html',
  styleUrls: ['./geo-tracker.component.scss']
})
export class GeoTrackerComponent implements OnInit, OnChanges {
  @Input() sourceIcon: string;
  @Input() destinationIcon: string;
  @Input() trackeeIcon: string;
  @Input() sourceCoords: google.maps.LatLngLiteral;
  @Input() destinationCoords: google.maps.LatLngLiteral;
  @Input() trackeeCoords: google.maps.LatLngLiteral;
  currentPositionCoords: google.maps.LatLngLiteral;
  sourceMarker : google.maps.Marker;
  destinationMarker: google.maps.Marker;  
  trackeeMarker: google.maps.Marker;  
  directionsRenderer: google.maps.DirectionsRenderer;
  directionsService: google.maps.DirectionsService;
  currentPositionMarker: google.maps.Marker;    
  map: google.maps.Map;
  showCurrentPosition = true;
  @ViewChild('map') mapDiv: ElementRef;

  constructor(){}

  ngOnInit(){
    this.loadMap();
    if (navigator.geolocation && this.showCurrentPosition) {
      navigator.geolocation.getCurrentPosition(position=> {
        this.currentPositionCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
      });
    }
  }

  ngOnChanges(changes: SimpleChanges){
    this.directionsRenderer && this.drawDirectionsRoute();
  }

  loadMap(){
    new Loader({
      apiKey: "AIzaSyBHZulEfRwW5hXk7AAREzgJqkSoS-uON00",
    })
    .load().then(() => {
      this.map  = new google.maps.Map(this.mapDiv.nativeElement as HTMLElement , {
        center: this.currentPositionCoords,
        zoom: 15,
        maxZoom: 17,
        minZoom: 10
      });

      if(this.showCurrentPosition){
        this.currentPositionMarker = new google.maps.Marker({
          position: this.currentPositionCoords,
          map: this.map
        });
      }

      this.trackeeMarker = new google.maps.Marker({
        position: this.trackeeCoords,
        map: this.map,
        icon: this.trackeeIcon        
      });

      this.sourceMarker = new google.maps.Marker({
        position: this.sourceCoords,
        map: this.map,
        icon: this.sourceIcon
      });      

      this.destinationMarker = new google.maps.Marker({
        position: this.destinationCoords,
        map: this.map,
        icon: this.destinationIcon
      });
      this.directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true, polylineOptions: { strokeColor: "orange" }});;
      this.directionsService = new google.maps.DirectionsService;  
    });    
  }

  drawDirectionsRoute() {    
    this.directionsRenderer.setMap(this.map);
    this.directionsService.route(
      {
        origin: this.trackeeCoords,
        destination: this.destinationCoords,
        travelMode: google.maps.TravelMode.DRIVING
      }, 
      (response, status) => {
        status === 'OK' && this.directionsRenderer.setDirections(response);
        this.trackeeMarker.setPosition(this.trackeeCoords);        
      }
    );
  }
}
