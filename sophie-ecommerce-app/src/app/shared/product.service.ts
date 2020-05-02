import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct, IUSer, ICategory, ITestimonial, IReview, ICart, IUSerAddress, IComment, IContact } from './model';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

const TOKEN = 'x-token';

@Injectable()
export class ProductService {
  // tslint:disable-next-line: variable-name
  _url = this.auth.baseUrl; // Base URL
  private pageNoOfProduct = 20;

  // tslint:disable-next-line: variable-name
  private _social_media = '../assets/data/social_media.json';
  // tslint:disable-next-line: variable-name
  private _testimonial = '../assets/data/testimonial.json';
  // tslint:disable-next-line: variable-name
  private _contact_details = '../assets/data/contact_details.json';
  // tslint:disable-next-line: variable-name
  private _stateLGA = '../assets/data/state_lga_ng.json';

  // tslint:disable-next-line: variable-name
  _category: ICategory[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
    ) {}

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

  forgotPassword(userEmail: string) {
    if (userEmail) {
      return this.http.post<any>(this._url + 'forgot/password', {
        email: userEmail
      });
    }
  }

  validateForgetPasswordToken(token: string, email: string) {
    if (token) {
      return this.http.get<any>(this._url + 'forgot/password-token', {
        params: new HttpParams().set('token', token).set('email', email)
      }).toPromise();
    }
  }

  changeForgetPassword(password: string, userId: string) {
    if (password && userId) {
      return this.http.post<any>(this._url + 'forgot/password-change', {
        // tslint:disable-next-line: object-literal-key-quotes
        'password': password,
        // tslint:disable-next-line: object-literal-key-quotes
        'user_id': userId
      }).toPromise();
    }
  }

  checkLoggedIn() {
    // tslint:disable-next-line: no-unused-expression
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
  }

  getProducts(param: string) {    return new Promise(resolve => {
      this.http.get<any>(this._url + 'products', {
        params: new HttpParams().set('page', param)
      }).subscribe(
        res => {
          console.log(res);
          // tslint:disable-next-line: triple-equals
          if (res.status == 'success') {
            res.data.pg = this.numberOfProductPages(res.data.total);
            resolve(res.data);
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
        }
      );
    });  }

  getSearchedProducts(searchTerm: string, param: string) {
    return new Promise(resolve => {
      this.http.get<any>(this._url + 'products/search', {
        params: new HttpParams().set('search', searchTerm).set('page', param)
      }).subscribe(
        res => {
          // tslint:disable-next-line: triple-equals
          if (res.status == 'success') {
            res.data.pg = this.numberOfProductPages(res.data.total);
            resolve(res.data);
          }
        },
        (err: HttpErrorResponse) => {
        }
      );
    });
  }

  getProductsByCategory(categoryName: string, param: string) {
    this._category = this._category.length ? this._category : this.getCategoryFromLocal();
    return new Promise(resolve => {
      // tslint:disable-next-line: variable-name
      let cat_url = '';
      // tslint:disable-next-line: triple-equals
      if (categoryName == 'all') {
        cat_url = this._url + 'products';
      } else {
        // tslint:disable-next-line: triple-equals
        const cat = this._category.find(c => c.name == categoryName);
        if (!cat) { return; }
        cat_url = this._url + 'categories/' + cat.id + '/products';
      }

      this.http.get<any>(cat_url, {
      params: new HttpParams().set('page', param)
      }).subscribe(
      res => {
          // tslint:disable-next-line: triple-equals
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
          // tslint:disable-next-line: triple-equals
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
          // tslint:disable-next-line: triple-equals
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
          // tslint:disable-next-line: triple-equals
          if (res.status == 'success') {
            console.log('this product', res.data);
            resolve(res.data);
          // tslint:disable-next-line: triple-equals
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
    return new Promise(resolve => {
      this.http.get<any>(this._url + 'products/tags', {
        params: new HttpParams().set('tag', tagName)
      }).subscribe(
        res => {
          console.log(res);
          // tslint:disable-next-line: triple-equals
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
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      return this.http.get<any>(this._url + 'address', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }
  }

  addUserAddress(address: IUSerAddress) {
    if (this.auth.isAuthenticated()) {
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
  }

  updateUserAddress(address: IUSerAddress) {
    if (this.auth.isAuthenticated()) {
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
  }

  deleteUserAddress(address: IUSerAddress) {
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      return this.http.delete<any>(this._url + 'address/' + address.id,
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }
  }

  // Orders
  getUserOrders() {
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      return this.http.get<any>(this._url + 'orders', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }
  }

  getUserOrderById(id: string) {
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      return this.http.get<any>(this._url + 'orders/' + id, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }
  }

  // tslint:disable-next-line: variable-name
  addUserOrder(address_id: string) {
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      return this.http.post<any>(this._url + 'orders', {
        address_id
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }
  }

  // Improve SEO
  makeSEO(title?: string, desc?: string, ogImg?: string) {
    const q$ = (selector) => {
      return document.querySelector(selector) as HTMLElement;
    };

    // tslint:disable-next-line: variable-name
    const _title = 'Sophies Bath and Body';
    // tslint:disable-next-line: variable-name
    const _desc = 'Sophies bath and body ensure that the body does not lorum tag ipsum I do mno.';
    // tslint:disable-next-line: variable-name
    const _ogImg = 'assets/images/logo.png';

    const titleTag = title ? title +  ' | ' + _title : _title;
    const descTag = desc ? desc : _desc;
    const ogImgTag = ogImg ? ogImg : _ogImg;

    q$('title').innerHTML = titleTag;
    q$('meta[name="description"]').setAttribute('content', descTag);
    q$('meta[property="og:title"]').setAttribute('content', titleTag);
    q$('meta[property="og:image"]').setAttribute('content', ogImgTag);
    q$('meta[property="og:url"]').setAttribute('content', window.location.href);
  }

  // Add to cart
  addToCart(item: ICart) {
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      return this.http.post<any>(this._url + 'cart', {
        product_id: item.id,
        amount: item.amount,
        quantity: item.quantity
      }, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }
  }

  removeFromCart(item: ICart) {
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      return this.http.delete<any>(this._url + 'cart/' + item.id, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }
  }

  updateCart(item: ICart) {
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      // tslint:disable-next-line: variable-name
      const product_id = item.id;
      const amount = item.amount;
      const quantity = item.quantity;
      return this.http.put<any>(this._url + 'cart/' + item.id, {
        product_id,
        amount,
        quantity
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }
  }

  getCartItems() {
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      console.log('sds');
      return this.http.get<any>(this._url + 'cart', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise().then(res => {
        if (res.status === 'success' && cartItems.length) {
          let arr: any[] = res.data.filter(r => !cartItems.includes(r));
          arr = arr.concat(cartItems);
          res.data = arr;
        }
        return res;
      });
    }
  }

  getLocalCartItems(): Observable<ICart[]> {
    const subject = new Subject<ICart[]>();
    setTimeout(() => {
      console.log('Lemme in');
      cartItems = (!!cartItems.length) ? cartItems : this.getCartFromLocal();
      subject.next(cartItems);
      subject.complete();
    }, 100);
    return subject;
  }

  // Local Cart for non-authenticated users
  populateLocalCartItems() {
    // if (this.isAuthenticated()) {
      this.getCartItems().then(res => {
        console.log('isPopulating', res);
        if (res.status === 'success') {
          const ids = cartItems.map(r => r.id);
          const arr = cartItems.length ?  res.data.filter((r: ICart) => !ids.includes(r.id)) : res.data;
          console.log('arr O', arr);
          cartItems = cartItems.concat(arr);
          this.updateToLocal();
        }
      });
    // }
  }

  addToLocalCart(item: ICart) {
    const isInCart = cartItems.find(c => c.id === item.id);
    console.log('de', isInCart);
    let result = false;

    // We expect undefine if it's not found
    if (!isInCart) {
      cartItems.push(item);
      this.updateToLocal();
      result = true;
      this.addToCart(item);
    // tslint:disable-next-line: triple-equals
    } else if (isInCart.quantity != item.quantity) {
      console.log('ups', item);
      this.updateLocalCart(item);
      result = true;
    }

    console.log('df0');

    const subject = new Subject<boolean>();
    setTimeout(() => {
      console.log('locak add', result, cartItems);
      this.getLocalCartItems();
      subject.next(result);
      subject.complete();
    }, 100);
    return subject.toPromise();
  }

  removeFromLocalCart(item: ICart) {
    const isInCart = cartItems.find(c => c.id === item.id);

    // Yes in cart
    if (isInCart) {
      const ind = cartItems.indexOf(isInCart);
      cartItems.splice(ind, 1);
      this.removeFromCart(item);
      this.updateToLocal();
    }
    const subject = new Subject<ICart[]>();
    setTimeout(() => {
      console.log('Lemme in');
      cartItems = (!!cartItems.length) ? cartItems : this.getCartFromLocal();
      subject.next(cartItems);
      subject.complete();
    }, 100);
    return subject;
  }

  updateLocalCart(item: ICart) {
    const isInCart = cartItems.find(c => c.id === item.id);

    // Yes in cart
    if (isInCart) {
      console.log('up to date');
      const i = cartItems.indexOf(isInCart);
      cartItems.splice(i, 1, item);
      this.updateToLocal();
      this.updateCart(item);
    }
  }

  clearCartItems() {
    cartItems = [];
    localStorage.removeItem('cart');
  }

  updateToLocal() {
    // since !0 = true -> 0 => false
    if (cartItems.length >= 0) {
      console.log(cartItems);
      const obj = JSON.stringify(cartItems);
      localStorage.setItem('cart', obj);
    }

    if (categories.length >= 0) {
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

  // For Wishlist
  addToWishList(product: IProduct) {
    const isInWish = wishList.find(w => w.id === product.id);
    console.log('de', isInWish);
    let result = false;

    // We expect undefine if it's not found
    if (!isInWish) {
      wishList.push(product);
      this.updateWishListToLocal();
      result = true;
    }

    const subject = new Subject<boolean>();
    setTimeout(() => {
      subject.next(result);
      subject.complete();
    }, 100);
    return subject.toPromise();
  }

  removeFromWishList(product: IProduct) {
    const isInWish = wishList.find(c => c.id === product.id);

    // Yes in wishlist
    if (isInWish) {
      const ind = wishList.indexOf(isInWish);
      wishList.splice(ind, 1);
      this.updateWishListToLocal();
    }
  }

  getWishList(): Observable <IProduct[]> {
    const subject = new Subject<IProduct[]>();
    setTimeout(() => {
      console.log('Lemme in');
      wishList = (!!wishList.length) ? wishList : this.getWishListFromLocal();
      subject.next(wishList);
      subject.complete();
    }, 100);
    return subject;
  }

  updateWishListToLocal() {
    // since !0 = true -> 0 => false
    if (wishList.length >= 0) {
      console.log(wishList);
      const obj = JSON.stringify(wishList);
      localStorage.setItem('wishList', obj);
    }
  }

  getWishListFromLocal() {
    const data = localStorage.getItem('wishList');
    const obj = JSON.parse(data) as IProduct[];
    if (obj && !!obj.length) {
      return obj;
    }

    return [];
  }

  // Prooduct Rating
  addProductRating(productId: number, commentReview: IComment) {
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      return this.http.post<any>(this._url + 'products/' + productId + '/ratings', {
        name: commentReview.name,
        rate: commentReview.rate,
        comment: commentReview.comment
      },
      {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }

    return new Promise((res, rej) => rej('Not Authorized'));
  }

  getProductRating(productId: number) {
    const token = this.getToken();
    return this.http.get<any>(this._url + 'products/' + productId + '/ratings').toPromise();
  }

  canAddReview(productId: number) {
    if (this.auth.isAuthenticated()) {
      const token = this.getToken();
      return this.http.get<any>(this._url + 'products/' + productId + '/review', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      }).toPromise();
    }

    return new Promise((res, rej) => rej('Not Authorized'));
  }

  // contact us
  contactUs(message: IContact) {
    return this.http.post<any>(this._url + 'contact', {
      subject: message.subject,
      name: message.name,
      email: message.email,
      body: message.body
    }).toPromise();
  }

  newsletterSub(useremail: string) {
    return this.http.post<any>(this._url + 'subscribe', {
      email: useremail
    }).toPromise();
  }
}

let cartItems: ICart[] = [];
let categories: ICategory[] = [];
let wishList: IProduct[] = [];
