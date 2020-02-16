import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ProductService, ICart } from 'src/app/shared';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() aProduct:IProduct;
  constructor(private productService: ProductService) { }

  addToCart(){
    console.log('lol', this.aProduct)
    var cartItem:ICart = {
      product_id: this.aProduct.id,
      amount: this.aProduct.promoPrice,
      imgUrl: this.aProduct.imageURL,
      quantity: 1
    }

    this.productService.addToCart(cartItem);
  }
}
