import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService } from '../shared';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  constructor(private productService: ProductService) { }
  wishList: IProduct[] = [];

  ngOnInit() {
    this.productService.getWishList().subscribe((res) => {
      this.wishList = res;
    });
  }

}
