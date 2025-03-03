import { Chef } from "./components/business-staff/chef.js";
import { DeliveryMan } from "./components/business-staff/delivery-man.js";
import { Receptionist } from "./components/business-staff/receptionist.js";
import { Client } from "./components/client/client.js";
import { MENU } from "./components/order/menu.js";
import { ShoppingCart, Order } from "./components/order/order.js";

import {
  findMenuItem,
  generateMenuHeader,
  generateMenuItem,
  generateCartButton,
  generateShoppingCart,
  generateCheckout,
  generateReceptionistDashboard,
  generateChefDashboard,
  generateDeliveryManDashboard,
} from "./lib/helper.js";

let client = null;

let receptionist = new Receptionist("Receptionist", "00355691111111");

let chef = new Chef();

let deliveryMan = new DeliveryMan();

let shoppingCart = new ShoppingCart();

let generalOrderId = 0;

let isShownCart = false;

let isFirstClickCartBtn = false;

const TAB_LINKS = document.getElementsByClassName("tab-links");

const TAB_CLIENT = Array.from(TAB_LINKS).find(
  (tab) => tab.getAttribute("tab-name") == "client"
);
TAB_CLIENT.classList.add("active");

const CLIENT_SESSION = document.getElementById("client-session");
CLIENT_SESSION.classList.add("hide");

Array.from(TAB_LINKS).forEach((tab) => {
  const TAB_CONTENT = document.getElementById(tab.getAttribute("tab-name"));
  if (tab.getAttribute("tab-name") != "client") {
    TAB_CONTENT.classList.add("hide");
  }
});

const TABS = document.querySelectorAll(".tab-links");
TABS.forEach((tab) => {
  tab.addEventListener("click", showTabContent);
});

function showTabContent(event) {
  const TAB_TO_DEACTIVATE = Array.from(TAB_LINKS).find((tab) =>
    tab.classList.contains("active")
  );
  TAB_TO_DEACTIVATE.classList.remove("active");

  const TAB_CONTENT_TO_HIDE = document.getElementById(
    TAB_TO_DEACTIVATE.getAttribute("tab-name")
  );
  TAB_CONTENT_TO_HIDE.classList.add("hide");

  const ACTIVE_TAB = event.currentTarget;
  ACTIVE_TAB.classList.add("active");

  const ACTIVE_TAB_NAME = event.currentTarget.getAttribute("tab-name");
  const TAB_CONTENT_TO_DISPLAY = document.getElementById(ACTIVE_TAB_NAME);
  TAB_CONTENT_TO_DISPLAY.classList.remove("hide");
}

const RECEPTIONIST_DASHBOARD = document.getElementById(
  "receptionist-dashboard"
);
RECEPTIONIST_DASHBOARD.innerHTML = generateReceptionistDashboard(
  receptionist.generalSuccessfulOrders,
  receptionist.generalFailedOrders,
  receptionist.cashDeskStatus
);

const CHEF_DASHBOARD = document.getElementById("chef-dashboard");
CHEF_DASHBOARD.innerHTML = generateChefDashboard(
  chef.packagedOrders,
  chef.failedOrders
);

const DELIVERY_MAN_DASHBOARD = document.getElementById(
  "delivery-man-dashboard"
);
DELIVERY_MAN_DASHBOARD.innerHTML = generateDeliveryManDashboard(
  deliveryMan.deliveredOrders,
  deliveryMan.rejectedOrders,
  deliveryMan.tips,
  deliveryMan.incomeStatus
);

const BTN_SHOW_LOCATION = document.getElementById("location");
BTN_SHOW_LOCATION.addEventListener("click", showLocation);

function showLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const LATITUDE_INPUT = document.getElementById("lat");
  LATITUDE_INPUT.value = position.coords.latitude;

  const LONGITUDE_INPUT = document.getElementById("long");
  LONGITUDE_INPUT.value = position.coords.longitude;
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function displayCartButton() {
  const CART_BUTTON_DIV = document.getElementById("cart-button-div");
  CART_BUTTON_DIV.innerHTML = generateCartButton(
    isShownCart,
    shoppingCart.itemsQuantity
  );
}

function showHideMenu() {
  const MENU_CONTAINER = document.getElementById("menu");
  MENU_CONTAINER.classList.toggle("hide", isShownCart === true);
}

function currentChefOrderBtnsAct() {
  const BTN_PACKAGE_CHEF_ORDER = document.getElementById("package-chef-order");
  BTN_PACKAGE_CHEF_ORDER.addEventListener("click", packageChefOrder);

  const BTN_FAIL_CHEF_ORDER = document.getElementById("fail-chef-order");
  BTN_FAIL_CHEF_ORDER.addEventListener("click", failChefOrder);

  const BTN_NEXT_CHEF_ORDER = document.getElementById("next-chef-order");
  BTN_NEXT_CHEF_ORDER.addEventListener("click", goToNextChefOrder);
}

function deliveryManDeliverOrderBtnsAct() {
  const BTNS_DELIVER_ORDER = document.querySelectorAll(".deliver-order");
  BTNS_DELIVER_ORDER.forEach((button) => {
    button.addEventListener("click", deliveryManDeliverOrder);
  });
}

function deliveryManOnTheWayBtnsAct() {
  const BTNS_SUCCEED_DELIVERING_ORDER = document.querySelectorAll(
    ".succeed-delivering-order"
  );
  BTNS_SUCCEED_DELIVERING_ORDER.forEach((button) => {
    button.addEventListener("click", deliveryManSucceedDeliveringOrder);
  });

  const BTNS_FAIL_DELIVERING_ORDER = document.querySelectorAll(
    ".fail-delivering-order"
  );
  BTNS_FAIL_DELIVERING_ORDER.forEach((button) => {
    button.addEventListener("click", deliveryManFailDeliveringOrder);
  });
}

const BTN_REGISTER_CLIENT = document.getElementById("register");
BTN_REGISTER_CLIENT.addEventListener("click", registerClient);

function registerClient() {
  const CLIENT_NAME = document.getElementById("name").value;

  const CLIENT_PHONE_NUMBER = document.getElementById("phoneNumber").value;

  const CLIENT_ADDRESS = document.getElementById("address").value;
  const CLIENT_LATITUDE_POSITION = document.getElementById("lat").value;
  const CLIENT_LONGITUDE_POSITION = document.getElementById("long").value;

  const CLIENT_PAYMENT_METHOD = document.querySelector(
    "#paymentMethods > input:checked"
  ).value;

  if (!CLIENT_NAME) {
    alert("Fill the input with name!");
    return;
  }
  if (!CLIENT_PHONE_NUMBER) {
    alert("Fill the input with phone number!");
    return;
  }
  if (isNaN(CLIENT_PHONE_NUMBER)) {
    alert("Incorrect phone number input!");
    return;
  }

  const regexp = /^003556[0-9]{8}$/;

  if (!regexp.test(CLIENT_PHONE_NUMBER)) {
    alert("Incorrect phone number format (format: 003556XXXXXXXX) !");
    return;
  }

  if (!CLIENT_ADDRESS) {
    alert("Fill the input with address !");
    return;
  }

  if (!CLIENT_LATITUDE_POSITION) {
    alert("Fill the input with latitude number !");
    return;
  }
  if (isNaN(CLIENT_LATITUDE_POSITION)) {
    alert("Incorrect Lattitude input !");
    return;
  }
  if (!CLIENT_LONGITUDE_POSITION) {
    alert("Fill the input with longtitude number !");
    return;
  }
  if (isNaN(CLIENT_LONGITUDE_POSITION)) {
    alert("Incorrect longtitude number !");
    return;
  }

  client = new Client(
    CLIENT_NAME,
    CLIENT_PHONE_NUMBER,
    CLIENT_ADDRESS,
    CLIENT_LATITUDE_POSITION,
    CLIENT_LONGITUDE_POSITION,
    CLIENT_PAYMENT_METHOD
  );

  const CLIENT_REGISTRATION = document.getElementById("client-registration");
  CLIENT_REGISTRATION.classList.add("hide");

  const CLIENT_SESSION = document.getElementById("client-session");
  CLIENT_SESSION.classList.remove("hide");

  const CLIENT_WELCOME = document.getElementById("client-welcome");
  CLIENT_WELCOME.innerHTML = `Welcome, <b>${CLIENT_NAME}</b>`;

  displayCartButton();

  const BTN_LOG_OUT = document.getElementById("log-out");
  BTN_LOG_OUT.addEventListener("click", confirmLogOut);

  displayMenu(MENU);

  const BUTTONS = document.querySelectorAll(".order-now");
  BUTTONS.forEach((button) => {
    button.addEventListener("click", orderNow);
  });
}

function confirmLogOut() {
  if (confirm("Are you sure you want to log out?") == true) logOut();
}

function logOut() {
  client = null;
  shoppingCart = new ShoppingCart();
  const CLIENT_SESSION = document.getElementById("client-session");
  CLIENT_SESSION.classList.add("hide");

  const CLIENT_REGISTRATION = document.getElementById("client-registration");
  CLIENT_REGISTRATION.classList.remove("hide");

  const CLIENT_NAME = document.getElementById("name");
  const CLIENT_PHONE_NUMBER = document.getElementById("phoneNumber");
  const CLIENT_ADDRESS = document.getElementById("address");
  const CLIENT_LATITUDE_POSITION = document.getElementById("lat");
  const CLIENT_LONGITUDE_POSITION = document.getElementById("long");

  CLIENT_NAME.value = "";
  CLIENT_PHONE_NUMBER.value = "";
  CLIENT_ADDRESS.value = "";
  CLIENT_LATITUDE_POSITION.value = "";
  CLIENT_LONGITUDE_POSITION.value = "";

  isShownCart = false;
  isFirstClickCartBtn = false;
}

function displayMenu(MENU) {
  const MENU_CONTAINER = document.getElementById("menu");
  let menuHTML = generateMenuHeader();
  MENU.forEach((item) => {
    menuHTML += generateMenuItem(item);
  });

  MENU_CONTAINER.innerHTML = menuHTML;
}

function orderNow(event) {
  const BUTTON = event.currentTarget;
  const ID = BUTTON.parentNode.getAttribute("id");

  let menuItem = findMenuItem(MENU, ID);
  menuItem = { ...menuItem, quantity: 1, total: menuItem.price };
  shoppingCart.addItem(menuItem);

  const ALERT_ADDED_ITEM = document.getElementById(`alert-${ID}`);

  ALERT_ADDED_ITEM.classList.remove("hide");
  setTimeout(function () {
    ALERT_ADDED_ITEM.classList.add("hide");
  }, 1000);

  generateAndClickCartBtn();
}

function generateAndClickCartBtn() {
  displayCartButton();

  const CART_BUTTON = document.getElementById("cart-button");
  CART_BUTTON.addEventListener("click", cartBtnAct);
}

function cartBtnAct() {
  let shoppingCartContainer = document.getElementById("shopping-cart");
  const CHECKOUT_CONTAINER = document.getElementById("checkout-container");

  if (isShownCart === false) {
    shoppingCartContainer.innerHTML = "";
    const DYNAMIC_PRODUCTS = generateShoppingCart(shoppingCart);
    shoppingCartContainer.innerHTML = DYNAMIC_PRODUCTS;

    if (isFirstClickCartBtn === false) {
      CHECKOUT_CONTAINER.innerHTML = generateCheckout();

      const BTN_CHECKOUT = document.getElementById("checkout");
      BTN_CHECKOUT.addEventListener("click", registerOrder);
      isFirstClickCartBtn = true;
    }
    itemBtnsAct();
  }

  if (shoppingCart.items.length >= 1) {
    isShownCart = !isShownCart;
  }

  shoppingCartContainer.classList.toggle("hide", isShownCart === false);
  CHECKOUT_CONTAINER.classList.toggle("hide", isShownCart === false);
  showHideMenu();

  generateAndClickCartBtn();
}

function itemBtnsAct() {
  const BTN_INCREASE_QUANTITY = document.querySelectorAll(".increase-quantity");
  BTN_INCREASE_QUANTITY.forEach((button) => {
    button.addEventListener("click", modifyItemQuantity);
  });

  const BTN_DECREASE_QUANTITY = document.querySelectorAll(".decrease-quantity");
  BTN_DECREASE_QUANTITY.forEach((button) => {
    const ITEM_ID = button.parentNode.parentNode.getAttribute("id");
    const ITEM_QUANTITY = shoppingCart.getItemQuantity(ITEM_ID);

    button.classList.toggle("hide", ITEM_QUANTITY === 1);
    button.addEventListener("click", modifyItemQuantity);
  });

  const BTN_REMOVE_ITEM = document.querySelectorAll(".remove-item");
  BTN_REMOVE_ITEM.forEach((button) => {
    button.addEventListener("click", modifyItemQuantity);
  });
}

function modifyItemQuantity(event) {
  const BUTTON = event.currentTarget;
  const ITEM_ID = BUTTON.parentNode.parentNode.getAttribute("id");
  const ACTION = BUTTON.getAttribute("id");

  switch (ACTION) {
    case "+":
      shoppingCart.increaseItemQuantity(ITEM_ID);
      break;

    case "-":
      shoppingCart.decreaseItemQuantity(ITEM_ID);
      break;

    case "x":
      shoppingCart.removeItem(ITEM_ID);
      break;
  }

  let shoppingCartContainer = document.getElementById("shopping-cart");
  shoppingCartContainer.innerHTML = "";

  if (shoppingCart.items.length == 0) {
    const CHECKOUT_CONTAINER = document.getElementById("checkout-container");
    CHECKOUT_CONTAINER.innerHTML = "";

    isShownCart = false;
    displayCartButton();
    showHideMenu();
  } else {
    const DYNAMIC_PRODUCTS = generateShoppingCart(shoppingCart);
    shoppingCartContainer.innerHTML = DYNAMIC_PRODUCTS;

    itemBtnsAct();
    generateAndClickCartBtn();
  }
}

function registerOrder() {
  const ALERT_ORDER = document.getElementById("alert-order");

  ALERT_ORDER.classList.remove("hide");
  setTimeout(function () {
    ALERT_ORDER.classList.add("hide");
  }, 1000);

  setTimeout(function () {
    const SHOPPING_CART_CONTAINER = document.getElementById("shopping-cart");
    SHOPPING_CART_CONTAINER.innerHTML = "";

    const CHECKOUT_CONTAINER = document.getElementById("checkout-container");
    CHECKOUT_CONTAINER.innerHTML = "";
  }, 1000);

  generalOrderId++;

  let order = new Order(
    generalOrderId,
    shoppingCart,
    client.name,
    client.phoneNumber,
    client.location,
    client.paymentMethod
  );

  receptionist.registerNewOrder(order);
  receptionist.displayOrders();

  const BTNS_HIGH_PRIORITY_ORDER = document.querySelectorAll(
    ".high-priority-order"
  );
  BTNS_HIGH_PRIORITY_ORDER.forEach((button) => {
    button.addEventListener("click", proceedHighPriorityOrder);
  });

  const BTN_PROCEED_ORDERS = document.getElementById("proceed-orders");
  BTN_PROCEED_ORDERS.addEventListener("click", proceedOrders);

  shoppingCart = new ShoppingCart();

  setTimeout(function () {
    isShownCart = false;
    isFirstClickCartBtn = false;
    displayCartButton();
    showHideMenu();
  }, 1000);
}

function proceedHighPriorityOrder(event) {
  const BUTTON = event.currentTarget;

  const ORDER_ID = BUTTON.parentNode.parentNode.getAttribute("id");

  let highPriorityOrder = receptionist.getHighPriorityOrder(ORDER_ID);

  receptionist.removeOrder(highPriorityOrder);

  const RECEPTIONIST_ORDER_ALERT = document.getElementById(
    `receptionist-order-${ORDER_ID}-alert`
  );
  RECEPTIONIST_ORDER_ALERT.classList.remove("hide");

  setTimeout(function () {
    RECEPTIONIST_ORDER_ALERT.classList.add("hide");

    if (receptionist.orders.length == 0) {
      const RECEPTIONIST_ORDERS = document.getElementById(
        "receptionist-orders"
      );
      RECEPTIONIST_ORDERS.innerHTML = "";
    } else {
      receptionist.displayOrders();

      const BTNS_HIGH_PRIORITY_ORDER = document.querySelectorAll(
        ".high-priority-order"
      );
      BTNS_HIGH_PRIORITY_ORDER.forEach((button) => {
        button.addEventListener("click", proceedHighPriorityOrder);
      });

      const BTN_PROCEED_ORDERS = document.getElementById("proceed-orders");
      BTN_PROCEED_ORDERS.addEventListener("click", proceedOrders);
    }
  }, 3000);

  chef.orders.push(highPriorityOrder);

  if (chef.orders.length == 1) {
    chef.prepareOrder(highPriorityOrder);
  } else {
    chef.queueOrder(highPriorityOrder);
  }

  chef.displayOrders(chef.orders, 0);

  currentChefOrderBtnsAct();
}

function proceedOrders() {
  receptionist.orders.forEach((order) => {
    receptionist.removeOrder(order);
    chef.orders.push(order);
    if (chef.orders.length == 1) chef.prepareOrder(order);
    else chef.queueOrder(order);
  });

  const RECEPTIONIST_ORDERS_ALERT = document.getElementById(
    "receptionist-orders-alert"
  );
  RECEPTIONIST_ORDERS_ALERT.classList.remove("hide");

  setTimeout(function () {
    RECEPTIONIST_ORDERS_ALERT.classList.add("hide");
    const RECEPTIONIST_ORDERS = document.getElementById("receptionist-orders");
    RECEPTIONIST_ORDERS.innerHTML = "";
  }, 3000);

  chef.displayOrders(chef.orders, 0);

  currentChefOrderBtnsAct();
}

function goToNextChefOrder(event) {
  const BTN = event.currentTarget;

  const ACTUAL_CHEF_ORDER_POSITION = BTN.parentNode.getAttribute("id");
  const NEXT_CHEF_ORDER_POSITION = parseInt(ACTUAL_CHEF_ORDER_POSITION) + 1;

  chef.displayOrders(chef.orders, NEXT_CHEF_ORDER_POSITION);

  const BTN_CURRENT_CHEF_ORDER = document.getElementById("current-chef-order");
  BTN_CURRENT_CHEF_ORDER.addEventListener("click", goToCurrentChefOrder);

  const BTN_NEXT_CHEF_ORDER = document.getElementById("next-chef-order");
  BTN_NEXT_CHEF_ORDER.addEventListener("click", goToNextChefOrder);
}

function goToCurrentChefOrder() {
  chef.displayOrders(chef.orders, 0);

  currentChefOrderBtnsAct();
}

function packageChefOrder(event) {
  const BTN = event.currentTarget;

  const ORDER_ID = BTN.parentNode.getAttribute("id");

  let order = chef.orders.find((order) => order.id == ORDER_ID);
  chef.packageOrder(order);

  chef.packagedOrders += 1;

  const CHEF_DASHBOARD = document.getElementById("chef-dashboard");
  CHEF_DASHBOARD.innerHTML = generateChefDashboard(
    chef.packagedOrders,
    chef.failedOrders
  );

  chef.displayOrders(chef.orders, 0);
  chef.removeOrder(order);

  deliveryMan.orders.push(order);
  deliveryMan.displayOrders();

  deliveryManDeliverOrderBtnsAct();

  if (deliveryMan.orders.some((order) => order.status == "ON THE WAY")) {
    deliveryManOnTheWayBtnsAct();
  }

  if (chef.orders.length >= 1) {
    setTimeout(function () {
      chef.prepareOrder(chef.orders[0]);
      chef.displayOrders(chef.orders, 0);

      currentChefOrderBtnsAct();
    }, 3000);
  } else {
    setTimeout(function () {
      const CHEF_ORDER = document.getElementById("chef-order");
      CHEF_ORDER.innerHTML = "";
    }, 3000);
  }
}

function failChefOrder(event) {
  const BTN = event.currentTarget;

  const ORDER_ID = BTN.parentNode.getAttribute("id");

  let order = chef.orders.find((order) => order.id == ORDER_ID);

  chef.failOrder(order);
  chef.failedOrders += 1;

  const CHEF_DASHBOARD = document.getElementById("chef-dashboard");
  CHEF_DASHBOARD.innerHTML = generateChefDashboard(
    chef.packagedOrders,
    chef.failedOrders
  );

  receptionist.generalFailedOrders += 1;

  const RECEPTIONIST_DASHBOARD = document.getElementById(
    "receptionist-dashboard"
  );
  RECEPTIONIST_DASHBOARD.innerHTML = generateReceptionistDashboard(
    receptionist.generalSuccessfulOrders,
    receptionist.generalFailedOrders,
    receptionist.cashDeskStatus
  );

  chef.displayOrders(chef.orders, 0);
  chef.removeOrder(order);

  if (chef.orders.length >= 1) {
    setTimeout(function () {
      chef.prepareOrder(chef.orders[0]);
      chef.displayOrders(chef.orders, 0);

      currentChefOrderBtnsAct();
    }, 3000);
  } else {
    setTimeout(function () {
      const CHEF_ORDER = document.getElementById("chef-order");
      CHEF_ORDER.innerHTML = "";
    }, 3000);
  }
}

function deliveryManDeliverOrder(event) {
  const BTN = event.currentTarget;

  const ORDER_ID = BTN.parentNode.parentNode.getAttribute("id");

  deliveryMan.deliverOrder(ORDER_ID);

  deliveryMan.displayOrders();

  if (deliveryMan.orders.some((order) => order.status == "PACKAGED")) {
    deliveryManDeliverOrderBtnsAct();
  }

  deliveryManOnTheWayBtnsAct();
}

function deliveryManSucceedDeliveringOrder(event) {
  const BTN = event.currentTarget;

  const ORDER_ID = BTN.parentNode.parentNode.parentNode.getAttribute("id");

  let order = deliveryMan.succeedDeliveringOrder(ORDER_ID);
  deliveryMan.deliveredOrders += 1;
  deliveryMan.tips += order.deliveryManTipTotal;
  deliveryMan.incomeStatus += order.total;

  const DELIVERY_MAN_DASHBOARD = document.getElementById(
    "delivery-man-dashboard"
  );
  DELIVERY_MAN_DASHBOARD.innerHTML = generateDeliveryManDashboard(
    deliveryMan.deliveredOrders,
    deliveryMan.rejectedOrders,
    deliveryMan.tips,
    deliveryMan.incomeStatus
  );

  receptionist.generalSuccessfulOrders += 1;
  receptionist.cashDeskStatus += order.total;

  const RECEPTIONIST_DASHBOARD = document.getElementById(
    "receptionist-dashboard"
  );
  RECEPTIONIST_DASHBOARD.innerHTML = generateReceptionistDashboard(
    receptionist.generalSuccessfulOrders,
    receptionist.generalFailedOrders,
    receptionist.cashDeskStatus
  );

  deliveryMan.displayOrders();

  deliveryMan.removeOrder(ORDER_ID);

  if (deliveryMan.orders.length >= 1) {
    setTimeout(function () {
      deliveryMan.displayOrders();

      if (deliveryMan.orders.some((order) => order.status == "PACKAGED")) {
        deliveryManDeliverOrderBtnsAct();
      }
      if (deliveryMan.orders.some((order) => order.status == "ON THE WAY")) {
        deliveryManOnTheWayBtnsAct();
      }
    }, 3000);
  } else {
    setTimeout(function () {
      const DELIVERY_MAN_ORDERS = document.getElementById(
        "delivery-man-orders"
      );
      DELIVERY_MAN_ORDERS.innerHTML = "";
    }, 3000);
  }
}

function deliveryManFailDeliveringOrder(event) {
  const BTN = event.currentTarget;

  const ORDER_ID = BTN.parentNode.parentNode.parentNode.getAttribute("id");

  deliveryMan.failDeliveringOrder(ORDER_ID);
  deliveryMan.rejectedOrders += 1;

  const DELIVERY_MAN_DASHBOARD = document.getElementById(
    "delivery-man-dashboard"
  );
  DELIVERY_MAN_DASHBOARD.innerHTML = generateDeliveryManDashboard(
    deliveryMan.deliveredOrders,
    deliveryMan.rejectedOrders,
    deliveryMan.tips,
    deliveryMan.incomeStatus
  );

  receptionist.generalFailedOrders += 1;

  const RECEPTIONIST_DASHBOARD = document.getElementById(
    "receptionist-dashboard"
  );
  RECEPTIONIST_DASHBOARD.innerHTML = generateReceptionistDashboard(
    receptionist.generalSuccessfulOrders,
    receptionist.generalFailedOrders,
    receptionist.cashDeskStatus
  );

  deliveryMan.displayOrders();

  deliveryMan.removeOrder(ORDER_ID);

  if (deliveryMan.orders.length >= 1) {
    setTimeout(function () {
      deliveryMan.displayOrders();
      if (deliveryMan.orders.some((order) => order.status == "PACKAGED")) {
        deliveryManDeliverOrderBtnsAct();
      }

      if (deliveryMan.orders.some((order) => order.status == "ON THE WAY")) {
        deliveryManOnTheWayBtnsAct();
      }
    }, 3000);
  } else {
    setTimeout(function () {
      const DELIVERY_MAN_ORDERS = document.getElementById(
        "delivery-man-orders"
      );
      DELIVERY_MAN_ORDERS.innerHTML = "";
    }, 3000);
  }
}
