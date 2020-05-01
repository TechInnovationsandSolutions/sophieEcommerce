import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ProductService, ICart } from 'src/app/shared';
import { ActivatedRoute, Params } from '@angular/router';
import { FirstCharCapitalizePipe } from 'src/app/common';
import Swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  providers: [FirstCharCapitalizePipe]
})
export class ProductDetailsComponent implements OnInit {
  isInWishList: boolean;
  // tslint:disable-next-line: variable-name
  @Input() set inWishList(_val) {
    this.isInWishList = _val ? true : false;
  }
  product: IProduct;
  isReview: boolean;
  relatedProducts: IProduct[] = [];
  quantity: number;

  cartQty: number;

  showPreloader = true;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private firstChar: FirstCharCapitalizePipe) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
    this.route.params.forEach((params: Params) => {
      this.productService.getProduct(+params.id).then(res => {
        console.log('the product', res);
        this.product = res as IProduct;
        this.showPreloader = false;
        this.makeProductSEOTags();
      }).then(() => {
        // console.log('pror', this.product);
        if (this.product.tags && this.product.tags.length) {
          const productTag = this.product.tags.map(t => t.name);
          console.log('tag-chain', productTag.join(','), productTag, this.product.tags);
          this.productService.getProductsByTag(productTag.join(',')).then(res => {
            this.relatedProducts = (res as IProduct[]).length > 8 ? (res as IProduct[]).slice(0, 8) : (res as IProduct[]);
          });
        }
      });
    });

    this.cartQty = this.route.snapshot.queryParams.cart;
    this.quantity = this.cartQty ? this.cartQty : 1;
  }

  showReview() {
    this.isReview = true;
  }

  showDescription() {
    this.isReview = false;
  }

  addOne() {
    this.quantity++ ;
    // console.log('df', this.quantity);
  }

  removeOne() {
    // tslint:disable-next-line: no-unused-expression
    (this.quantity > 1) ? this.quantity-- : this.quantity;
  }

  addToCart(e: Event, prod: IProduct, quantity: number) {
    e.preventDefault();

    if (quantity) {
      const cartItem: ICart = {
        id: prod.id,
        product: prod.name,
        amount: prod.reduced_cost,
        amount_main: prod.cost,
        imgUrl: (prod.images[0] && prod.images[0].url) ? prod.images[0].url : '/assets/images/product-1.png',
        quantity
      };
      console.log('cartItem', cartItem);
      this.productService.addToCart(cartItem).then((res) => {
        this.productService.addToLocalCart(cartItem);
        const text = res ? 'Successfully Added to cart' : 'Already Exist in Cart. You can increase quantity';
        console.log('carty0', text);
        Swal.fire({
          icon: res ? 'success' : 'info',
          toast: true,
          title: text,
          timer: 1000,
          showConfirmButton: false,
          position: 'top-right'
        });
      });
    } else {
      alert('Quantity of ' + this.product.name + ' must not be 0');
    }
  }

  makeProductSEOTags() {
    // tslint:disable-next-line: variable-name
    const _desc = 'Get quality affordable beauty and bath products like ' + this.product.name +  ' on Sophies Bath and Body';
    const desc = this.product.excerpt ? this.product.excerpt + '. ' + _desc : _desc;
    const productTitle = this.firstChar.transform(this.product.name);
    const imgUrl = (this.product.images[0] && this.product.images[0].url) ? this.product.images[0].url : '';
    this.productService.makeSEO(productTitle, desc, imgUrl);
  }

  addToWishList() {
    this.productService.addToWishList(this.product).then(() => {
      Swal.fire({
        icon: 'success',
        toast: true,
        title: 'Successfully Added to Wish List',
        timer: 2000,
        showConfirmButton: false,
        position: 'top-right'
      });
    },
    (err => console.error(err))
    );
  }

  removeFromWishList() {
    this.productService.removeFromWishList(this.product);
  }

  toWishList() {
    !this.isInWishList ? this.addToWishList() : this.removeFromWishList();
  }
}
