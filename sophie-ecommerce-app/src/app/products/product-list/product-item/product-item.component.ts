import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() aProduct:IProduct;
  constructor() { }
}
