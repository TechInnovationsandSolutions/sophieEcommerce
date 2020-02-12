import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from 'src/app/shared';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct;
  isReview: boolean;
  relatedProducts:IProduct[] = [];

  constructor(private productService: ProductService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params:Params)=>{
      this.productService.getProduct(+params['id']).then(res=>{
        console.log('the product',res)
        this.product = <IProduct>res[0];
      });
    });

    this.productService.getPopularProducts().then(res=>{
      console.log(res);
      this.relatedProducts = (<IProduct[]>res).slice(0, 4);
    })
  }

  showReview(){
    this.isReview = true;
  }

  showDescription(){
    this.isReview = false;
  }
}
