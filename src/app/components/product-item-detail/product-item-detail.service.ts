import { Injectable } from '@angular/core';
import { AddedProduct, Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductItemDetailService {
  product: AddedProduct;

  constructor() {
    this.product = {
      id: 0,
      name: "name",
      price: 100,
      url: "url",
      description: "description",
      addedToCart: false
    }
  }

  getProduct(): AddedProduct {
    return this.product;
  }

  setProduct(product: AddedProduct): void {
    this.product = product;
  }
}
