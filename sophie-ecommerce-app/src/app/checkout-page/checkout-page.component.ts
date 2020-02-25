import { Component, OnInit } from '@angular/core';
import { ProductService, ICart, IUSer } from '../shared';
import { PaystackOptions } from 'angular4-paystack';
import { AuthService } from '../user/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {
  cartItems : ICart[] = [];
  totamt:number = 0;
  currentUser:IUSer;

  options: PaystackOptions = {
    amount: 50000,
    email: 'user@mail.com',
    ref: `${Math.ceil(Math.random() * 10e10)}`
  }

  constructor(private productService:ProductService, private auth: AuthService, private route: Router) { }

  ngOnInit() {
    if(this.auth.isAuthenticated()){
      this.productService.getCartItems().subscribe(cItems=>{
        this.cartItems = cItems;
        this.sumTotal();
      })
    } else{
      this.currentUser = this.auth.currentUser;
      this.route.navigate(['/user', 'login'])
    }
  }

  sumTotal(){
    this.totamt = 0;
    this.cartItems.forEach(item => {
      this.totamt += Number(item.quantity * item.amount);
    });
    console.log('this.totamt', this.totamt)
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    alert('Payment successfull');
    console.log('this.title', ref);
  }

  paymentCancel() {
    console.log('payment failed');
  }

}
