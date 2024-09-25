export interface PriceAdjustorRequest {
  id: number;
  distance: number;
  price: number;
  description: string;
}

export class PriceAdjustorRequest {
  constructor(
    id: number = 0,
    distance: number = 0,
    price: number = 0,
    description: string = ''
  ) {}
}
