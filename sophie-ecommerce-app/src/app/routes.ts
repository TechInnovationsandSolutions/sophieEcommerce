import { Routes } from "@angular/router";
import { HomeProductsComponent, AboutPageComponent, ContactPageComponent,PrivacyPageComponent, ReturnPolicyPageComponent,CartComponent } from "./index";
import { ProductDetailsComponent } from './products';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { CategoryPageComponent } from './products/category-page/category-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

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
        path:'shop/:slug',
        component: ShopPageComponent
    },
    {
        path: 'shop',
        redirectTo: 'shop/all', 
        pathMatch: 'full'
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
        path: 'checkout',
        component: CheckoutPageComponent,
        // canActivate
    },
    {
        path:'search',
        component: CategoryPageComponent
    },
    {
        path:'category/:slug',
        component: CategoryPageComponent
    },
    {
        path:'category',
        redirectTo: 'category/all', 
        pathMatch: 'full'
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