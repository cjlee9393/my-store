import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from './cart.service';
import { ProductListService } from '../product-list/product-list.service'

import * as e from 'cors';
import { existsSync } from 'fs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productList: Product[] = [];
  cart: CartItem[] = [];

  keys: number[] = [];
  quantities: number[] = [];
  total: number = 0;

  fullName_: string = '';
  address_: string = '';
  creditCardNumber_: string = '';

  constructor(private cartService: CartService, private productListService: ProductListService) { }

  ngOnInit(): void {
    this.productListService.getProductList().subscribe(res => {
      this.productList = res;

      this.cart = this.cartService.getCart();
      this.keys = this.cart.map((item) => item.id);

      this.quantities = [...Array(this.keys.length)];
      for (let key of this.keys){
        this.quantities[key] = (this.cart[this.cart.findIndex((item => item.id == key))].quantity);
      }

      this.total = this.getTotal();

      console.log(this.cart);
    })
   }

  changeQuantity(id: number, quantity: number): void {
    if (!quantity){
      this.keys.splice(this.keys.indexOf(id), 1);

      this.quantities[id] = 0;

      this.cartService.delFromCart(id);

      alert('Removed from cart!')
    }else{
      this.cartService.changeQuantity(id, quantity);
    }

    this.total = this.getTotal()
  }

  getProduct(id: number): Product {
    const productId = this.cart[this.cart.findIndex((item) => item.id == id)].productId;
    const idx = this.productList.findIndex((item) => item.id == productId);

    if (idx == -1){
      const err = new Error();
      err.name = "ProductNotExistError"
      err.message = "product that matches id does not exist"
      throw err
    }
    
    return this.productList[idx];
  }

  getTotal(): number {
    let res = 0;

    const prices =  this.keys.map((key) => this.cart[this.cart.findIndex(item => item.id == key)].productId)
                             .map((id) => this.productList[this.productList.findIndex(item => item.id == id)].price);

    // console.log('prices: ', prices)
    // console.log('quantities: ', this.quantities)
    // const keys = this.cart.map((item) => item.productId);
    // console.log('keys: ', this.keys);

    for (let key of this.keys){
      const price = this.getProduct(key).price;
      const quantity = this.quantities[key];

      res += price * quantity;
    }
    
    return res;
  }

  getCart(): CartItem[] {
    return this.cartService.getCart();
  }
}