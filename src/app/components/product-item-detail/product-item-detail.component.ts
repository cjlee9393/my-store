import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ProductItemDetailService } from './product-item-detail.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  product: Product;
  quantity: number;

  constructor(private cartService: CartService, private productItemDetailService: ProductItemDetailService) { 
    this.product = {
      id: 0,
      name: "name",
      price: 100,
      url: "url",
      description: "description"
    }

    this.quantity = 1;
  }

  ngOnInit(): void {
    this.product = this.productItemDetailService.getProduct();
  }

  addToCart(productId: number, quantity: number): void {
    try{
      this.cartService.addToCart(productId, quantity);
      alert("Added to cart!");
    }catch(err){
      alert((err as Error).message);
    }
  }

  foobar(): void {
    console.log(this.product);
    alert(`${this.product}`);
  }
}