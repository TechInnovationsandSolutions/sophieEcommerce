import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ProductService, ICart } from 'src/app/shared';
import Swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() aProduct: IProduct;
  constructor(private productService: ProductService) { }

  addToCart() {
    console.log('lol', this.aProduct);
    const cartItem: ICart = {
      product_id: this.aProduct.id,
      product_name: this.aProduct.name,
      amount: this.aProduct.reduced_cost,
      amount_main: this.aProduct.cost,
      imgUrl: (this.aProduct.images[0] && this.aProduct.images[0].url) ? this.aProduct.images[0].url : '/assets/images/product-1.png',
      quantity: 1
    };

    this.productService.addToCart(cartItem).then((res) => {
      const text = res ? 'Successfully Added to cart' : 'Already Exist in Cart. You can increase quantity';
      console.log('carty0', text);
      Swal.fire({
        icon: res ? 'success' : 'info',
        toast: true,
        title: text,
        timer: 2000,
        showConfirmButton: false,
        position: 'top-right'
      });
    });
    // this.productService.addToCart(cartItem).then(res=>console.log('add to cart', res));
  }

  onActivate() {
    const scrollToTop = window.setInterval(() => {
        const pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16);
  }
}
