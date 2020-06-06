import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ProductService } from 'src/app';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.scss']
})
export class ShopItemsComponent implements OnInit {

  @Input() shopProducts: IProduct[];
  currentPageProducts: IProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // console.log('this.shopProducts', this.shopProducts);
    setTimeout(() => {
      this.currentPageProducts = this.shopProducts;
    }, 500);
  }
}
