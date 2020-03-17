import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService, IUSer } from 'src/app/shared';
import Swal from "sweetalert2";
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  wrongAuth: boolean = false;
  url_route:string = '';
  @BlockUI() blockUI: NgBlockUI;
  
  constructor(private auth:AuthService, private fb:FormBuilder, private router: Router, private prodServ: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.min(6)]]
    });
    this.url_route= this.route.snapshot.queryParams.redirectUrl ? this.route.snapshot.queryParams.redirectUrl : '/shop';
  }

  resetForm(){
    this.wrongAuth = false;
  }

  submitForm(form){
    try {
      console.log('login f', form);
      this.blockUI.start();
      this.auth.loginUser(form.username, form.password).subscribe(
        r => {
          this.blockUI.stop();
          console.log(r);
          if(r.data.token && r.data.is_admin) {
            this.prodServ.setToken(r.data.token);
            this.auth.currentUser = <IUSer>r.data
            this.auth.setUser(JSON.stringify(this.auth.currentUser));

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
        this.blockUI.stop();
        this.wrongAuth = true
      });
    } catch (error) {
      console.error(error);
    }
  }
}
