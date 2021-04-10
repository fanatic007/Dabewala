import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeoTrackerComponent } from './components/geo-tracker/geo-tracker.component';
import { OrderComponent } from './components/order/order.component';
import { OrderStatusPipe } from './pipes/order-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GeoTrackerComponent,
    OrderComponent,
    OrderStatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [OrderStatusPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
