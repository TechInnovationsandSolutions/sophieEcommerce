import { Injectable } from "@angular/core";
import { IUserReg, IUSer, ProductService } from '../shared';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService{
    constructor(private http: HttpClient, private serv: ProductService, private router: Router){}
    _url = this.serv._url;

    currentUser: IUSer;

    registerUser(user:IUserReg){
        return this.http.post<any>(this._url + 'auth/register', {
            email:user.email,
            first_name:user.first_name,
            last_name: user.last_name,
            password:user.password,
            password_confirmation:user.password,
        }).toPromise()
    }

    loginUser(userEmail:string, password: string):Observable<any>{
        if (userEmail && password) {
            return this.http.post<any>(this._url + 'auth/login', {
                email: userEmail,
                password: password
            });
        }
    }

    isAuthenticated(){
        return !!this.currentUser;
    }

    logOut(){
        this.currentUser = null;
        this.serv.removeToken();
        this.router.navigate(['/'])
    }
}

let users: IUserReg[] = [];