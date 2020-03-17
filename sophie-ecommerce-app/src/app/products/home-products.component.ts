import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../shared';

@Component({
  selector: 'home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  popularProducts:IProduct[] = [];
  showPreloader:boolean = true;
  
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.productService.getPopularProducts().then(res=>{
      console.log(res);
      this.popularProducts = <IProduct[]>res;
      // console.log('products', this.products);
      this.showPreloader = false;
    })
  }

}
