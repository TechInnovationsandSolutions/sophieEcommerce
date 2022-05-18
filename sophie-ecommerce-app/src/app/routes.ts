import { Routes } from "@angular/router";
import { HomeProductsComponent, ProductDetailsComponent } from "./products";
import { ShopPageComponent } from "./shop-page/shop-page.component";
import { CategoryPageComponent } from "./products/category-page/category-page.component";
import { CheckoutPageComponent } from "./checkout-page/checkout-page.component";
import { AuthRouteGuardGuard } from "./shared/auth-route-guard.guard";
import { NotFoundComponent } from "./not-found/not-found.component";
import { WishListComponent } from "./wish-list/wish-list.component";
import { ComponentDeactivateGuard } from "./shared/component-deactivate.guard";
import { PaymentComponent } from "./payment/payment.component";
import { TermAndConditionsPageComponent } from "./term-and-conditions-page/term-and-conditions-page.component";
import { AboutPageComponent } from "./about-page/about-page.component";
import { CartComponent } from "./cart/cart.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";
import { PrivacyPageComponent } from "./privacy-page/privacy-page.component";
import { ReturnPolicyPageComponent } from "./return-policy-page/return-policy-page.component";

export const appRoutes: Routes = [
  {
    path: "",
    component: HomeProductsComponent,
  },
  {
    path: "product/:id",
    component: ProductDetailsComponent,
  },
  {
    path: "about",
    component: AboutPageComponent,
  },
  {
    path: "contact",
    component: ContactPageComponent,
    canDeactivate: [ComponentDeactivateGuard],
  },
  {
    path: "shop/:slug",
    component: ShopPageComponent,
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "shop",
    redirectTo: "shop/all",
    pathMatch: "full",
  },
  {
    path: "privacy-policy",
    component: PrivacyPageComponent,
  },
  {
    path: "return-policy",
    component: ReturnPolicyPageComponent,
  },
  {
    path: "term-and-conditions",
    component: TermAndConditionsPageComponent,
  },
  {
    path: "product",
    redirectTo: "shop",
    pathMatch: "full",
  },
  {
    path: "products",
    redirectTo: "shop",
    pathMatch: "full",
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "wishlist",
    component: WishListComponent,
  },
  {
    path: "checkout",
    component: CheckoutPageComponent,
    canActivate: [AuthRouteGuardGuard],
  },
  {
    path: "payment",
    component: PaymentComponent,
  },
  {
    path: "myaccount",
    component: CheckoutPageComponent,
    canActivate: [AuthRouteGuardGuard],
  },
  {
    path: "search",
    component: CategoryPageComponent,
  },
  {
    path: "category/:slug",
    redirectTo: "shop/:slug",
    pathMatch: "full",
  },
  {
    path: "category",
    redirectTo: "shop/all",
    pathMatch: "full",
  },
  {
    path: "user",
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
  // {
  //     path:'',
  //     redirectTo: '/home',
  //     pathMatch: 'full'
  // },
];
