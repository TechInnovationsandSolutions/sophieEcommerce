import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from 'src/app/shared';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private productService: ProductService) { }
  currentRoute = '';

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log('current pr', params);
      if (params.fn === 'profile') {
        this.currentRoute = 'profile';
        this.productService.makeSEO('My Account - Profile');
      } else if (params.fn === 'shipping-address') {
        this.currentRoute = 'shipping-address';
        this.productService.makeSEO('My Account - Shipping Address');
      } else if (params.fn === 'orders') {
        this.currentRoute = 'orders';
        this.productService.makeSEO('My Account - Orders');
      } else {
        // 404???
      }
    });
  }

}
