import { Component, OnInit } from '@angular/core';
import { ICart, ProductService } from '../shared';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems : ICart[] = [];

  constructor(private productService:ProductService) { }

  ngOnInit(){
    this.productService.getCartItems().subscribe(cItems=>{
      this.cartItems = cItems;
    })
  }

}
