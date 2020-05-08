import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  showPreloader = true;
  orderStatus =  false;
  orderReference = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(q => {
      if (q.trxref && q.reference) {
        this.orderReference = q.reference;
        console.log(q);
        this.productService.verifyUserOrder(q.reference)
        .then((res) => {
          console.log(res);
          this.showPreloader = false;
          if (res.status === 'success') {
            // const resp = res.data;
            this.orderStatus = true;
          } else {
            throw new Error();
          }
        })
        .catch(err => err);
      }
    });
  }

}
