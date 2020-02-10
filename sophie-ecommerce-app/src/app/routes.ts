import { Routes } from "@angular/router";
import { HomeProductsComponent, AboutPageComponent, ContactPageComponent,PrivacyPageComponent, ReturnPolicyPageComponent } from "./index";

export const appRoutes:Routes =[
    {
        path: '',
        component: HomeProductsComponent
    },
    {
        path:'about',
        component: AboutPageComponent
    },
    {
        path: 'contact',
        component: ContactPageComponent
    },
    {
        path: 'privacy-policy',
        component: PrivacyPageComponent
    },
    {
        path: 'return-policy',
        component: ReturnPolicyPageComponent
    },
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    }
    // {
    //     path:'', 
    //     redirectTo: '/home', 
    //     pathMatch: 'full'
    // },
]