import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { IProduct, IUSer, ICategory, ITestimonial, IReview, ICart } from './model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService{
    private _users = '../assets/data/users.json';
    private _products = '../assets/data/products.json';
    private _category = '../assets/data/category.json';
    private _social_media = '../assets/data/social_media.json';
    private _testimonial = '../assets/data/testimonial.json';
    private _contact_details = '../assets/data/contact_details.json';

    constructor(private _http:HttpClient){}

    getProducts(): Observable<IProduct[]>{
        return this._http.get(this._products).pipe(map(resp=><IProduct[]>resp));
    }

    getPopularProducts(){
        return new Promise(resolve=>{
            var popularProducts:IProduct[];
            this.getProducts().subscribe(response =>{
                popularProducts = response.filter(p=>!!p.isPopular);
                console.log('oso', popularProducts);
                resolve(popularProducts)
            });
        });
    }

    getCategories(): Observable<ICategory[]>{
        return this._http.get(this._category).pipe(map(resp=><ICategory[]>resp));
    }

    getTestimonials(): Observable<ITestimonial[]>{
        return this._http.get(this._testimonial).pipe(map(resp=><ITestimonial[]>resp));
    }

    getSocialMedia(): Observable<any[]>{
        return this._http.get(this._social_media).pipe(map(resp=><any[]>resp));
    }

    getContactDetails(): Observable<any[]>{
        return this._http.get(this._contact_details).pipe(map(resp=><any[]>resp));
    }

    getProduct(id:number){
        return new Promise(resolve=>{
            var product:IProduct[];
            this.getProducts().subscribe(response =>{
                product = response.filter(p=>p.id === id);
                // console.log('the product', product);
                resolve(product)
            });
        });
    }

    getProductByCategory(slug:string){
        if (slug.toLowerCase() == 'all') {
            return new Promise(resolve=>{
                var product:IProduct[];
                this.getProducts().subscribe(response =>{
                    product = response.filter(p=>p);
                    resolve(product)
                });
            });
        }
        var id:number = (slug.toLowerCase() == 'skin-type') ? 1 : 2;
        return new Promise(resolve=>{
            var product:IProduct[];
            this.getProducts().subscribe(response =>{
                product = response.filter(p=>p.category.id === id);
                // console.log('the product', product);
                resolve(product)
            });
        });
    }

    getProductsBySort(que){

    }

    getProductsByTag(tag:string[]){
        return new Promise(resolve=>{
            var relatedProducts:IProduct[];
            this.getProducts().subscribe(response =>{
                // console.log('tags', tag);
                relatedProducts = response.filter(p=>p.tag.some(t=> tag.indexOf(t) >= 0)); //indexOf is full supported but includes is not
                console.log('related', relatedProducts);
                resolve(relatedProducts)
            });
        });
    }

    addToCart(item:ICart){
        var isInCart = cartItems.find(c=> c.product_id === item.product_id);
        console.log('de', isInCart)

        //We expect undefine if it's not found
        if (!isInCart) {
            cartItems.push(item);
            this.updateToLocal();
        } else if(isInCart.quantity != item.quantity){
            console.log('ups', item)
            this.updateCart(item);
        }
    }

    removeFromCart(item:ICart){
        var isInCart = cartItems.find(c=> c.product_id === item.product_id);

        //Yes in cart
        if (isInCart) {
            var ind = cartItems.indexOf(isInCart);
            cartItems.splice(ind, 1);
            this.updateToLocal();
        }
    }

    updateCart(item:ICart){
        var isInCart = cartItems.find(c=> c.product_id === item.product_id);

        //Yes in cart
        if (isInCart) {
            console.log('up to date');
            var i = cartItems.indexOf(isInCart);
            cartItems.splice(i,1,item)
            this.updateToLocal();
        }
    }

    getCartItems() : Observable <ICart[]>{
        let subject = new Subject<ICart[]>();
        setTimeout(()=>{
            cartItems = (!!cartItems.length) ? cartItems : this.getFromLocal();
            subject.next(cartItems);
            subject.complete();
        }, 100);
        return subject
    }

    updateToLocal(){
        //since !0 = true -> 0 => false
        if(!!cartItems.length){
            console.log(cartItems)
            var obj = JSON.stringify(cartItems);
            localStorage.setItem('cart', obj);
        }
    }

    getFromLocal(){
        var data = localStorage.getItem('cart');
        var obj = <ICart[]>JSON.parse(data);
        if(obj && !!obj.length){
            return obj;
        }

        return [];
    }
}

let cartItems: ICart[] = [];