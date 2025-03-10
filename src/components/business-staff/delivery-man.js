import {
  generateDeliveryManOrder,
  generateDeliveryManOrdersFooter,
} from "../../lib/helper.js";

export class DeliveryMan {
  constructor() {
    this.orders = [];
    this.deliveredOrders = 0;
    this.rejectedOrders = 0;
    this.tips = 0;
    this.incomeStatus = 0;
  }

  displayOrders() {
    const PACKAGED_ORDERS = this.orders.filter(
      (order) => order.status == "PACKAGED"
    );

    const DELIVERY_MAN_ORDERS = document.getElementById("delivery-man-orders");
    DELIVERY_MAN_ORDERS.innerHTML = "";

    let dynamicOrders = `<div>`;
    this.orders.forEach((order) => {
      dynamicOrders += generateDeliveryManOrder(order);
    });

    if (PACKAGED_ORDERS.length >= 2) {
      dynamicOrders += generateDeliveryManOrdersFooter();
    }

    dynamicOrders += `</div>`;

    DELIVERY_MAN_ORDERS.innerHTML = dynamicOrders;
  }

  deliverOrder(ORDER_ID) {
    let order = this.orders.find((order) => order.id == ORDER_ID);
    order.status = "ON THE WAY";
  }

  deliverAllOrders() {
    let packagedOrders = this.orders.filter(
      (order) => order.status == "PACKAGED"
    );
    packagedOrders.forEach((order) => (order.status = "ON THE WAY"));
  }
  succeedDeliveringOrder(ORDER_ID) {
    let order = this.orders.find((order) => order.id == ORDER_ID);
    order.status = "DELIVERED";
    return order;
  }

  failDeliveringOrder(ORDER_ID) {
    let order = this.orders.find((order) => order.id == ORDER_ID);
    order.status = "REJECTED";
  }

  removeOrder(ORDER_ID) {
    this.orders = this.orders.filter((order) => order.id != ORDER_ID);
  }
}
