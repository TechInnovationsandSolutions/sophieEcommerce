import { Injectable } from "@angular/core";
import { IUserReg, IUSer, ProductService } from "../shared";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

const USER = "x-user";
const TOKEN = "x-token";

@Injectable()
export class AuthService {
  baseUrl = "http://ec2-52-87-173-131.compute-1.amazonaws.com/"; // Base URL
  // tslint:disable-next-line: variable-name
  _url = this.baseUrl + "auth/";

  currentUser: IUSer;

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  setUser(user: string): void {
    localStorage.setItem(USER, user);
  }

  getUser() {
    return JSON.parse(localStorage.getItem(USER)) as IUSer;
  }

  removeUser() {
    localStorage.removeItem(USER);
    localStorage.removeItem(TOKEN);
  }

  isGotUser() {
    return localStorage.getItem(USER) != null;
  }

  registerUser(user: IUserReg) {
    return this.http
      .post<any>(this._url + "register", {
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        password: user.password,
        password_confirmation: user.password,
      })
      .toPromise();
  }

  loginUser(userEmail: string, password: string): Observable<any> {
    if (userEmail && password) {
      return this.http.post<any>(this._url + "login", {
        email: userEmail,
        password,
      });
    }
  }

  updateUser(user: IUSer) {
    const token = this.getToken();
    return this.http
      .post<any>(
        this._url + "update",
        {
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          address: "t",
        },
        {
          headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
        }
      )
      .toPromise();
  }

  updatePassword(newPassword: string) {
    const token = this.getToken();
    return this.http
      .post<any>(
        this._url + "update-password",
        {
          newPassword,
        },
        {
          headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
        }
      )
      .toPromise();
  }

  isAuthenticated(): boolean {
    let isLegit = false;

    if (this.currentUser) {
      isLegit = true;
    } else if (this.isGotUser()) {
      this.currentUser = this.getUser();
      isLegit = true;
    }
    return isLegit;
    // return !!this.currentUser;
  }

  logOut() {
    this.currentUser = null;
    this.removeUser();
    this.router.navigate(["/"]);
  }

  getAuthenticatedUser(userEmail: string, password: string) {
    const token = this.getToken();
    return this.http
      .post<any>(
        this._url + "user",
        {
          userEmail,
          password,
        },
        {
          headers: new HttpHeaders().set("Authorization", `Bearer ${token}`),
        }
      )
      .toPromise();
  }
}

const users: IUserReg[] = [];
