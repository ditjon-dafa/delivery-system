import { generateClientOrder } from "../../lib/helper.js";
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
    } else {
      let dynamicOrders = `<div>`;
      let finishedOrders = this.orders.filter(
        (order) =>
          order.status == "BURNED OUT" ||
          order.status == "DELIVERED" ||
          order.status == "REJECTED"
      );

      if (finishedOrders.length > 0) {
        dynamicOrders += `<div><h3> Finished orders </h3> `;
        finishedOrders.forEach((order) => {
          dynamicOrders += generateClientOrder(order);
        });
        dynamicOrders += `</div>`;
      }

      let onProcessOrders = this.orders.filter(
        (order) =>
          order.status != "BURNED OUT" &&
          order.status != "DELIVERED" &&
          order.status != "REJECTED"
      );

      if (onProcessOrders.length > 0) {
        dynamicOrders += `<div> <h3> On process orders </h3>`;
        onProcessOrders.forEach((order) => {
          dynamicOrders += generateClientOrder(order);
        });
        dynamicOrders += `</div>`;
      }
      dynamicOrders += `</div>`;
      CLIENT_ORDERS_CONTAINER.innerHTML = dynamicOrders;
    }
  }

  addSentOrderToMyOrders(order) {
    this.orders.push(order);
  }
}
