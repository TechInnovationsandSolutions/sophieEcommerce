import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { userRoutes } from './user.routes';
import { LoginRegisterComponent } from "./login-register/login-register.component";
import { AuthService } from './auth.service';
import { MyAccountComponent } from './my-account/my-account.component';
import { MyAddressesComponent } from './my-addresses/my-addresses.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [
    LoginComponent, 
    RegisterComponent, 
    ProfileComponent, 
    ForgotPasswordComponent, LoginRegisterComponent, MyAccountComponent, MyAddressesComponent, MyOrdersComponent
  ],
  providers:[
  ]
})
export class UserModule { }
