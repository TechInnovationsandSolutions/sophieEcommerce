import { Component, OnInit } from '@angular/core';
import { ICategory, ProductService } from '../../shared';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'category-thumbnail',
  templateUrl: './category-thumbnail.component.html',
  styleUrls: ['./category-thumbnail.component.scss']
})
export class CategoryThumbnailComponent implements OnInit {
  categories: ICategory[];
  showPreloader = true;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getCategories().then(resp => {
      this.categories = resp as ICategory[];
      this.categories.reverse();
      this.categories = this.categories.slice(0, 2);
      // console.log('categ', this.categories);
      this.showPreloader = false;
    });
  }

}
