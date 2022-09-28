import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(productId: number, quantity: number): void {
    alert("Added to cart!");

    this.cartService.addToCart(productId, quantity);
  }

  foobar(): void {
    alert('foobar');
  }

}