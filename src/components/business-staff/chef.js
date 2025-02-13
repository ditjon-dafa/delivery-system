import { generateChefOrder } from "../../lib/helper.js";

export class Chef {
  constructor() {
    this.orders = [];
  }

  prepareOrder(order) {
    order.status = "PREPARING";
  }

  queueOrder(order) {
    order.status = "PENDING";
  }

  displayOrders(orders, currentOrder) {
    let chefOrder = document.getElementById("chef-order");
    chefOrder.innerHTML = "";
    chefOrder.innerHTML = generateChefOrder(orders, currentOrder);
  }
}
