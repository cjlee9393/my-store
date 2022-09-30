import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ProductItemDetailService } from './product-item-detail.service';
import { AddedProduct, Product } from 'src/app/models/product';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  @Input() product: AddedProduct;
  quantity: number;
  @Output() mark: EventEmitter<number> = new EventEmitter();

  constructor(private cartService: CartService, private productItemDetailService: ProductItemDetailService) { 
    this.product = {
      id: 0,
      name: "name",
      price: 0,
      url: "url",
      description: "description",
      addedToCart: false
    }

    this.quantity = 1;
  }

  ngOnInit(): void { }

  addToCart(productId: number, quantity: number): void {
    try{
      this.cartService.addToCart(productId, quantity);

      this.mark.emit(productId);

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