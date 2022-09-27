import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<Product[]> {
    const path = "http://localhost:4200/assets/data.json";

    return (this.httpClient.get(path) as Observable<Product[]>);
  }
}