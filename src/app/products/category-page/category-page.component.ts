import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Options } from 'ng5-slider';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService, IProduct, ICategory, ProductResponse } from 'src/app/shared';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryPageComponent implements OnInit {
  products: IProduct[] = [];
  value = 1540;
  highValue = 4960;
  options: Options = {
    floor: 1000,
    ceil: 5000
  };

  searchText = '';
  pagesArray: Array<number> = [];
  currentPage = 1;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    // console.log('this.route.snapshot.params.slug0', this.route.snapshot.params.slug);
    if (this.route.snapshot.params.slug) {
      const pg = this.route.snapshot.queryParams.page || 1;
      this.currentPage = Number(pg);
      this.router.navigate([], {
        queryParams: {
          page: 1
        },
        queryParamsHandling: 'merge'
      });

      const slug = this.route.snapshot.params.slug.replace(/_/g, ' ');
      // console.log('slug', slug);
      this.productService.getProductsByCategory(slug, pg).then(res => {
        // console.log(pg, res);
        const resp = res as ProductResponse;
        this.pagesArray = resp.pg;
        this.products = resp.data;
      });
    }
  }

}
