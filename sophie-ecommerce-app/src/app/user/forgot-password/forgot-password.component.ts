import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public fb: FormBuilder, private productService: ProductService) { }
  invalidEmail = false;

  forgotPassword = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
  }

  onSubmit() {
    this.invalidEmail = false;
    console.log('this forgot email => ', this.forgotPassword.controls.email.value);
    if (this.forgotPassword.valid) {
      console.log('Ki', this.forgotPassword.value);
      const email = this.forgotPassword.controls.email.value;
      this.productService.forgotPassword(email).subscribe((res) => {
        console.log('Ki', res);
      });
    } else {
      this.invalidEmail = true;
    }
    this.productService.makeSEO('Forgot Password');
  }
}
