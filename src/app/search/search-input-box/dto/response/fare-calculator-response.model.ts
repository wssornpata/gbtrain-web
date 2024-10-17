export interface FareCalculatorResponseInterface {
  source: string;
  destination: string;
  type: number;
  price: number;
}

export class FareCalculatorResponse implements FareCalculatorResponseInterface {
  source: string;
  destination: string;
  type: number;
  price: number;

  constructor(
    source: string = '',
    destination: string = '',
    type: number = 0,
    price: number = 0
  ) {
    this.source = source;
    this.destination = destination;
    this.type = type;
    this.price = price;
  }

  getSource(): string {
    return this.source;
  }

  setSource(value: string): void {
    this.source = value;
  }

  getDestination(): string {
    return this.destination;
  }

  setDestination(value: string): void {
    this.destination = value;
  }

  getType(): number {
    return this.type;
  }

  setType(value: number): void {
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
