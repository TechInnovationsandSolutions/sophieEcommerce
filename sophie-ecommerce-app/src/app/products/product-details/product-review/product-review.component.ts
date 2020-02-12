import { Component, OnInit, Input } from '@angular/core';
import { IReview } from 'src/app/shared';

@Component({
  selector: 'product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit {
  @Input() reviews: IReview[];
  addMode:boolean;
  constructor() { }

  ngOnInit() {
  }

  addReview(){
    this.addMode = true;
  }

  showReviews(){
    this.addMode = false;
  }
}
