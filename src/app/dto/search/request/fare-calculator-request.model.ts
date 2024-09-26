export interface FareCalculatorRequestInterface {
  source: string;
  destination: string;
  type: number;
}

export class FareCalculatorRequest implements FareCalculatorRequestInterface {
  source: string;
  destination: string;
  type: number;

  constructor(source: string = '', destination: string = '', type: number = 0) {
    this.source = source;
    this.destination = destination;
    this.type = type;
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
}
