export interface FareCalculatorResponseInterface {
  origin: string;
  originFullname: string;
  destination: string;
  destinationFullname: string;
  price: number;
}

export class FareCalculatorResponse implements FareCalculatorResponseInterface {
  origin: string;
  originFullname: string;
  destination: string;
  destinationFullname: string;
  type: string;
  price: number;

  constructor(
    origin: string = '',
    originFullname: string = '',
    destination: string = '',
    destinationFullname: string = '',
    type: string = '',
    price: number = 0
  ) {
    this.origin = origin;
    this.originFullname = originFullname;
    this.destination = destination;
    this.destinationFullname = destinationFullname;
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

  getOriginFullname(): string {
    return this.originFullname;
  }

  setOriginFullname(value: string): void {
    this.originFullname = value;
  }

  getDestinationFullname(): string {
    return this.destinationFullname;
  }

  setDestinationFullname(value: string): void {
    this.destinationFullname = value;
  }

  getType(): string {
    return this.type;
  }

  setType(value: string): void {
    this.type = value;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(value: number): void {
    this.price = value;
  }
}
