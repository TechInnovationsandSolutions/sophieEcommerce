import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared';

@Component({
  selector: 'privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.scss']
})
export class PrivacyPageComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.makeSEO('Privacy Policy');
  }

}
