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
}
