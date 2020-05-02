import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {
  isLogin = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    const correctRoute = this.route.snapshot.url[0].path;

    if (correctRoute === 'login') {
      this.isLogin = true;
      this.productService.makeSEO('Login');
    } else {
      this.isLogin = false;
      this.productService.makeSEO('Register');
    }
  }

}
