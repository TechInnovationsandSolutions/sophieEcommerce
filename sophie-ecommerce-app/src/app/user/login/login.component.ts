import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, IUSer } from 'src/app/shared';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  wrongAuth = false;
  // tslint:disable-next-line: variable-name
  url_route = '';
  @BlockUI() blockUI: NgBlockUI;

  constructor(private auth: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private prodServ: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]]
    });
    this.url_route = this.route.snapshot.queryParams.redirectUrl ? this.route.snapshot.queryParams.redirectUrl : '/shop';
  }

  resetForm() {
    this.wrongAuth = false;
  }

  submitForm(form) {
    try {
      this.blockUI.start();
      const email = form.username;
      const pw = form.password;
      this.auth.loginUser(email, pw).subscribe(
        r => {
          this.blockUI.stop();
          if (r.data.token && r.data.is_admin === null) {
            this.prodServ.setToken(r.data.token);
            this.auth.currentUser = {
              id: r.data.id,
              first_name: r.data.first_name,
              last_name: r.data.last_name,
              email: r.data.email,
              phone: r.data.phone,
            };
            this.auth.setUser(JSON.stringify(this.auth.currentUser));

            Swal.fire({
              icon: 'success',
              title: 'Signed in successfully',
              position: 'top-end',
              toast: true,
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });

            this.router.navigateByUrl(this.url_route);
            this.prodServ.populateLocalCartItems();
          }
      },
      r => {
        this.blockUI.stop();
        this.wrongAuth = true;
      });
    } catch (error) {
      // console.error(error);
    }
  }
}
