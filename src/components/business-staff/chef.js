import { generateChefOrder } from "../../lib/helper.js";

export class Chef {
  constructor() {
    this.orders = [];
    this.packagedOrders = 0;
    this.failedOrders = 0;
  }

  prepareOrder(order) {
    order.status = "PREPARING";
  }

  queueOrder(order) {
    order.status = "PENDING";
  }

  displayOrders(orders, orderPosition) {
    let chefOrder = document.getElementById("chef-order");
    chefOrder.innerHTML = "";
    chefOrder.innerHTML = generateChefOrder(orders, orderPosition);
  }

  packageOrder(order) {
    order.status = "PACKAGED";
  }

  failOrder(order) {
    order.status = "BURNED OUT";
  }

  removeOrder(orderToRemove) {
    this.orders = this.orders.filter((order) => order.id != orderToRemove.id);
  }
}
