import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: Map<number, number> = new Map();

  constructor() { }

  getCart(): Map<number, number> {
    return this.cart;
  }

  addToCart(productId: number, quantity: number): void {
    if (this.cart.has(productId)){
      this.cart.set(productId, this.cart.get(productId) as number + quantity);
    }else{
      this.cart.set(productId, quantity)
    }
  }

  changeQuantity(productId: number, quantity: number): void {
    if (!this.cart.has(productId)){
      const err = new Error();
      err.name = "productNotInCartError";
      err.message = "product does not exist in cart";
      throw err;
    }

    if (quantity == 0){
      alert('removed from cart!');
      this.cart.delete(productId);
    }else{
      this.cart.set(productId, quantity);
    }
  }

  delFromCart(productId: number): void {
    this.cart.delete(productId);
  }

  reset(): void {
    this.cart = new Map()
  }
}
