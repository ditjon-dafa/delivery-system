export class Location {
  constructor(streetName, latitudePosition, longitudePosition) {
    this.streetName = streetName;
    this.latitudePosition = latitudePosition;
    this.longitudePosition = longitudePosition;
  }

  getExactAddress() {
    return `https://maps.google.com?q=${this.latitudePosition},${this.longitudePosition}`;
  }
}
