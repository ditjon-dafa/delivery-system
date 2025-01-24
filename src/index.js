import { Client } from "./components/client/client.js";
import { MENU } from "./components/order/menu.js";
import { ShoppingCart } from "./components/order/order.js";
import {
  findMenuItem,
  generateMenuHeader,
  generateMenuItem,
  generateShoppingCart,
} from "./lib/helper.js";

let client = null;
let shoppingCart = new ShoppingCart();
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
  displayMenu(MENU);

  const BUTTONS = document.querySelectorAll(".order-now");
  BUTTONS.forEach((button) => {
    button.addEventListener("click", orderNow);
  });
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
  menuItem = { ...menuItem, quantity: 1 };
  shoppingCart.addItem(menuItem);

  let alertAddedItem = document.getElementById(`alert-${ID}`);

  alertAddedItem.classList.remove("hide");
  setTimeout(function () {
    alertAddedItem.classList.add("hide");
  }, 1000);

  let shoppingCartContainer = document.getElementById("shopping-cart");
  shoppingCartContainer.innerHTML = "";

  const DYNAMIC_PRODUCTS = generateShoppingCart(shoppingCart);

  shoppingCartContainer.innerHTML = DYNAMIC_PRODUCTS;

  itemBtnsAction();
}

function itemBtnsAction() {
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
  const ID = BUTTON.parentNode.parentNode.getAttribute("id");
  const ACTION = BUTTON.getAttribute("id");

  switch (ACTION) {
    case "+":
      shoppingCart.increaseItemQuantity(ID);
      break;

    case "-":
      shoppingCart.decreaseItemQuantity(ID);
      break;

    case "x":
      shoppingCart.removeItem(ID);
      break;
  }

  let shoppingCartContainer = document.getElementById("shopping-cart");
  shoppingCartContainer.innerHTML = "";

  if (shoppingCart.items.length >= 1) {
    const DYNAMIC_PRODUCTS = generateShoppingCart(shoppingCart);
    shoppingCartContainer.innerHTML = DYNAMIC_PRODUCTS;
  }

  itemBtnsAction();
}
