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
    this.productService.getCategories().subscribe(resp=>{
      this.categories = resp;
      console.log('categ', this.categories);
    })
  }

}
