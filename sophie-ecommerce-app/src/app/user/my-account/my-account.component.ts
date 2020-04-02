import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  currentRoute = '';

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log('current pr', params);
      if (params.fn === 'profile') {
        this.currentRoute = 'profile';
      } else if (params.fn === 'shipping-address') {
        this.currentRoute = 'shipping-address';
      } else if (params.fn === 'orders') {
        this.currentRoute = 'orders';
      } else {
        // 404???
      }
    });
  }

}
