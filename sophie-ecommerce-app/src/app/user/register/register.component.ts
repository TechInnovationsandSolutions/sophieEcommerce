import { Component, OnInit } from '@angular/core';
import { ProductService, IUSer, IUserReg } from 'src/app/shared';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private productService: ProductService, private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  states:any[] = [];
  registrationForm = this.fb.group({
      first_name: ['',Validators.required],
      last_name: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, ,  Validators.minLength(11)]],
      // address: ['',[Validators.required]],
      password: ['',[Validators.required,  Validators.minLength(6)]],
  });

  ngOnInit() {
    this.productService.getStateLGADetails().subscribe(s=>{
      this.states=<any[]>s;
      console.log('res0', s);
      console.log('state', this.states)
    });
  }

  validatePassword(control: AbstractControl){
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");
    const isNotPasswordFormat = regex.test(control.value);
    return isNotPasswordFormat ? null : {isNotPasswordFormat: true};
  }

  onSubmit(formValue){
    console.log(formValue);
    if (formValue.status.toLowerCase() === 'valid') {
      console.log(formValue.value);
      var _user:IUserReg = formValue.value;
      this.auth.registerUser(_user).then(res=>{
        if(res.status = 'success'){
          this.auth.currentUser ={
            email: _user.email,
            first_name: _user.first_name,
            last_name: _user.last_name,
            phone: _user.phone
          };
          Swal.fire({
            icon: 'success',
            title:'Account was Created Successfully',
            cancelButtonText: 'OK'
          }).then(()=>{
            this.router.navigate(['/shop']);
          })
        } else{
          return Promise.reject(res)
        }
      },
      rej=>{
        Swal.fire({
          icon: 'warning',
          title:'Account Creation failed',
          text: rej.message,
          cancelButtonText: 'OK'
        })
      }).catch(err=>{
        console.error(err);
      })
    }
  }

}
