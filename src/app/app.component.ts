import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { OrderService } from "./order.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dabewala';

  constructor(private orderService: OrderService){
    this.orderService.connect();
  }

  ngOnInit(){
    this.orderService.locationUpdate$.pipe(
        catchError(error => { throw error }),
        tap({
          error: error => console.log('[Live component] Error:', error),
          complete: () => console.log('[Live component] Connection Closed')
        }
      )
    ).subscribe( locationUpdate=>console.log(locationUpdate));
  }
}
