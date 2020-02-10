import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginRegisterComponent } from "./login-register/login-register.component";

export const userRoutes:Routes = [
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'login',
        component: LoginRegisterComponent
    },
    {
        path: 'register',
        component: LoginRegisterComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    }
]