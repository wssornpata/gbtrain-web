export interface FareCalculatorRequestInterface {
  origin: string;
  destination: string;
  type: number;
}

export class FareCalculatorRequest implements FareCalculatorRequestInterface {
  origin: string;
  destination: string;
  type: number;

  constructor(origin: string = '', destination: string = '', type: number = 0) {
    this.origin = origin;
    this.destination = destination;
    this.type = type;
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

  getType(): number {
    return this.type;
  }

  setType(value: number): void {
    this.type = value;
  }
}
