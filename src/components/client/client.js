import { Location } from "./location.js";

export class Client {
  constructor(
    name,
    phoneNumber,
    address,
    latitudePosition,
    longitudePosition,
    paymentMethod
  ) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.location = new Location(address, latitudePosition, longitudePosition);
    this.paymentMethod = paymentMethod;
  }
}
