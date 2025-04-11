import {
  generateClearClientFinishedOrders,
  generateClientOrder,
} from "../../lib/helper.js";
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
    this.onProcessOrders = [];
    this.finishedOrders = [];
  }

  displayOrders() {
    const CLIENT_ORDERS_CONTAINER = document.getElementById(
      "client-orders-container"
    );
    if (this.finishedOrders.length + this.onProcessOrders.length == 0) {
      CLIENT_ORDERS_CONTAINER.innerHTML = `<h3> You have not placed any orders! </h3>`;
    } else {
      let dynamicOrders = `<div>`;

      if (this.finishedOrders.length > 0) {
        dynamicOrders += `<div><h3> Finished orders </h3> `;
        this.finishedOrders.forEach((order) => {
          dynamicOrders += generateClientOrder(order);
        });
        dynamicOrders += `</div>`;
      }

      if (this.finishedOrders.length >= 2) {
        dynamicOrders += generateClearClientFinishedOrders();
      }

      if (this.finishedOrders.length >= 1 && this.onProcessOrders.length >= 1)
        dynamicOrders += `<hr/>`;

      if (this.onProcessOrders.length > 0) {
        dynamicOrders += `<div> <h3> On process orders </h3>`;
        this.onProcessOrders.forEach((order) => {
          dynamicOrders += generateClientOrder(order);
        });
        dynamicOrders += `</div>`;
      }
      dynamicOrders += `</div>`;
      CLIENT_ORDERS_CONTAINER.innerHTML = dynamicOrders;
    }
  }

  addSentOrderToOnProcessOrders(order) {
    this.onProcessOrders.push(order);
  }

  moveOnProcessOrderToFinishedOrders(orderToMove) {
    this.onProcessOrders = this.onProcessOrders.filter(
      (order) => order.id != orderToMove.id
    );
    this.finishedOrders.push(orderToMove);
  }

  removeFinishedOrder(ORDER_ID) {
    this.finishedOrders = this.finishedOrders.filter(
      (order) => order.id != ORDER_ID
    );
  }

  clearClientFinishedOrders() {
    this.finishedOrders = [];
  }
}
