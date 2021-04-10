import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {path:'orderDetails',component: OrderComponent},
  {path:'**', redirectTo:'orderDetails',pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
