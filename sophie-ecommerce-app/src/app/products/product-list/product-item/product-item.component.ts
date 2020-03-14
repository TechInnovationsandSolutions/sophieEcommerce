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
      product_name: this.aProduct.name,
      amount: this.aProduct.reduced_cost,
      amount_main: this.aProduct.cost,
      imgUrl: this.aProduct.images[0].url,
      quantity: 1
    }

    this.productService.addToCart(cartItem);
  }

  onActivate() {
    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }
}
