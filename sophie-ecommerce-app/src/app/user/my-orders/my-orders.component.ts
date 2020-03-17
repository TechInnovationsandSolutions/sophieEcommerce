import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(private productService: ProductService) { }

  userOrders: any[] = []; 
  showPreloader:boolean = true;

  ngOnInit() {
    this.productService.getUserOrders().then((res)=>{
      this.userOrders = res.data;
      this.showPreloader = false;
    })
  }

}
