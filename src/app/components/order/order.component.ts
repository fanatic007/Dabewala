import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Order } from '../../models';
import { OrderService } from "../../order.service";

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order;
  deliveryPersonCoords: google.maps.LatLngLiteral;
  deliveryPersonIcon = './assets/icons/food-delivery.png';
  restaurantIcon = './assets/icons/restaurant.png';
  houseIcon = './assets/icons/house.png';
  
  constructor(private orderService: OrderService){
    this.orderService.connect();
  }

  ngOnInit(){
    this.orderService.getOrderDetails('id',true).subscribe(order=>this.order=order);
    this.orderService.locationUpdate$.pipe(
      catchError(error => { throw error }),
      tap({
        error: error => console.log('[Live component] Error:', error),
        complete: () => console.log('[Live component] Connection Closed')
      })
    ).subscribe( locationUpdate=>{ this.deliveryPersonCoords=locationUpdate.coords });
  }
}
