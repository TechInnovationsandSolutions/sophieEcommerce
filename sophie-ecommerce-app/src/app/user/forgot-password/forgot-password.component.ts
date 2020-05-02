import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared';
import Swal from 'sweetalert2';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  invalidEmail = false;
  fpStep = '';
  token = '';
  thisEmail = '';
  userId = 0;

  forgotPassword = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  newPassword = this.fb.group({
    password: ['',
      Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/))
      ])
    ]
  });

  newPasswordTest = [
    'Minimum eight characters',
    'Must contain an uppercase letter',
    'Must contain a lowercase letter',
    'Must contain a number'
  ];

  newPasswordTestResult = new Set();

  constructor(
    public fb: FormBuilder,
    private productService: ProductService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.productService.makeSEO('Forgot Password');
    this.activeRoute.queryParams.subscribe((qp) => {
      if (qp.token && qp.email) {
        this.token = qp.token;
        this.thisEmail = qp.email;
        console.log('qp', this.token, this.thisEmail);
        this.validateToken();
      }
    });
  }

  validateToken() {
    this.blockUI.start('Please Wait...');
    if (this.token) {
      this.productService.validateForgetPasswordToken(this.token, this.thisEmail).then((res) => {
        this.blockUI.stop();
        if (res.status === 'success') {
          this.fpStep = 'new email';
          this.userId = res.data.id;
        } else {
          throw new Error(res);
        }

        console.log(this.userId, res);
      })
      .then(() => this.btnTogglePassword())
      .catch(rej => console.error(rej));
    }
  }

  inResult(text: string) {
    return Array.from(this.newPasswordTestResult).includes(text);
  }

  validatePasswordText(text: string) {
    const regLowerCase = new RegExp(/.*[a-z].*/g);
    const regUpperCase = new RegExp(/.*[A-Z].*/g);
    const regDigit = new RegExp(/.*[0-9].*/g);
    const lgth = text.length;

    this.newPasswordTestResult  = new Set();

    if (lgth >= 8) {
      this.newPasswordTestResult.add('Minimum eight characters');
    }

    if (regLowerCase.test(text)) {
      this.newPasswordTestResult.add('Must contain a lowercase letter');
    }

    if (regUpperCase.test(text)) {
      this.newPasswordTestResult.add('Must contain an uppercase letter');
    }

    if (regDigit.test(text)) {
      this.newPasswordTestResult.add('Must contain a number');
    }
  }

  npTextChange() {
    const val = this.newPassword.get('password').value;
    this.validatePasswordText(val);
  }

  btnTogglePassword() {
    if (this.fpStep === 'new email') {
      setTimeout(() => {
        const btnPw = document.querySelector('button.btn-reveal') as HTMLInputElement;

        console.log(btnPw);
        btnPw.addEventListener('mousedown', this.seePassword, false);
        btnPw.addEventListener('touchstart', this.seePassword, false);

        btnPw.addEventListener('mouseleave', this.hidePassword, false);
        btnPw.addEventListener('mouseup', this.hidePassword, false);
        btnPw.addEventListener('touchend', this.hidePassword, false);
      }, 1000);
    }
  }

  seePassword() {
    const pw = document.getElementById('new-password') as HTMLInputElement;
    pw.type = 'text';
    // console.log(event.type, pw.type, pw);
  }

  hidePassword() {
    const pw = document.getElementById('new-password') as HTMLInputElement;
    // console.log(event.type, pw);
    pw.type = 'password';
  }

  onSubmit() {
    this.invalidEmail = false;
    this.blockUI.start();
    if (this.forgotPassword.valid) {
      console.log('Ki', this.forgotPassword.value);
      const email = this.forgotPassword.controls.email.value;
      this.productService.forgotPassword(email).subscribe((res) => {
        this.blockUI.stop();
        if (res.status === true) {
          this.fpStep = 'reset sent';
        } else {
          Swal.fire({
            title: res.message,
            icon: 'warning',
            confirmButtonText: 'OK'
          });
        }
        console.log('Ki', res);
      });
    } else {
      this.invalidEmail = true;
    }
  }

  onSubmitNewPassword() {
    this.invalidEmail = false;
    console.log('Ki', this.newPassword.value);
    this.blockUI.start('Updating...');
    if (this.newPassword.valid) {
      const pw = this.newPassword.controls.password.value;
      console.log(pw, this.userId);
      this.productService.changeForgetPassword(pw, this.userId.toString()).then(res => {
        this.blockUI.stop();
        if (res.status === 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Successful',
            text: 'Password updated successfully.',
            confirmButtonText: 'Proceed to Login',
            showCloseButton: false
          })
          .then(() => this.router.navigate(['./user/login']));
        } else {
          throw new Error(res);
        }
      }).catch((rej) => console.error(rej));
    } else {
      this.invalidEmail = true;
    }
  }
}
