import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { SiteFooterComponent } from './siteFooter/site-footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeProductsComponent } from './products/home-products.component';
import { CategoryThumbnailComponent } from './products/category-thumbnail/category-thumbnail.component';
import { PopularProductsComponent } from './products/popular-products/popular-products.component';
import { TestimonialComponent } from './products/testimonial/testimonial.component';
import { NewsletterSubscriptionComponent } from './products/newsletter-subscription/newsletter-subscription.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SiteFooterComponent,
    NavBarComponent,
    HomeProductsComponent,
    CategoryThumbnailComponent,
    PopularProductsComponent,
    TestimonialComponent,
    NewsletterSubscriptionComponent,
    PrivacyPageComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
