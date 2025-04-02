import { Location } from "./location.js";

export class Client {
  constructor(
    name,
    phoneNumber,
    address,
    latitudePosition,
    longitudePosition,
    paymentMethod
  ) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.location = new Location(address, latitudePosition, longitudePosition);
    this.paymentMethod = paymentMethod;
    this.orders = [];
  }

  displayOrders() {
    const CLIENT_ORDERS_CONTAINER = document.getElementById(
      "client-orders-container"
    );
    if (this.orders.length == 0) {
      CLIENT_ORDERS_CONTAINER.innerHTML = `<h3> You have not placed any orders! </h3>`;
    }
  }
}
