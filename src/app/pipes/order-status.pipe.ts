import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

  STATUSES = {
    1: "NEW ORDER",
    2: "IN KITCHEN",
    3: "READY TO PICKUP",
    4: "PICKED UP",
    5: "DELIVERED" 
  }

  transform(value: number): string {
    return this.STATUSES[value];
  }

}
