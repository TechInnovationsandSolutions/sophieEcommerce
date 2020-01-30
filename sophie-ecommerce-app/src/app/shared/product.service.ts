import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { IProduct, IUSer, ICategory, ITestimonial, IRating, IReview } from './model';
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
}