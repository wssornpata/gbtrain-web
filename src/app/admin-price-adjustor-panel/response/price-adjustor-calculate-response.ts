export interface PriceAdjustorCalculateResponse {
  id: number;
  distance: number;
  price: number;
  description: string;
}

export class PriceAdjustorCalculateResponse {
  constructor(
    public id: number = 0,
    public distance: number = 0,
    public price: number = 0,
    public description: string = ''
  ) {}
}
