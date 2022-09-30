import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ProductItemDetailService } from '../product-item-detail/product-item-detail.service';
import { Input } from '@angular/core';
import { AddedProduct, Product } from 'src/app/models/product';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: AddedProduct;
  @Output() mark: EventEmitter<number> = new EventEmitter();
  @Output() see: EventEmitter<number> = new EventEmitter();
  quantity: string;

  constructor(private cartService: CartService, private productItemDetailService: ProductItemDetailService) { 
    this.product = {
      id: 0,
      name: "name",
      price: 0,
      url: "url",
      description: "description",
      addedToCart: false
    }

    this.quantity = '1';
  }

  ngOnInit(): void {
  }

  addToCart(productId: number, quantity: string): void {
    try{
      this.cartService.addToCart(productId, +quantity);

      this.mark.emit(productId);

      alert("Added to cart!");
    }catch(err){
      alert((err as Error).message);
    }
  }

  setProduct(product: AddedProduct){
    this.productItemDetailService.setProduct(product);

    this.see.emit(product.id);
  }
}