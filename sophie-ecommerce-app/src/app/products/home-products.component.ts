import { Component, OnInit } from '@angular/core';
import { ProductService, IProduct } from '../shared';

@Component({
  selector: 'home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  products:IProduct[];

  constructor(private productService:ProductService) { }

  ngOnInit() {
    console.log('inn');
    this.productService.getProducts().subscribe(response => this.products = response);
    console.log('products', this.products);
  }

}
