import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService, ICategory, IProduct, ProductResponse } from '../shared';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit, AfterViewInit {

  categories: ICategory[];
  isMobile: boolean;
  showBreadCrumb = false;
  showPreloader = true;

  products: IProduct[] = [];
  pagesArray: Array<number> = [];
  currentPage = 1;
  pageTitle = 'Explore Our Products';

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
    if (this.productService._category && this.productService._category.length) {
      this.categories = this.productService._category;
    } else {
      this.productService.getCategories().then(resp => {
        this.categories = resp as ICategory[];
        console.log('categ', this.categories);
      });
    }

    combineLatest(this.route.params, this.route.queryParams)
    .pipe(map(results => ({params: results[0].slug, query: results[1]})))
    .subscribe(results => {
      console.log('Lol snap', this.route.snapshot.queryParams.page);
      if (!this.route.snapshot.queryParams.page) {
        console.log('no product param');
        this.router.navigate([], {
          queryParams: {
            page: 1
          },
          queryParamsHandling: 'merge'
        });
      }

      let aProm: any;

      const pg = this.route.snapshot.queryParams.page || 1;
      this.currentPage = Number(pg);

      const searchhTerm = this.route.snapshot.queryParams.searchhTerm ? this.route.snapshot.queryParams.searchhTerm : '';

      const searchInput = document.getElementById('searchTextID') as HTMLInputElement;
      console.log('search input', searchInput);
      if (searchInput) {
        searchInput.value = searchhTerm;
        searchInput.setAttribute('value' , searchhTerm);
        this.pageTitle = 'Result for ' + searchhTerm;
      }

      if (this.route.snapshot.params.slug === 'search') {
        console.log('this.searching', searchhTerm);
        aProm = this.productService.getSearchedProducts(searchhTerm, pg);
      } else if (this.route.snapshot.params.slug) {
        const slug = this.route.snapshot.params.slug.replace(/_/g, ' ');
        aProm = this.productService.getProductsByCategory(slug, pg);
        this.pageTitle = (slug && slug === 'all') ? 'Explore Our Products' : 'Checkout our ' + slug + ' products';

        this.showBreadCrumb = false;
        if (slug !== 'all') {
          this.showBreadCrumb = true;
        }
      } else {
        console.log('here');
        aProm = this.productService.getProducts(pg);
      }

      this.showPreloader = true;
      aProm.then(res => {
        // console.log(pg, res)
        const resp = res as ProductResponse;
        this.pagesArray = resp.pg;
        this.products = resp.data;
        this.showPreloader = false;
      }).then(() => {
        const slug = this.route.snapshot.params.slug.replace(/_/g, ' ');

        const sel = document.getElementById('product-categories') as HTMLSelectElement;
        if (sel) {
          console.log('sel', slug);
          sel.value = (slug && slug !== 'search') ? slug : 'all';
        }
      });

      document.querySelector('.products-sect-header').scrollIntoView({behavior: 'smooth'});
      this.productService.makeSEO('Shop');
    });

  }

  ngAfterViewInit() {

  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 768;
    // console.log(w);
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  onChangeSelect(val) {
    this.router.navigate(['/shop', val], {
      queryParams: {
        page : 1
      },
      // queryParamsHandling: 'merge'
    });
  }

  setPage(val) {
    if (Number(val) === this.currentPage) {
    return;
    }

    this.currentPage = val;
    this.router.navigate([], { queryParams: { page: val } });
    this.setProducts(val);

    // console.log('scro', document.querySelector('.products-section-main'))
    document.querySelector('.products-sect-header').scrollIntoView({behavior: 'smooth'});
  }

  setProducts(pg) {
    this.productService.getProducts(pg).then(res => {
      // console.log(pg, res)
      const resp = res as ProductResponse;
      this.pagesArray = resp.pg;
      this.products = resp.data;
    });
  }

  getSlug(str: string) {
    return str.split(' ').join('_');
  }

  compareFn(c1: string, c2: string): boolean {
    return c1 && c2 ? c1 === c2 : c1 === c2;
  }
}
