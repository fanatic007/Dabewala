import { Component } from '@angular/core';
import { Order } from './models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  order: Order;
  constructor(){ }

}
