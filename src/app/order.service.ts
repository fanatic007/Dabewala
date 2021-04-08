import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll } from 'rxjs/operators';
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
  // private locationUpdateSubject$ = new Subject();
  // public locationUpdate$ = this.locationUpdateSubject$.pipe(switchAll(), catchError(e => { throw e }));
  public locationUpdate$;

  constructor(private httpClient: HttpClient ){ }

  getOrderDetails(id,statusUpdated): Observable<Order>{
    return this.httpClient.get<Order>(HTTP_ENDPOINT + '/orders', { params: {id:id,statusUpdated:statusUpdated} } );
  }
  
  connect(): void {    
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      this.locationUpdate$ = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }),
        catchError(_ => EMPTY)
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
