export class ShoppingCart {
  constructor() {
    this.itemsQuantity = 0;
    this.items = [];
    this.itemsTotal = 0;
    this.deliveryManTipPercentage = 7;
    this.deliveryManTipTotal = 0;
    this.transportFee = 1;
    this.orderTotal = 0;
  }

  addItem(menuItem) {
    let existItem = false;

    let item = this.items.find((itemsEl) => itemsEl.id == menuItem.id);
    if (item != null) {
      item.quantity += menuItem.quantity;
      item.total += menuItem.price;

      this.itemsQuantity += menuItem.quantity;

      existItem = true;
    }

    if (existItem == false) {
      this.items.push(menuItem);
      this.itemsQuantity += menuItem.quantity;
    }

    this.itemsTotal += menuItem.price;
    this.updateOrderTotal();
  }

  increaseItemQuantity(ITEM_ID) {
    let item = this.items.find((item) => item.id == ITEM_ID);
    item.quantity += 1;
    item.total += item.price;

    this.itemsQuantity += 1;
    this.itemsTotal += item.price;
    this.updateOrderTotal();
  }

  getItemQuantity(ITEM_ID) {
    const ITEM = this.items.find((item) => item.id == ITEM_ID);
    return ITEM.quantity;
  }

  decreaseItemQuantity(ITEM_ID) {
    let item = this.items.find((item) => item.id == ITEM_ID);
    item.quantity -= 1;
    item.total -= item.price;

    this.itemsQuantity -= 1;
    this.itemsTotal -= item.price;
    this.updateOrderTotal();
  }

  removeItem(ITEM_ID) {
    let item = this.items.find((item) => item.id == ITEM_ID);
    this.items = this.items.filter((item) => item.id != ITEM_ID);
    this.itemsQuantity -= item.quantity;

    this.itemsTotal -= item.price * item.quantity;
    this.updateOrderTotal();
  }

  updateOrderTotal() {
    this.orderTotal = this.itemsTotal;

    this.deliveryManTipTotal =
      (this.itemsTotal * this.deliveryManTipPercentage) / 100;
    this.orderTotal += this.deliveryManTipTotal;

    this.orderTotal += this.transportFee;
  }
}

export class Order {
  constructor(
    id,
    shoppingCart,
    clientName,
    clientPhoneNumber,
    clientLocation,
    clientPaymentMethod
  ) {
    this.id = id;
    this.shoppingCart = shoppingCart;
    this.clientName = clientName;
    this.clientPhoneNumber = clientPhoneNumber;
    this.clientLocation = clientLocation;
    this.clientPaymentMethod = clientPaymentMethod;

    this.status = "SENT";

    this.deliveryManTipTotal = shoppingCart.deliveryManTipTotal;
    this.total = shoppingCart.orderTotal;
  }
}
