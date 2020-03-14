import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, IUSer } from 'src/app/shared';
import Swal from "sweetalert2";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  wrongAuth: boolean = false;
  url_route:string = '';

  constructor(private auth:AuthService, private fb:FormBuilder, private router: Router, private prodServ: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.min(8)]]
    });
    this.url_route= this.route.snapshot.queryParams.redirectUrl ? this.route.snapshot.queryParams.redirectUrl : '/shop';
  }

  resetForm(){
    this.wrongAuth = false;
  }

  submitForm(form){
    console.log('login f', form);
    this.auth.loginUser(form.username, form.password).subscribe(
      r => {
        console.log(r);
        if(r.data.token && r.data.is_admin) {
          this.prodServ.setToken(r.data.token);
          this.auth.currentUser = <IUSer>r.data

          Swal.fire({
            icon: 'success',
            title: 'Signed in successfully',
            position: 'top-end',
            toast: true,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          })
          
          this.router.navigateByUrl(this.url_route);
        }
    },
    r => {
      this.wrongAuth = true
    });
    const resp = this.auth.loginUser(form.username, form.password);
    console.log('resp', resp);
  }
}
