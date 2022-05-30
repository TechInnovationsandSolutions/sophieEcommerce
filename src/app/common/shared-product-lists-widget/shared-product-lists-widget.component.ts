// To create a product-list with title like popular products or related products.
import { Component, Input } from '@angular/core';
import { IProduct } from 'src/app/shared';

@Component({
  selector: 'shared-product-lists-widget',
  templateUrl: './shared-product-lists-widget.component.html',
  styleUrls: ['./shared-product-lists-widget.component.scss']
})
export class SharedProductListsWidgetComponent {

  @Input() theProducts: IProduct[];
  @Input() widgetTitle: string;
  constructor() { }

}
