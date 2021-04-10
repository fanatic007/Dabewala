import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll, map } from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Order, LocationUpdate } from "./models";
export const WS_ENDPOINT = `ws://localhost:3002`;
export const HTTP_ENDPOINT = `http://localhost:3001`;
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private socket$: WebSocketSubject<any>;
  public locationUpdate$: Observable<LocationUpdate>;

  constructor(private httpClient: HttpClient ){ }

  getOrderDetails(id,statusUpdated): Observable<Order>{
    return this.httpClient.get<Order>(HTTP_ENDPOINT + '/orders/');
  }
  
  connect(): void {    
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      this.locationUpdate$ = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }),
        catchError(_ => EMPTY),
        map(locationUpdate=>locationUpdate)
      );
    }
  }
  
  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  close() {
    this.socket$.complete();
  }

  private getNewWebSocket() {
    return webSocket(WS_ENDPOINT);
  }
}
