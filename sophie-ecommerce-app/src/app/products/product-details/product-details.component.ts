import { Component, OnInit } from '@angular/core';
import { IProduct, ProductService, ICart } from 'src/app/shared';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct;
  isReview: boolean;
  relatedProducts:IProduct[] = [];
  quantity: number;

  cartQty:number;

  constructor(private productService: ProductService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params:Params)=>{
      this.productService.getProduct(+params['id']).then(res=>{
        console.log('the product',res)
        this.product = <IProduct>res[0];
      }).then(()=>{
        this.productService.getProductsByTag(this.product.tag).then(res=>{
          this.relatedProducts = (<IProduct[]>res).length > 8 ? (<IProduct[]>res).slice(0, 8) : (<IProduct[]>res);
        })
      });
    });

    this.cartQty=this.route.snapshot.queryParams.cart;
    this.quantity = this.cartQty ? this.cartQty : 1;
  }

  showReview(){
    this.isReview = true;
  }

  showDescription(){
    this.isReview = false;
  }

  addOne(){
    this.quantity++ ;    
    // console.log('df', this.quantity);
  }

  removeOne(){
    (this.quantity > 1) ? this.quantity--  : this.quantity;
  }

  addToCart(e:Event, prod:IProduct, quantity:number){
    e.preventDefault();

    if(!!quantity){
      var cartItem:ICart = {
        product_id: prod.id,
        product_name: prod.name,
        amount: prod.promoPrice,
        amount_main: prod.price,
        imgUrl: prod.imageURL,
        quantity: quantity
      }
      console.log('cartItem',cartItem);
      this.productService.addToCart(cartItem);
    } else{
      alert('Quantity of ' + this.product.name + ' must not be 0');
    }
  }

  // co($event){
  //   console.log('otot', $event);
  // }
}
