export interface FareCalculatorRequest {
  source: string;
  destination: string;
  type: number;
}

export class FareCalculatorRequest implements FareCalculatorRequest {
  source: string;
  destination: string;
  type: number;

  constructor();
  constructor(source: string, destination: string, type: number);
  constructor(source: string = '', destination: string = '', type: number = 0) {
    this.source = source;
    this.destination = destination;
    this.type = type;
  }
}
