import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ICart, ProductService } from '../shared';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems : ICart[] = [];
  totamt:number = 0;
  @Output() linkEmit = new EventEmitter<any>();

  constructor(private productService:ProductService) { }

  ngOnInit(){
    this.productService.getCartItems().subscribe(cItems=>{
      this.cartItems = cItems;
      this.sumTotal();
    })
  }

  onLinkClick(qty:string){
    console.log('er', qty);
    this.linkEmit.emit(qty)
  }

  sumTotal(){
    this.totamt = 0;
    this.cartItems.forEach(item => {
      this.totamt += Number(item.quantity * item.amount);
    });
    console.log('this.totamt', this.totamt)
  }

  addOneMore(item:ICart){
    item.quantity++
    // console.log('current cart items?', this.cartItems);
    this.productService.updateCart(item);
    this.sumTotal();
  }

  reduceByOne(item:ICart){
    (item.quantity > 1) ? item.quantity--  : item.quantity;
    // console.log('current cart items?', this.cartItems);
    this.productService.updateCart(item);
    this.sumTotal();
  }

  removeFromCart(cartItem:ICart){
    console.log('remove this from cart', cartItem);
    this.productService.removeFromCart(cartItem);
    this.sumTotal();
  }
}
