import { Component, OnInit } from '@angular/core';
import { ICategory, ProductService } from '../../shared';

@Component({
  selector: 'category-thumbnail',
  templateUrl: './category-thumbnail.component.html',
  styleUrls: ['./category-thumbnail.component.scss']
})
export class CategoryThumbnailComponent implements OnInit {
  categories:ICategory[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getCategories().then(resp=>{
      this.categories = <ICategory[]>resp;
      this.categories = this.categories.slice(0, 2);
      console.log('categ', this.categories);
    })
  }

}
