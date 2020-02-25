import { Routes } from "@angular/router";
import { HomeProductsComponent, AboutPageComponent, ContactPageComponent,PrivacyPageComponent, ReturnPolicyPageComponent,CartComponent } from "./index";
import { ProductDetailsComponent } from './products';

export const appRoutes:Routes =[
    {
        path: '',
        component: HomeProductsComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent
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
        path:'product', 
        redirectTo: '', 
        pathMatch: 'full'
    },
    {
        path:'products', 
        redirectTo: '', 
        pathMatch: 'full'
    },
    {
        path: 'cart',
        component: CartComponent
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