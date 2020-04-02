import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import { IUSer } from 'src/app/shared';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  isFormEditable: boolean = false;
  userProfileForm: FormGroup;
  @BlockUI() blockUI: NgBlockUI;

  userPasswordForm = this.fb.group({
    password: ['',[Validators.required,  Validators.minLength(6)]],
    new_password: ['',[Validators.required,  Validators.minLength(6)]]
  }, {validator: this.checkPasswords })

  ngOnInit() {
    const thisUser = this.auth.currentUser;

    this.userProfileForm = this.fb.group({
      first_name: [thisUser.first_name,Validators.required],
      last_name: [thisUser.last_name,Validators.required],
      // email: [thisUser.email, [Validators.required, Validators.email]],
      phone: [thisUser.phone, [Validators.required, ,  Validators.minLength(11)]],
    });

    const em = <HTMLInputElement>document.getElementById('userEmail');
    em.value = thisUser.email;
  }

  editForm(val:boolean){
    this.isFormEditable = val;

    if (!val) {
      const thisUser = this.auth.currentUser;
      this.userProfileForm.patchValue({
        first_name: thisUser.first_name,
        last_name: thisUser.last_name,
        email: thisUser.email,
        phone: thisUser.phone
      })
    }
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get('password').value;
    let newPassword = group.get('new_password').value;

    return pass !== newPassword ? null : { notSame: true }
  }

  onUserDetailSubmit(formValues:FormGroup){
    if (formValues.status.toLowerCase() === 'valid') {
      Swal.fire({
        title: 'Are you sure you want to chnage Password?',
        confirmButtonText: 'Yes, Change',
        cancelButtonText: 'No, Cancel'
      }).then((result)=>{
        if(result.value){
          console.log('formValues', formValues.value);
          this.blockUI.start();
          // setTimeout(() => {
          // this.blockUI.stop();
          // }, 2500);

          const _user = <IUSer>formValues.value;
          this.auth.updateUser(_user).then((res)=>{
            if (res.status = 'success') {
              this.blockUI.stop();
              Swal.fire('Successful', 'Your account details were updated successfully 🙂.', 'success')
            }
          }, (rej)=>{
            this.blockUI.stop();
            Swal.fire('Update Fail!', rej.message, 'warning')
          }).catch(err=>{
            this.blockUI.stop();
            Swal.fire('Update Fail!', err, 'error')
          })
        }else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Password was not changed',
            'info'
          )
        }
      }).catch(err=>console.error(err))
    }
  }


  onChangePasswordSubmit(formValue:FormGroup){
    if (formValue.status.toLowerCase() === 'valid') {
      Swal.fire({
        title: 'Are you sure you want to chnage Password?',
        confirmButtonText: 'Yes, Change',
        cancelButtonText: 'No, Cancel'
      }).then((result)=>{
        if(result.value){
          console.log('formValues', formValue.value);
          this.blockUI.start();
          setTimeout(() => {
            this.blockUI.stop();
            Swal.fire('Successful', 'Your account password was changed successfully 🙂.', 'success')
          }, 2500);

          // const _form = formValue.value;
          // this.auth.updatePassword(_form.password, _form.new_password).then((res)=>{
          //   if (res.status = 'success') {
          //     this.blockUI.stop();
          //     Swal.fire('Successful', 'Your account password was changed successfully 🙂.', 'success')
          //   }
          // }, (rej)=>{
          //   this.blockUI.stop();
          //   Swal.fire('Update Fail!', rej.message, 'warning')
          // }).catch(err=>{
          //   this.blockUI.stop();
          //   Swal.fire('Update Fail!', err, 'error')
          // })
        }else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Password was not changed',
            'info'
          )
        }
      }).catch(err=>console.error(err))
    }
  }

  canDeactivate() {
    // if the form is dirty
    if (this.userProfileForm.dirty) {
      return window.confirm('Do you want to discard profile changes?');
    }

    return true;
  }
}
