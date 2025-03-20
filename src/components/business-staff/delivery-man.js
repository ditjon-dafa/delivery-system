import {
  generateDeliveryManOrder,
  generateDeliveryManOrdersBtn,
  generateDeliveryManSelectedOrdersBtn,
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
    this.selectedOrders = [];
    this.deliveredOrders = 0;
    this.rejectedOrders = 0;
    this.tips = 0;
    this.incomeStatus = 0;
  }

  displayOrders() {
    const PACKAGED_ORDERS = this.orders.filter(
      (order) => order.status == "PACKAGED"
    );

    const PACKAGED_OR_SELECTED_ORDERS =
      PACKAGED_ORDERS.length + this.selectedOrders.length;

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
        dynamicOrders += generateDeliveryManOrder(
          deliveryMan.id,
          order,
          PACKAGED_OR_SELECTED_ORDERS,
          this.selectedOrders
        );
      });
      dynamicOrders += `</div>`;
    });

    this.orders.forEach((order) => {
      if (order.status == "PACKAGED") {
        dynamicOrders += `<div class="delivery-men-staff-orders">`;
        dynamicOrders += `<div> <h4> Order <span class="blue-font-color"> not assigned </span>! </h4> </div>`;
        dynamicOrders += generateDeliveryManOrder(
          0,
          order,
          PACKAGED_OR_SELECTED_ORDERS,
          this.selectedOrders
        );
        dynamicOrders += `</div>`;
      } else if (order.status == "SELECTED") {
        dynamicOrders += `<div class="delivery-men-staff-orders">`;
        dynamicOrders += `<div> <h4 style="color: red;"> Order selected! </h4> </div>`;
        dynamicOrders += generateDeliveryManOrder(
          0,
          order,
          PACKAGED_OR_SELECTED_ORDERS,
          this.selectedOrders
        );
        dynamicOrders += `</div>`;
      }
    });

    dynamicOrders += `</div>`;

    if (this.selectedOrders.length == 0 && PACKAGED_ORDERS.length >= 2) {
      dynamicOrders += generateDeliveryManOrdersBtn();
    } else if (this.selectedOrders.length >= 1) {
      dynamicOrders += generateDeliveryManSelectedOrdersBtn();
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

  deliverSelectedOrders(DELIVERY_MAN_ID) {
    let selectedDeliveryMan = this.staff.find(
      (deliveryMan) => deliveryMan.id == DELIVERY_MAN_ID
    );
    selectedDeliveryMan.status = "ON THE WAY";

    this.selectedOrders.forEach((order) => {
      order.status = "ON THE WAY";
      selectedDeliveryMan.orders.push(order);
    });
    this.selectedOrders = [];
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

  removeSelectedOrder(SELECTED_ORDER_ID) {
    let order = this.orders.find((order) => order.id == SELECTED_ORDER_ID);
    order.status = "PACKAGED";

    this.selectedOrders = this.selectedOrders.filter(
      (order) => order.id != SELECTED_ORDER_ID
    );
  }
}
