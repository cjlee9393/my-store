import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { ProductItemDetailService } from '../product-item-detail/product-item-detail.service';
import { Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  quantity: number = 1;

  constructor(private cartService: CartService, private productItemDetailService: ProductItemDetailService) { 
    this.product = {
      id: 0,
      name: "name",
      price: 0,
      url: "url",
      description: "description"
    }
  }

  ngOnInit(): void {
  }

  addToCart(productId: number, quantity: number): void {
    try{
      this.cartService.addToCart(productId, quantity);
      alert("Added to cart!");
    }catch(err){
      alert((err as Error).message);
    }
  }

  setProduct(product: Product){
    this.productItemDetailService.setProduct(product);
  }
}