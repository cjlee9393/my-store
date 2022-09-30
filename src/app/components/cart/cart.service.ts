import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[];
  id: number;

  constructor() {
    this.cart = [];
    this.id = 1;
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(productId: number, quantity: number): void {
    console.log(`cart.service.addToCart(${productId}, ${quantity})`);
    if (typeof quantity === 'string' || (quantity as any) instanceof String){
      const err = new Error();
      err.name = "quantityNotNumberError";
      err.message = "quantity is not a number";
      throw err;
    }

    if (quantity <= 0){
      const err = new Error();
      err.name = "quantityNotPositiveError";
      err.message = "quantity is not positive";
      throw err;
    }

    this.cart.push({
      id: this.id++,
      productId: productId,
      quantity: quantity 
    })
  }

  changeQuantity(cartItemId: number, quantity: number): void {
    const cartItemIndex = this.cart.findIndex((item) => (item.id == cartItemId));

    if (cartItemIndex == -1){
      const err = new Error();
      err.name = "cartItemNotInCartError";
      err.message = "cart item does not exist in cart";
      throw err;
    }

    if (quantity <= 0){
      alert('removed from cart!');
      this.cart.splice(cartItemIndex, 1);
    }else{
      this.cart[cartItemIndex].quantity = quantity;
    }
  }

  delFromCart(cartItemId: number): void {
    const cartItemIndex = this.cart.findIndex((item) => (item.id == cartItemId));

    if (cartItemIndex == -1){
      const err = new Error();
      err.name = "cartItemNotInCartError";
      err.message = "cart item does not exist in cart";
      throw err;
    }
    this.cart.splice(cartItemIndex, 1);
  }

  reset(): void {
    this.cart = [];
  }
}
