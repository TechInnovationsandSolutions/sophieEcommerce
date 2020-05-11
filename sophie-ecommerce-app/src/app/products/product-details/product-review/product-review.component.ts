import { Component, OnInit, Input } from '@angular/core';
import { IReview, ProductService, IComment } from 'src/app/shared';
import { AuthService } from 'src/app/user/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.scss']
})
export class ProductReviewComponent implements OnInit {
  @Input() reviewsInput: IReview[];
  @Input() productId: number;
  @Input() productName: string;

  reviews: IReview[] = [];
  addMode: boolean;
  canReview = false;
  commentForm: FormGroup;
  @BlockUI() blockUI: NgBlockUI;

  selectedComment = this.fb.group({
    rate: ['', [Validators.required, Validators.max(5), Validators.min(1)]],
    comment: ['', Validators.required]
  });

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log('this.reviewsInput', this.reviewsInput);
    this.reviews = this.reviewsInput.map(c => {
      c.canEdit = this.canEditComment(c);
      c.onEdit = c.canEdit ? false : null;
      return c;
    });
    if (this.productId && this.auth.isAuthenticated()) {
      this.productService.canAddReview(this.productId)
      .then(r => {
        console.log('can review', r);
        if (r.status === 'success') {
          this.canReview = true;
          const username = this.auth.currentUser.first_name + ' ' + this.auth.currentUser.last_name;

          this.commentForm =  this.fb.group({
            name: [username, Validators.required],
            rate: ['', [Validators.required, Validators.max(5), Validators.min(1)]],
            comment: ['', Validators.required]
          });
        }
      })
      .catch(e => console.error(e));
    }
  }

  get commentFormControl() {
    return this.commentForm.controls;
  }

  canEditComment(c: IReview) {
    return this.auth.isAuthenticated() ? ((this.auth.currentUser.first_name + ' ' + this.auth.currentUser.last_name) === c.name) : false;
  }

  isOnAddReview() {
    this.addMode = true;
  }

  showReviews() {
    this.addMode = false;
  }

  pushInNewComment() {
    if (this.commentForm.valid) {
      const newReview: IReview = {
        name: this.commentFormControl.name.value,
        rating: this.commentFormControl.rate.value,
        comment: this.commentFormControl.comment.value,
        created_at: new Date(Date.now()),
        canEdit: true,
        onEdit: false
      };

      this.reviews.push(newReview);
    }
  }

  popReview(r: IReview) {
    if (r) {
      const i = this.reviews.indexOf(r);
      this.reviews.splice(i, 1);
      this.reviewsInput.splice(i, 1);
    }
  }

  addReview() {
    if (this.commentForm.valid) {
      const frmValues: IComment = this.commentForm.value;
      const prodName = this.productName ? this.productName : 'this product';
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to add this review for ' + prodName,
        icon: 'info',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          this.blockUI.start('Please Wait...');
          this.productService.addProductReview(this.productId, frmValues)
          .then((res) => {
            this.blockUI.stop();
            if (res.status === 'success') {
              this.pushInNewComment();
              Swal.fire('Comment successfully added', '', 'success').then(() => this.showReviews());
            } else {
              throw new Error();
            }
          })
          .catch(e => console.error(e));
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            '',
            'error'
          );
        }
      });
    }
  }

  deleteThisReview(r: IReview) {
    if (this.auth.isAuthenticated()) {
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to delete this review',
        icon: 'warning',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          this.blockUI.start('Please Wait...');
          this.productService.deleteProductReview(r)
          .then((res) => {
            this.blockUI.stop();
            if (res.status === 'success') {
              this.popReview(r);
              Swal.fire('Comment deleted successfully', '', 'success');
            } else {
              throw new Error();
            }
          })
          .catch(e => console.error(e));
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            '',
            'error'
          );
        }
      });
    }
  }

  editThisReview(r: IReview) {
    if (this.auth.isAuthenticated()) {
      this.selectedComment.patchValue({
        rate: r.rating.toString(),
        comment: r.comment
      });

      r.onEdit = true;
    }
  }

  cancelEditOnThisReview(r: IReview) {
    r.onEdit = false;
    this.clearSelectReview();
  }

  clearSelectReview() {
    this.selectedComment.reset();
  }

  updateReview(r: IReview) {
    if (this.auth.isAuthenticated() && this.selectedComment.value) {
      const username = this.auth.currentUser.first_name + ' ' + this.auth.currentUser.last_name;
      const prodName = this.productName ? this.productName : 'this product';
      const updateComment: IComment = {
        name: username,
        comment: this.selectedComment.value.comment,
        rate: this.selectedComment.value.rate
      };
      Swal.fire({
        title: 'Confirmation',
        text: 'Are you sure you want to update this review for ' + prodName,
        icon: 'info',
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        showCancelButton: true
      }).then((result) => {
        if (result.value) {
          this.blockUI.start('Please Wait...');
          this.productService.updateProductReview(r.id, updateComment)
          .then((res) => {
            this.blockUI.stop();
            if (res.status === 'success') {
              this.pushInNewComment();
              Swal.fire('Comment updated successfully', '', 'success').then(() => {
                r.comment = updateComment.comment;
                this.cancelEditOnThisReview(r);
              });
            } else {
              throw new Error();
            }
          })
          .catch(e => console.error(e));
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            '',
            'error'
          );
        }
      });
      console.log('updateComment', updateComment);
    }
  }
}
