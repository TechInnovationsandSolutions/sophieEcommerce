import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
