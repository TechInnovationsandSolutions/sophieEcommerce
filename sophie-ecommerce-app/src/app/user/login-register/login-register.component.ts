import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  isLogin = true;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const correctRoute = this.route.snapshot.url[0].path;
    (correctRoute === 'login') ? (this.isLogin = true) : (this.isLogin = false);
  }

}
