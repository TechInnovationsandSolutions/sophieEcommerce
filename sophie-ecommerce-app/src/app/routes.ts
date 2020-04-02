import { Routes } from "@angular/router";
import { HomeProductsComponent, AboutPageComponent, ContactPageComponent,PrivacyPageComponent, ReturnPolicyPageComponent,CartComponent } from "./index";
import { ProductDetailsComponent } from './products';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { CategoryPageComponent } from './products/category-page/category-page.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { AuthRouteGuardGuard } from './shared/auth-route-guard.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { ComponentDeactivateGuard } from './shared/component-deactivate.guard';

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
        component: ContactPageComponent,
        canDeactivate: [ComponentDeactivateGuard]
    },
    {
        path:'shop/:slug',
        component: ShopPageComponent,
        data:{
            breadcrumb:''
        }
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
        redirectTo: 'shop',
        pathMatch: 'full'
    },
    {
        path:'products',
        redirectTo: 'shop',
        pathMatch: 'full'
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
      path: 'wishlist',
      component: WishListComponent
    },
    {
        path: 'checkout',
        component: CheckoutPageComponent,
        canActivate: [AuthRouteGuardGuard]
    },
    {
        path: 'myaccount',
        component: CheckoutPageComponent,
        canActivate: [AuthRouteGuardGuard]
    },
    {
        path:'search',
        component: CategoryPageComponent
    },
    {
        path:'category/:slug',
        redirectTo: 'shop/:slug',
        pathMatch: 'full'
    },
    {
        path:'category',
        redirectTo: 'shop/all',
        pathMatch: 'full'
    },
    {
        path: 'user',
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: '**',
        component: NotFoundComponent
    }
    // {
    //     path:'',
    //     redirectTo: '/home',
    //     pathMatch: 'full'
    // },
]
