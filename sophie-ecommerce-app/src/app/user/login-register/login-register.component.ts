import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  isLogin: boolean = false;

  constructor(private router:Router) { }

  ngOnInit() {
    var routes = this.router.url.split('/');
    var route = routes[2].toString().toLowerCase();

    (route === 'login') ? (this.isLogin = true) : (this.isLogin = false);
    console.log(this.router.url, routes, route)
  }

}
