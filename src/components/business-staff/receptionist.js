import { generateReceptionistOrder } from "../../lib/helper.js";

export class Receptionist {
  constructor(name, phoneNumber) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.orders = [];
    this.generalSuccessfulOrders = 0;
    this.generalFailedOrders = 0;
    this.cashDeskStatus = 0;
  }

  registerNewOrder(order) {
    order.status = "RECEIVED";
    this.orders.push(order);
  }

  displayOrders() {
    let orderContainer = document.getElementById("receptionist-orders");
    orderContainer.innerHTML = "";

    let dynamicOrders = `<div>`;
    this.orders.forEach((order) => {
      dynamicOrders += generateReceptionistOrder(order);
    });
    dynamicOrders += `</div>`;

    orderContainer.innerHTML = dynamicOrders;
  }
}
