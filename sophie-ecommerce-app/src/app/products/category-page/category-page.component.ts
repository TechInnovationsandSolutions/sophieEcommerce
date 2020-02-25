import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Options } from "ng5-slider";
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService, IProduct, ICategory } from 'src/app/shared';

@Component({
  selector: 'category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryPageComponent implements OnInit {
  products: IProduct[] = [];
  categories: ICategory[];
  showNoProducts: boolean = false;
  value: number = 1540;
  highValue: number = 4960;
  options: Options = {
    floor: 1000,
    ceil: 5000
  };
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.productService.getCategories().subscribe(resp=>{
      this.categories = resp;
    })

    if(!!Object.keys(this.route.snapshot.params).length){
      this.route.params.forEach((params:Params)=>{
        this.productService.getProductByCategory(params['slug']).then(res=>{
          console.log('the product',res)
          this.products = <IProduct[]>res;
          if(!this.products.length) this.showNoProducts = true;

          // if (params['slug'] && params['slug'] != 'all') {
          //   console.log('dsd', params['slug'])
          //   document.getElementById('product-categories').setAttribute('value', params['slug']);
          // }
          
        })
      })
    } else if(!!Object.keys(this.route.snapshot.queryParams).length){
    }

  }

}
