export interface FareCalculatorRequest {
  source: string;
  destination: string;
  type: number;
}

export class FareCalculatorRequest {
	constructor(
	  public source: string = '',
	  public destination: string = '',
	  public type: number = 0
	) {}
  }