import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/shared';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: IProduct[];
  constructor() { }

}
