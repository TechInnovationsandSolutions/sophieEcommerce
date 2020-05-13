import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared';

@Component({
  selector: 't-and-c-page',
  templateUrl: './term-and-conditions-page.component.html',
  styleUrls: ['./term-and-conditions-page.component.scss']
})
export class TermAndConditionsPageComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.makeSEO('Terms and Conditions');
  }

}
