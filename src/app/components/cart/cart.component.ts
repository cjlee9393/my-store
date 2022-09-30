import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from './cart.service';
import { ProductListService } from '../product-list/product-list.service'
import * as e from 'cors';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productList: Product[] = [];
  cart: Map<number, number> = new Map();
  keys: number[] = [];
  quantities: number[] = [];
  total: number = 0;

  fullName: string = '';
  address: string = '';
  creditCardNumber: string = '';

  constructor(private cartService: CartService, private productListService: ProductListService) { }

  ngOnInit(): void {
    this.productListService.getProductList().subscribe(res => {
      this.productList = res;

      this.cart = this.cartService.getCart();
      this.keys = [...this.cart.keys()];
      
      this.quantities = [...Array(this.productList.length + 1)];
      for (let key of this.keys){
        this.quantities[key] = (this.cart.get(key) as number);
      }

      this.total = this.getTotal();
    })
   }

  changeQuantity(id: number, quantity: number): void {
    if (!quantity){
      this.keys.splice(this.keys.indexOf(id), 1)

      this.quantities.splice(id, 1)

      this.cartService.delFromCart(id)

      alert('Removed from cart!')
    }else{
      this.cartService.changeQuantity(id, quantity);
    }

    this.total = this.getTotal()
  }

  getProduct(id: number): Product {
    for (let product of this.productList){
      if (product.id == id) return product;
    }
    
    const err = new Error();
    err.name = "ProductNotExistError"
    err.message = "product that matches id does not exist"
    throw err
  }

  getTotal(): number {
    const cart = this.cart;

    let res = 0;

    for (let id of cart.keys()){
      let pidx = 0;
      let price = 0;
      let flag = false;

      for (pidx=0; pidx<this.productList.length; pidx++){
        if (this.productList[pidx].id == id){
          price = this.productList[pidx].price;
          flag = true;
          break;
        }
      }

      if (!flag){
        const err = new Error();
        err.name = "ProductNotExistError";
        err.message = "Product that matches id does not exist";
        throw err;
      }else{
        res += price * (cart.get(id) as number);
      }
    }

    return res;
  }

  getCart(): Map<number, number> {
    return this.cartService.getCart();
  }
}