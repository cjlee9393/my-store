import { Component, OnInit } from '@angular/core';
import { ProductListService } from './product-list.service';
import { CartService } from '../cart/cart.service';
import { Product, AddedProduct } from 'src/app/models/product';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: AddedProduct[];
  product: AddedProduct;
  isShowProductList: boolean;
  isShowProductItemDetail: boolean;

  mySubscription;

  constructor(private productListService: ProductListService, private cartService: CartService,
              private router: Router) {
    this.productList = [];
    this.product = {
      id: 0,
      name: 'name',
      price: 0,
      url: 'url',
      description: 'description',
      addedToCart: false
    }
    this.isShowProductList = false;
    this.isShowProductItemDetail = false;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         // Trick the Router into believing it's last link wasn't previously loaded
         this.router.navigated = false;
      }
    }); 
  }

  ngOnInit(): void {
    this.productListService.getProductList().subscribe(res => {
      const cart = this.cartService.getCart();

      for (let product of (res as Product[])){
        (product as AddedProduct).addedToCart = cart.has(product.id);

        this.productList.push(product as AddedProduct);
      }
    })

    this.isShowProductList = true;
    this.isShowProductItemDetail = false; 
  }

  markAsAdded(productId: number): void {  
    for (let product of this.productList){
      if (product.id == productId) product.addedToCart = true;
    }
  }

  seeDetail(productId: number): void {
    for (let product of this.productList){
      if (product.id == productId) this.product = product;
    }
    
    this.isShowProductList = false;
    this.isShowProductItemDetail = true;
  }
}
