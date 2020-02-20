import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { SiteFooterComponent } from './siteFooter/site-footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeProductsComponent } from './products/home-products.component';
import { CategoryThumbnailComponent } from './products/category-thumbnail/category-thumbnail.component';
import { TestimonialComponent } from './products/testimonial/testimonial.component';
import { NewsletterSubscriptionComponent } from './products/newsletter-subscription/newsletter-subscription.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ReturnPolicyPageComponent } from './return-policy-page/return-policy-page.component';
import { TermAndConditionsPageComponent } from './term-and-conditions-page/term-and-conditions-page.component';
import { SharedProductListsWidgetComponent } from './common/shared-product-lists-widget/shared-product-lists-widget.component';
import { ProductItemComponent } from './products/product-list/product-item/product-item.component';
import { ProductDescriptionComponent } from './products/product-details/product-description/product-description.component';
import { ProductReviewComponent } from './products/product-details/product-review/product-review.component';
import { ProductService } from './shared';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from './user/auth.service';
import { ShopItemsComponent } from './shop-page/shop-items/shop-items.component';
import { CategoryPageComponent } from './products/category-page/category-page.component';
import { Ng5SliderModule } from "ng5-slider";

@NgModule({
  declarations: [
    AppComponent,
    SiteFooterComponent,
    NavBarComponent,
    HomeProductsComponent,
    CategoryThumbnailComponent,
    SharedProductListsWidgetComponent,
    TestimonialComponent,
    NewsletterSubscriptionComponent,
    PrivacyPageComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ContactPageComponent,
    ShopPageComponent,
    AboutPageComponent,
    ReturnPolicyPageComponent,
    TermAndConditionsPageComponent,
    ProductItemComponent,
    ProductDescriptionComponent,
    ProductReviewComponent,
    CartComponent,
    ShopItemsComponent,
    CategoryPageComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    Ng5SliderModule
  ],
  providers: [
    ProductService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
