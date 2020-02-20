import { Component, OnInit } from '@angular/core';
import { ProductService, ICategory, IProduct } from '../shared';

@Component({
  selector: 'shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {

  categories:ICategory[];
  isMobile:boolean;

  products:IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(res=>{
      console.log(res);
      this.products = <IProduct[]>res;
      console.log('products', this.products);
    })

    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
    this.productService.getCategories().subscribe(resp=>{
      this.categories = resp;
      console.log('categ', this.categories);
    })
  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 768;
    // console.log(w);
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }
}
