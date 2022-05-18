import { Component, OnInit } from '@angular/core';
import { ICart, ProductService } from '../shared';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

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
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.makeSEO('Cart');
    this.productService.getLocalCartItems().subscribe((cItems) => {
      // console.log('cart items', cItems);
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
    // console.log('this.totamt', this.totamt);
  }

  addOneMore(item: ICart) {
    if (item.maxQty && (item.quantity === item.maxQty)) {
      Swal.fire({
        icon: 'info',
        toast: true,
        title: 'The maximum number of ' + item.product + ' in stock is ' + item.quantity + '.',
        timer: 1000,
        showConfirmButton: false,
        position: 'top-right'
      });
    } else {
      item.quantity++;
      this.productService.updateLocalCart(item);
      this.sumTotal();
    }
  }

  reduceByOne(item: ICart) {
    // tslint:disable-next-line: no-unused-expression
    (item.quantity > 1) ? item.quantity--  : item.quantity;
    this.productService.updateLocalCart(item);
    this.sumTotal();
  }

  valueInputChange(item: ICart, e) {
    e.preventDefault();
    let qty: number = !!e.target.value ? e.target.value : 1;
    if (qty > 1) {
      if (item.maxQty && (qty >= item.maxQty)) {
        qty = item.maxQty;
        Swal.fire({
          icon: 'info',
          toast: true,
          title: 'The maximum number of ' + item.product + ' in stock is ' + item.maxQty + '.',
          timer: 1000,
          showConfirmButton: false,
          position: 'top-right'
        });
      }
      item.quantity = qty;
      this.productService.updateLocalCart(item);
      this.sumTotal();
    } else {
      item.quantity = 1;
    }
    e.target.value = qty;
  }

  removeFromCart(cartItem: ICart) {
    // console.log('remove this from cart', cartItem);
    this.blockUI.start();
    this.productService.removeFromLocalCart(cartItem).then(() => {
      this.blockUI.stop();
      // console.log('remove res', res);
      this.sumTotal();
    });
  }
}
