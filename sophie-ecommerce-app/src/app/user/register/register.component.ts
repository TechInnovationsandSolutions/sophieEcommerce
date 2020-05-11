import { Component, OnInit } from '@angular/core';
import { ProductService, IUSer, IUserReg } from 'src/app/shared';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    first_name: ['',
      [
        Validators.required
      ]
    ],
    last_name: ['',
      [
        Validators.required
      ]
    ],
    email: ['',
      [
        Validators.required,
        Validators.email
      ]
    ],
    phone: ['',
      [
        Validators.required,
        Validators.minLength(11),
        this.validatePhoneNumber
      ]
    ],
    // address: ['',[Validators.required]],
    password: ['',
      [
        Validators.required,
        this.validatePassword.bind(this)
      ]
    ],
  });

  newPasswordTest = [
    'Minimum eight characters',
    'Must contain an uppercase letter',
    'Must contain a lowercase letter',
    'Must contain a number'
  ];

  newPasswordTestResult: any;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private productService: ProductService, private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    const btnPw = document.querySelector('button.reveal-password') as HTMLInputElement;

    btnPw.addEventListener('mousedown', this.seePassword, false);
    btnPw.addEventListener('touchstart', this.seePassword, false);

    btnPw.addEventListener('mouseleave', this.hidePassword, false);
    btnPw.addEventListener('mouseup', this.hidePassword, false);
    btnPw.addEventListener('touchend', this.hidePassword, false);
  }

  get regFrom() {
    return this.registrationForm.controls;
  }

  validatePassword(control: AbstractControl): {[key: string]: any} | null {
    const inpMinLegth = 8;
    const regLowerCase = new RegExp(/.*[a-z].*/g);
    const regUpperCase = new RegExp(/.*[A-Z].*/g);
    const regDigit = new RegExp(/.*[0-9].*/g);

    const text: string = control.value;
    const lgth = text.length;
    const maxValidation = 4;

    console.log('sd', this.newPasswordTest)
    this.newPasswordTestResult  = new Set();

    if (lgth >= inpMinLegth) {
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

    const isNotPasswordFormat = text ? this.newPasswordTestResult.size : 0;
    return isNotPasswordFormat === maxValidation ? null : {isNotPasswordFormat: true};
  }


  validatePhoneNumber(control: AbstractControl): {[key: string]: any} | null{
    const regx = new RegExp(/(^[0]\d{10}$)|(^[\+]?[234]\d{12}$)/g);
    const isNotValidPhone = regx.test(control.value);
    return isNotValidPhone ? null : {isNotValidPhone: true};
  }
  inResult(text: string) {
    return Array.from(this.newPasswordTestResult).includes(text);
  }

  seePassword() {
    const pw = document.getElementById('userPassword') as HTMLInputElement;
    pw.type = 'text';
    // console.log(event.type, pw.type, pw);
  }

  hidePassword() {
    const pw = document.getElementById('userPassword') as HTMLInputElement;
    // console.log(event.type, pw);
    pw.type = 'password';
  }

  onSubmit(formValue) {
    console.log(formValue);
    if (formValue.status.toLowerCase() === 'valid') {
      console.log(formValue.value);
      this.blockUI.start();
      // tslint:disable-next-line: variable-name
      const _user: IUserReg = formValue.value;
      this.auth.registerUser(_user).then(res => {
        this.blockUI.stop();
        if (res.status === 'success') {
          this.auth.currentUser = {
            email: _user.email,
            first_name: _user.first_name,
            last_name: _user.last_name,
            phone: _user.phone
          };
          Swal.fire({
            icon: 'success',
            title: 'Account was Created Successfully',
            cancelButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/shop']);
          });
        } else {
          return Promise.reject(res);
        }
      },
      rej => {
        this.blockUI.stop();
        Swal.fire({
          icon: 'warning',
          title: 'Account Creation failed',
          text: rej.message,
          cancelButtonText: 'OK'
        });
      }).catch(err => {
        this.blockUI.stop();
        console.error(err);
      });
    }
  }

}
