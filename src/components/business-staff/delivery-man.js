import { generateDeliveryManOrder } from "../../lib/helper.js";

export class DeliveryMan {
  constructor() {
    this.orders = [];
  }

  displayOrders() {
    const DELIVERY_MAN_ORDERS = document.getElementById("delivery-man-orders");
    DELIVERY_MAN_ORDERS.innerHTML = "";

    let dynamicOrders = `<div>`;
    this.orders.forEach((order) => {
      dynamicOrders += generateDeliveryManOrder(order);
    });

    dynamicOrders += `</div>`;

    DELIVERY_MAN_ORDERS.innerHTML = dynamicOrders;
  }

  deliverOrder(ORDER_ID) {
    let order = this.orders.find((order) => order.id == ORDER_ID);
    order.status = "ON THE WAY";
  }
}
