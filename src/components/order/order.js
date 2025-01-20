export class ShoppingCart {
  constructor() {
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
      existItem = true;
    }

    if (existItem == false) {
      this.items.push(menuItem);
    }

    this.itemsTotal += menuItem.price;
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
