import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct, IUSer, ICategory, ITestimonial, IReview, ICart, IUSerAddress } from './model';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const TOKEN = 'x-token';

@Injectable()
export class ProductService {
    _url = 'https://tis-bandb.herokuapp.com/api/v1/'; // Base URL
    private pageNoOfProduct = 20;

    private _social_media = '../assets/data/social_media.json';
    private _testimonial = '../assets/data/testimonial.json';
    private _contact_details = '../assets/data/contact_details.json';
    private _stateLGA = '../assets/data/state_lga_ng.json';

    _category: ICategory[] = [];

    constructor(private http: HttpClient, private router: Router) {}

    setToken(token: string): void {
        localStorage.setItem(TOKEN, token);
    }

    getToken() {
        return localStorage.getItem(TOKEN);
    }

    removeToken() {
        localStorage.removeItem(TOKEN);
    }

    isLogged() {
        return localStorage.getItem(TOKEN) != null;
    }

    checkLoggedIn() {
        this.isLogged() ? true : this.router.navigate(['/login']);
    }

    numberOfProductPages(totalNo) {
        const no = Math.ceil(totalNo / this.pageNoOfProduct);
        return new Array(no).fill(1); // Thank you Leonardo Giroto
    }

    getTestimonials(): Observable<ITestimonial[]> {
        return this.http.get(this._testimonial).pipe(map(resp => resp as ITestimonial[]));
    }

    getSocialMedia(): Observable<any[]> {
        return this.http.get(this._social_media).pipe(map(resp => resp as any[]));
    }

    getContactDetails(): Observable<any[]> {
        return this.http.get(this._contact_details).pipe(map(resp => resp as any[]));
    }

    getStateLGADetails(): Observable<any[]> {
      return this.http.get(this._stateLGA).pipe(map(resp => resp as any[]));
      ``; }

    getProducts(param: string) {
        return new Promise(resolve => {
          this.http.get<any>(this._url + 'products', {
            params: new HttpParams().set('page', param)
          }).subscribe(
            res => {
              console.log(res);
              if (res.status == 'success') {
                res.data.pg = this.numberOfProductPages(res.data.total);
                resolve(res.data);
              }
            },
            (err: HttpErrorResponse) => {
              console.log(err.error);
            }
          );
        });
    }

    getSearchedProducts(searchTerm: string, param: string) {
        return new Promise(resolve => {
          this.http.get<any>(this._url + 'products/search', {
            params: new HttpParams().set('search', searchTerm).set('page', param)
          }).subscribe(
            res => {
              console.log(res);
              if (res.status == 'success') {
                res.data.pg = this.numberOfProductPages(res.data.total);
                resolve(res.data);
              }
            },
            (err: HttpErrorResponse) => {
              console.log(err.error);
            }
          );
        });
    }

    getProductsByCategory(categoryName: string, param: string) {
      this._category = this._category.length ? this._category : this.getCategoryFromLocal();
      return new Promise(resolve => {
        let cat_url = '';
        if (categoryName == 'all') {
          cat_url = this._url + 'products';
        } else {
          const cat = this._category.find(c => c.name == categoryName);
          console.log('cat', categoryName, cat, this._category);
          if (!cat) { return; }
          cat_url = this._url + 'categories/' + cat.id + '/products';
        }
        console.log('cat_url', cat_url);

        this.http.get<any>(cat_url, {
        params: new HttpParams().set('page', param)
        }).subscribe(
        res => {
            console.log(res);
            if (res.status == 'success') {
            res.data.pg = this.numberOfProductPages(res.data.total);
            resolve(res.data);
            }
        },
        (err: HttpErrorResponse) => {
            console.log(err.error);
        }
        );
      });
    }

    getPopularProducts() {
        return new Promise(resolve => {
            this.http.get<any>(this._url + 'products').subscribe(
              res => {
                console.log(res);
                if (res.status == 'success') {
                    const data = (res.data.data.length > 7) ? res.data.data.slice(0, 8) : res.data.data;
                    resolve(data);
                }
              },
              (err: HttpErrorResponse) => {
                console.log(err.error);
              }
            );
          });
    }

    getCategories() {
        return new Promise(resolve => {
            this.http.get<any>(this._url + 'categories').subscribe(
              res => {
                console.log(res);
                if (res.status == 'success') {
                  this._category = res.data as ICategory[];
                  this.addToCategory(res.data);
                  resolve(res.data);
                  console.log('this._category', this._category);
                }
              },
              (err: HttpErrorResponse) => {
                console.log(err.error);
              }
            );
          });
    }

    getProduct(id: number) {
        return new Promise((resolve, reject) => {
            this.http.get<any>(this._url + 'products/' + id).subscribe(
              res => {
                console.log(res);
                if (res.status == 'success') {
                  console.log('this product', res.data);
                  resolve(res.data);
                } else if (res.code == 401) {
                  this.removeToken();
                  this.checkLoggedIn();
                } else {
                  reject(res);
                }
              },
              (err: HttpErrorResponse) => {
                console.log(err.error);
              }
            );
          });
    }

    getProductsByTag(tagName: string) {
      console.log('le tagname', tagName);
      return new Promise(resolve => {
          this.http.get<any>(this._url + 'products/tags', {
            params: new HttpParams().set('tag', tagName)
          }).subscribe(
            res => {
              console.log(res);
              if (res.status == 'success') {
                if (res.data && res.data.pg) {
                  res.data.pg = this.numberOfProductPages(res.data.total);
                }
                resolve(res.data);
              }
            },
            (err: HttpErrorResponse) => {
              console.log(err.error);
            }
          );
        });
    }

    // Address

    getUserAddresses() {
      const token = this.getToken();
      return this.http.get<any>(this._url + 'address', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }

    addUserAddress(address: IUSerAddress) {
      const token = this.getToken();
      return this.http.post<any>(this._url + 'address', {
        first_name: address.first_name,
        last_name: address.last_name,
        state_id: address.state_id,
        lga_id: address.lga_id,
        city: address.city,
        address: address.address,
        phone: address.phone,
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }

    updateUserAddress(address: IUSerAddress) {
      const token = this.getToken();
      return this.http.put<any>(this._url + 'address/' + address.id, {
        first_name: address.first_name,
        last_name: address.last_name,
        state_id: address.state_id,
        lga_id: address.lga_id,
        city: address.city,
        address: address.address,
        phone: address.phone,
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }

    deleteUserAddress(address: IUSerAddress) {
      const token = this.getToken();
      return this.http.delete<any>(this._url + 'address/' + address.id,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }

    // Orders
    getUserOrders() {
      const token = this.getToken();
      return this.http.get<any>(this._url + 'orders', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }

    getUserOrderById(id: string) {
      const token = this.getToken();
      return this.http.get<any>(this._url + 'orders/' + id, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }

    addUserOrder(order) {
      const token = this.getToken();
      return this.http.post<any>(this._url + 'address', {
        order
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }

    // Add to cart

    addToCart(item: ICart) {
        const isInCart = cartItems.find(c => c.product_id === item.product_id);
        console.log('de', isInCart);
        let result = false;

        // We expect undefine if it's not found
        if (!isInCart) {
            cartItems.push(item);
            this.updateToLocal();
            result = true;
        } else if (isInCart.quantity != item.quantity) {
            console.log('ups', item);
            this.updateCart(item);
            result = true;
        }

        const subject = new Subject<boolean>();
        setTimeout(() => {
            subject.next(result);
            subject.complete();
        }, 100);
        return subject.toPromise();

        // var token = this.getToken();
        // return this.http.post<any>(this._url + 'cart',{
        //   product_id: item.product_id,
        //   amount: item.amount,
        //   quantity: item.quantity
        // }, {
        //   headers: new HttpHeaders().set('Authorization',`Bearer ${token}`)
        // }).toPromise();
    }

    removeFromCart(item: ICart) {
        const isInCart = cartItems.find(c => c.product_id === item.product_id);

        // Yes in cart
        if (isInCart) {
            const ind = cartItems.indexOf(isInCart);
            cartItems.splice(ind, 1);
            this.updateToLocal();
        }
    }

    updateCart(item: ICart) {
        const isInCart = cartItems.find(c => c.product_id === item.product_id);

        // Yes in cart
        if (isInCart) {
            console.log('up to date');
            const i = cartItems.indexOf(isInCart);
            cartItems.splice(i, 1, item);
            this.updateToLocal();
        }
    }

    getCartItems(): Observable <ICart[]> {
        const subject = new Subject<ICart[]>();
        setTimeout(() => {
          console.log('Lemme in');
          cartItems = (!!cartItems.length) ? cartItems : this.getCartFromLocal();
          subject.next(cartItems);
          subject.complete();
        }, 100);
        return subject;

        // var token = this.getToken();
        // return this.http.get<any>(this._url + 'cart', {
        //   headers: new HttpHeaders().set('Authorization',`Bearer ${token}`)
        // });
    }

    clearCartItems() {
      cartItems = [];
      localStorage.removeItem('cart');
    }

    updateToLocal() {
        // since !0 = true -> 0 => false
        if (cartItems.length) {
            console.log(cartItems);
            const obj = JSON.stringify(cartItems);
            localStorage.setItem('cart', obj);
        }

        if (categories.length) {
            console.log(categories);
            const obj = JSON.stringify(categories);
            localStorage.setItem('category', obj);
        }
    }

    getCartFromLocal() {
        const data = localStorage.getItem('cart');
        const obj = JSON.parse(data) as ICart[];
        if (obj && !!obj.length) {
            return obj;
        }

        return [];
    }

    getCategoryFromLocal() {
      const data = localStorage.getItem('category');
      const obj = JSON.parse(data) as ICategory[];
      if (obj && !!obj.length) {
          return obj;
      }

      return [];
    }

    addToCategory(someCategories: ICategory[]) {
      categories = someCategories;
      this.updateToLocal();
    }
}

let cartItems: ICart[] = [];
let categories: ICategory[] = [];
