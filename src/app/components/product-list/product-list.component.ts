import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];

  constructor(private httpClient: HttpClient, private cartService: CartService) { }

  ngOnInit(): void {
    const path = "http://localhost:4200/assets/data.json";

    this.httpClient.get(path).subscribe(res => {
      this.productList = (res as Product[]);
    })
  }
}
