import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Map<number, number> = new Map();

  constructor() { }

  addToCart(productId: number, quantity: number): void {
    if (this.cart.has(productId)){
      this.cart.set(productId, this.cart.get(productId) as number + quantity);
    }else{
      this.cart.set(productId, quantity)
    }
  }
}
