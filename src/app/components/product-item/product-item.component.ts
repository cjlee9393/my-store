import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  quantity: number = 0;

  constructor(private cartService: CartService) { 
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
    alert("Added to cart!");

    this.cartService.addToCart(productId, quantity);
  }
}