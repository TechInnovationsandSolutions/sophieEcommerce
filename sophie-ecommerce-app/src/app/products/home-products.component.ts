import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../shared';

@Component({
  selector: 'home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  products:IProduct[] = [];
  
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productService.getPopularProducts().then(res=>{
      console.log(res);
      this.products = <IProduct[]>res;
      // console.log('products', this.products);
    })
  }

}
