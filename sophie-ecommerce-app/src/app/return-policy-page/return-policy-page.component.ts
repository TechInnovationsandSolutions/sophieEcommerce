import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared';

@Component({
  selector: 'return-policy-page',
  templateUrl: './return-policy-page.component.html',
  styleUrls: ['./return-policy-page.component.scss']
})
export class ReturnPolicyPageComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.makeSEO('Return Policy');
  }

}
