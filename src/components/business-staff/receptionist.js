import {
  generateOrdersFooter,
  generateReceptionistOrder,
} from "../../lib/helper.js";

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

  getHighPriorityOrder(ORDER_ID) {
    const HIGH_PRIORITY_ORDER = this.orders.find(
      (order) => order.id == ORDER_ID
    );

    return HIGH_PRIORITY_ORDER;
  }

  removeOrder(orderToRemove) {
    this.orders = this.orders.filter((order) => order.id != orderToRemove.id);
  }

  displayOrders() {
    let orderContainer = document.getElementById("receptionist-orders");
    orderContainer.innerHTML = "";

    let dynamicOrders = `<div>`;
    this.orders.forEach((order) => {
      dynamicOrders += generateReceptionistOrder(order);
    });

    if (this.orders.length >= 1) {
      dynamicOrders += generateOrdersFooter();
    }
    dynamicOrders += `</div>`;

    orderContainer.innerHTML = dynamicOrders;
  }
}
