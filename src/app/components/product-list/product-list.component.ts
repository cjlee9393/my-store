import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import { ProductListService } from './product-list.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[] = [];

  constructor(private httpClient: HttpClient, private productListService: ProductListService) { }

  ngOnInit(): void {
    this.productListService.getProductList().subscribe(res => {
      this.productList = (res as Product[]);
    })
  }
}
