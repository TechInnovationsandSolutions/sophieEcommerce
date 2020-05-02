import { Component, OnInit } from '@angular/core';
import { ICart, ProductService } from '../shared';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: ICart[] = [];
  totamt = 0;
  showPreloader = true;
  @BlockUI() blockUI: NgBlockUI;

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.productService.makeSEO('Cart');
    this.productService.getLocalCartItems().subscribe((cItems) => {
      console.log('cart items', cItems);
      this.cartItems = cItems;
      this.sumTotal();
      this.showPreloader = false;
    });
  }

  sumTotal() {
    this.totamt = 0;
    this.cartItems.forEach(item => {
      this.totamt += Number(item.quantity * item.amount);
    });
    console.log('this.totamt', this.totamt);
  }

  addOneMore(item: ICart) {
    item.quantity++;
    this.productService.updateLocalCart(item);
    this.sumTotal();
  }

  reduceByOne(item: ICart) {
    // tslint:disable-next-line: no-unused-expression
    (item.quantity > 1) ? item.quantity--  : item.quantity;
    this.productService.updateLocalCart(item);
    this.sumTotal();
  }

  valueInputChange(item: ICart, e) {
    const qty = !!e.target.value ? e.target.value : 0;
    if (qty > 1) {
      item.quantity = qty;
      this.productService.updateLocalCart(item);
      this.sumTotal();
    } else {
      item.quantity = 1;
      e.target.value = 1;
    }
  }

  removeFromCart(cartItem: ICart) {
    console.log('remove this from cart', cartItem);
    this.blockUI.start();
    this.productService.removeFromLocalCart(cartItem).subscribe((res) => {
      this.blockUI.stop();
      console.log('remove res', res);
      const cIndex = this.cartItems.indexOf(cartItem);
      this.cartItems.splice(cIndex, 1);
      this.sumTotal();
    });
  }
}
