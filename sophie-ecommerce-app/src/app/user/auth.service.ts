import { Injectable } from "@angular/core";
import { IUserReg, IUSer, ProductService } from '../shared';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const USER = 'x-user';

@Injectable()
export class AuthService{
    constructor(private http: HttpClient, private serv: ProductService, private router: Router){}
    _url = this.serv._url + 'auth/';

    currentUser: IUSer;

    setUser(user: string): void {
        localStorage.setItem(USER, user);
    }
    
    getUser(){
        return<IUSer>JSON.parse(localStorage.getItem(USER));
    }

    removeUser(){
        localStorage.removeItem(USER);
    }

    isGotUser() {
        return localStorage.getItem(USER) != null;
    }

    registerUser(user:IUserReg){
        return this.http.post<any>(this._url + 'register', {
            email:user.email,
            first_name:user.first_name,
            last_name: user.last_name,
            password:user.password,
            password_confirmation:user.password,
        }).toPromise()
    }

    loginUser(userEmail:string, password: string):Observable<any>{
        if (userEmail && password) {
            return this.http.post<any>(this._url + 'login', {
                email: userEmail,
                password: password
            });
        }
    }

    isAuthenticated():boolean{
        var isLegit:boolean = false;

        if(this.currentUser){
            isLegit =  true;
        } else if(this.isGotUser()){
            this.currentUser = this.getUser();
            isLegit = true;
        }
        return isLegit;
        // return !!this.currentUser;
    }

    logOut(){
        this.currentUser = null;
        this.removeUser();
        this.router.navigate(['/'])
    }

    getAuthenticatedUser(){
        var token = this.serv.getToken();
        return new Promise((resolve, reject)=>{
            this.http.post<any>(this._url + 'user',{
                header: new HttpHeaders().set('Authorization', `Bearer ${token}`)
            }).subscribe(
                res=>{
                    console.log(res, token);
                    if (res.status == 'success') {
                        this.currentUser = <IUSer>res.data;
                        console.log('this.currentUser', this.currentUser)
                        resolve(res.status);
                    } else{
                        reject(res);
                    }
                }, 
                (err: HttpErrorResponse)=>{
                    console.log(err.error);
                }
            );
        })
    }
}

let users: IUserReg[] = [];