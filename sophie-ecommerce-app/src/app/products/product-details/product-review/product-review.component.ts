import { Component, OnInit, Input } from '@angular/core';
import { IReview } from 'src/app/shared';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit {
  @Input() reviews: IReview[];
  addMode: boolean;
  isAuthenticated = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();
  }

  addReview() {
    this.addMode = true;
  }

  showReviews() {
    this.addMode = false;
  }
}
