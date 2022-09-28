import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from './cart.service';
import { ProductListService } from '../product-list/product-list.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productList: Product[] = [];
  cart: Map<number, number> = new Map();
  keys: number[] = [];

  constructor(private cartService: CartService, private productListService: ProductListService) { }

  ngOnInit(): void {
    this.productListService.getProductList().subscribe(res => {
      this.productList = res;

      this.cart = this.cartService.getCart();
      this.keys = [...this.cart.keys()];
    })
   }

  changeQuantity(id: number, quantity: number): void {
    this.cartService.changeQuantity(id, quantity);
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