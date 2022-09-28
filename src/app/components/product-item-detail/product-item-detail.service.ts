import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductItemDetailService {
  product: Product;

  constructor() {
    this.product = {
      id: 0,
      name: "name",
      price: 100,
      url: "url",
      description: "description"
    }
  }

  getProduct(): Product {
    return this.product;
  }

  setProduct(product: Product): void {
    this.product = product;
  }
}
