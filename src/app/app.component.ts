import { Component, ViewChild } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { OrderService } from "./order.service";
import { Loader } from "@googlemaps/js-api-loader"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dabewala';
  deliveryIconUrl = { url: './assets/icons/food-delivery.png', scaledSize: { width: 32, height: 32 } };
  homeIconUrl = { url: './assets/icons/house.png', scaledSize: { width: 32, height: 32 } };
  currentPositionCoords: google.maps.LatLngLiteral = {
    lat : 21,
    lng : 79
  };
  deliveryMarker;
  currentDeliveryCoords: google.maps.LatLngLiteral = {
    lat : 20.38930407670965,
    lng : 78.12380913642485
  };
  destinationCoords: google.maps.LatLngLiteral = {
    lat : 20.39442589541849,
    lng : 78.12275396707479
  }

  directionsRenderer: any;
  map: google.maps.Map;
  @ViewChild('map') mapDiv;

  constructor(private orderService: OrderService){
    this.orderService.connect();
  }

  ngOnInit(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position=> {
        this.currentPositionCoords = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.loadMap();
      });
    }
  }

  loadMap(){
    new Loader({
      apiKey: "AIzaSyBHZulEfRwW5hXk7AAREzgJqkSoS-uON00",
    })
    .load().then(() => {
      this.map  = new google.maps.Map(this.mapDiv.nativeElement as HTMLElement , {
        center: this.currentPositionCoords,
        zoom: 15,
        maxZoom: 18
      });

      this.deliveryMarker = new google.maps.Marker({
        position: this.currentDeliveryCoords,
        map: this.map,
        icon: './assets/icons/food-delivery.png'
      });

      new google.maps.Marker({
        position: this.currentPositionCoords,
        map: this.map
      });

      new google.maps.Marker({
        position: this.destinationCoords,
        map: this.map,
        icon: './assets/icons/house.png'
      });
      this.orderService.locationUpdate$.pipe(
        catchError(error => { throw error }),
        tap({
          error: error => console.log('[Live component] Error:', error),
          complete: () => console.log('[Live component] Connection Closed')
        })
      ).subscribe( locationUpdate=>{
        this.currentDeliveryCoords=locationUpdate.coords;
        this.drawDirectionsRoute();
      });
      this.drawDirectionsRoute();
    });    
  }

  drawDirectionsRoute() {  
    if (!this.directionsRenderer) {
      this.directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    }
    const directionsRenderer = this.directionsRenderer;
    const directionsService = new google.maps.DirectionsService;
    directionsRenderer.setMap(this.map);console.log(this.currentDeliveryCoords);    
    directionsService.route(
      {
        origin: this.currentDeliveryCoords,
        destination: this.destinationCoords,
        waypoints: [],
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING
      }, 
      (response, status) => {
        status === 'OK' && directionsRenderer.setDirections(response);
        this.deliveryMarker.setPosition(this.currentDeliveryCoords);
      }
    );
  }
}
