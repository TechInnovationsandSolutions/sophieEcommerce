import { Component, OnInit } from '@angular/core';
import { ProductService, ICategory, IProduct } from '../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {

  categories:ICategory[];
  isMobile:boolean;

  products:IProduct[] = [];

  constructor(private route: ActivatedRoute,private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params:Params)=>{
      this.productService.getProductByCategory(params['slug']).then(res=>{
        console.log('the product',res)
        this.products = <IProduct[]>res;
      })
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

  onChangeSelect(val){
    this.router.navigate(['/shop', val])
  }
}
