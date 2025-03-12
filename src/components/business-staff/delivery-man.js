import {
  generateDeliveryManOrder,
  generateDeliveryManOrdersFooter,
} from "../../lib/helper.js";

export class DeliveryMenStaff {
  constructor(id, phoneNumber) {
    this.id = id;
    this.name = "Delivery man " + id;
    this.phoneNumber = phoneNumber;
    this.status = "READY";
    this.orders = [];
  }
}
export class DeliveryMan {
  constructor() {
    this.staff = [];
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

    const DELIVERY_MEN_ON_THE_WAY = this.staff.filter(
      (deliveryMan) => deliveryMan.status == "ON THE WAY"
    );

    DELIVERY_MEN_ON_THE_WAY.forEach((deliveryMan) => {
      dynamicOrders += `<div class="delivery-men-staff-orders">`;
      dynamicOrders += `<div> <h4> Order(s) <span class="blue-font-color"> assigned </span> to <span class="blue-font-color"> ${deliveryMan.name} </span>! </h4> </div>`;
      deliveryMan.orders.forEach((order) => {
        dynamicOrders += generateDeliveryManOrder(deliveryMan.id, order);
      });
      dynamicOrders += `</div>`;
    });

    if (PACKAGED_ORDERS.length != 0) {
      dynamicOrders += `<div class="delivery-men-staff-orders">`;
      dynamicOrders += `<div> <h4> Order(s) <span class="blue-font-color"> not assigned </span> yet! </h4> </div>`;
      PACKAGED_ORDERS.forEach((order) => {
        dynamicOrders += generateDeliveryManOrder(-1, order);
      });
      dynamicOrders += `</div>`;
    }

    dynamicOrders += `</div>`;

    if (PACKAGED_ORDERS.length >= 2) {
      dynamicOrders += generateDeliveryManOrdersFooter();
    }

    DELIVERY_MAN_ORDERS.innerHTML = dynamicOrders;
  }

  deliverOrder(DELIVERY_MAN_ID, ORDER_ID) {
    let selectedDeliveryMan = this.staff.find(
      (deliveryMan) => deliveryMan.id == DELIVERY_MAN_ID
    );
    selectedDeliveryMan.status = "ON THE WAY";

    let orderToDeliver = this.orders.find((order) => order.id == ORDER_ID);
    orderToDeliver.status = "ON THE WAY";

    selectedDeliveryMan.orders.push(orderToDeliver);
  }

  deliverAllOrders(DELIVERY_MAN_ID) {
    let selectedDeliveryMan = this.staff.find(
      (deliveryMan) => deliveryMan.id == DELIVERY_MAN_ID
    );
    selectedDeliveryMan.status = "ON THE WAY";

    let packagedOrders = this.orders.filter(
      (order) => order.status == "PACKAGED"
    );
    packagedOrders.forEach((order) => {
      order.status = "ON THE WAY";
      selectedDeliveryMan.orders.push(order);
    });
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

  removeOrder(DELIVERY_MAN_ID, ORDER_ID) {
    this.orders = this.orders.filter((order) => order.id != ORDER_ID);

    let selectedDeliveryMan = this.staff.find(
      (deliveryMan) => deliveryMan.id == DELIVERY_MAN_ID
    );
    selectedDeliveryMan.orders = selectedDeliveryMan.orders.filter(
      (order) => order.id != ORDER_ID
    );

    if (selectedDeliveryMan.orders.length == 0)
      selectedDeliveryMan.status = "READY";
  }
}
