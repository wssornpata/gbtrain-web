export interface priceAdjustorCalculateResponse{
    id: number;
    distance: number;
    price: number;
    description: string;
  }
  
  export class PriceAdjustorRequest {
    constructor(
      public id: number = 0,
      public distance: number = 0,
      public price: number = 0,
      public description: string = '',
    ) {}
  }