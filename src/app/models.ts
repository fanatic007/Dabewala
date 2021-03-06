export interface StatusUpdate {
  status: number, time: string
}

export interface Party {
  name: string, contact: string
}

export interface Restaurant extends Party {
  coords: google.maps.LatLngLiteral
}

export interface LocationUpdate {
  status: number
  coords: google.maps.LatLngLiteral
}

export interface Order {
  id: string,
  currentStatus: 4
  statusUpdates:Array<StatusUpdate>,
  restaurant:Restaurant
  orderDetails:Object,
  pricingDetails:Object,
  foodItemsDetails:Object,
  deliveryPerson:Object  
}