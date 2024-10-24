export interface FareCalculatorResponseInterface {
  origin: string;
  destination: string;
  type: string;
  price: number;
}

export class FareCalculatorResponse implements FareCalculatorResponseInterface {
  origin: string;
  destination: string;
  type: string;
  price: number;

  constructor(
    origin: string = '',
    destination: string = '',
    type: string = '',
    price: number = 0
  ) {
    this.origin = origin;
    this.destination = destination;
    this.type = type;
    this.price = price;
  }

  getOrigin(): string {
    return this.origin;
  }

  setOrigin(value: string): void {
    this.origin = value;
  }

  getDestination(): string {
    return this.destination;
  }

  setDestination(value: string): void {
    this.destination = value;
  }

  getType(): string {
    return this.type;
  }

  setType(value: string): void {
    this.type = value;
  }

//   getDistance(): number {
//     return this.distance;
//   }

//   setDistance(value: number): void {
//     this.distance = value;
//   }

  getPrice(): number {
    return this.price;
  }

  setPrice(value: number): void {
    this.price = value;
  }
}
