export interface PriceAdjustorRequestInterface {
  id: number;
  distance: number;
  price: number;
  description: string;
}

export class PriceAdjustorRequest implements PriceAdjustorRequestInterface {
  id: number;
  distance: number;
  price: number;
  description: string;

  constructor(
    id: number = 0,
    distance: number = 0,
    price: number = 0,
    description: string = ''
  ) {
    this.id = id;
    this.distance = distance;
    this.price = price;
    this.description = description;
  }

  getId(): number {
    return this.id;
  }

  setId(value: number): void {
    this.id = value;
  }

  getDistance(): number {
    return this.distance;
  }

  setDistance(value: number): void {
    this.distance = value;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(value: number): void {
    this.price = value;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(value: string): void {
    this.description = value;
  }
}