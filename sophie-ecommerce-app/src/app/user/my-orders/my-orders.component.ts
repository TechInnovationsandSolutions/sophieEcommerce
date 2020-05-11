import { Component, OnInit } from '@angular/core';
import { ProductService, IOrder } from 'src/app/shared';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(
    private productService: ProductService
  ) { }

  userOrders: IOrder[] = [];
  showPreloader = true;

  ngOnInit() {
    this.productService.getUserOrders().then((res) => {
      console.log('orders', res);
      this.showPreloader = false;

      if (res.status === 'success') {
        this.userOrders = res.data;
        console.log('orderus', this.userOrders);
      } else {
        throw new Error(res);
      }
    }).catch(rej => console.error(rej));
  }

}
