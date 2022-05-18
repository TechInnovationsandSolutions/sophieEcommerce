import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { IUSer, IUserReg } from "../shared";
import { CrispyService } from "./encryption.service";

const USER = "x-user";
const TOKEN = "x-token";
const loco = "x3&#";
const polish = "kt-spt";
const polishUser = "kt-spt-uz";
@Injectable()
export class AuthService {
  baseUrl = "http://ec2-52-87-173-131.compute-1.amazonaws.com/"; // Base URL
  // tslint:disable-next-line: variable-name
  _url = this.baseUrl + "auth/";

  currentUser: IUSer;

  constructor(
    private http: HttpClient,
    private router: Router,
    private crispyService: CrispyService
  ) {}

  setToken(token: string, emailLog: string) {
    const user = this.crispyService.encryptyCrypto(emailLog, loco + TOKEN);
    const userToken = this.crispyService.encryptyCrypto(token, loco + user);
    localStorage.setItem(user, userToken);
    localStorage.setItem(polish, user);
  }

  getToken() {
    const user = localStorage.getItem(polish);
    const tk = localStorage.getItem(user);
    if (user && tk) {
      const userToken: string = this.crispyService.decryptyCrypto(
        tk,
        loco + user
      );
      return userToken;
    }
    return;
  }

  removeToken() {
    localStorage.removeItem(polish);
  }

  setUser(user: IUSer): void {
    const userEmail = this.crispyService.encryptyCrypto(
      user.email,
      loco + TOKEN + USER
    );
    const leUser = this.crispyService.encryptyCrypto(
      JSON.stringify(user),
      loco + userEmail
    );
    localStorage.setItem(userEmail, leUser);
    localStorage.setItem(polishUser, userEmail);
  }

  getUser() {
    const userE = localStorage.getItem(polishUser);
    const pU = localStorage.getItem(userE);
    if (userE && pU) {
      const leUser: string = this.crispyService.decryptyCrypto(
        pU,
        loco + userE
      );
      return JSON.parse(leUser) as IUSer;
    }
    return;
  }

  removeUser() {
    localStorage.removeItem(polishUser);
    this.removeToken();
  }

  isGotUser() {
    return this.getUser() != null;
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
