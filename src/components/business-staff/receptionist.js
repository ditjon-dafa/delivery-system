export class Receptionist {
  constructor(name, phoneNumber) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.orders = [];
    this.generalSuccessfulOrders = 0;
    this.generalFailedOrders = 0;
    this.cashDeskStatus = 0;
  }
}
