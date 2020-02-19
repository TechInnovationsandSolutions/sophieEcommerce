import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  wrongAuth: boolean = false;

  constructor(private auth:AuthService, private fb:FormBuilder, private routr: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    })
  }

  resetForm(){
    this.wrongAuth = false;
  }

  submitForm(form){
    console.log('login f', form);
    const resp = this.auth.loginUser(form.username, form.password);
    console.log('resp', resp);

    if(resp){
      this.routr.navigate(['/products']);
    } else{
      this.wrongAuth = true;
    }
  }
}
