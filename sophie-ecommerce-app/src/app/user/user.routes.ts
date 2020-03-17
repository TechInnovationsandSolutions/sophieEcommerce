import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginRegisterComponent } from "./login-register/login-register.component";
import { MyAccountComponent } from './my-account/my-account.component';
import { AuthRouteGuardGuard } from '../shared/auth-route-guard.guard';

export const userRoutes:Routes = [
    {
        path: 'myaccount/:fn',
        component: MyAccountComponent,
        canActivate: [AuthRouteGuardGuard]
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
    },
    {
        path: 'myaccount',
        redirectTo: 'myaccount/profile',
        pathMatch: 'full'
    }
]