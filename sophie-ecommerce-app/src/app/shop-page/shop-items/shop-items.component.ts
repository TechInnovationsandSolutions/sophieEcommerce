import { Component, OnInit, Input } from '@angular/core';
import { IProduct, ProductService } from 'src/app';

@Component({
  selector: 'shop-items',
  templateUrl: './shop-items.component.html',
  styleUrls: ['./shop-items.component.scss']
})
export class ShopItemsComponent implements OnInit {

  @Input() shopProducts:IProduct[];
  isPaginated:boolean = false;
  currentPageProducts:IProduct[] = []
  
  constructor(private productService:ProductService) { }

  ngOnInit() {
    setTimeout(() => {
      this.currentPageProducts = this.shopProducts;
    }, 500);
  }

  change(){
    this.currentPageProducts = [
      {
        "id": 1,
        "name": "Toning Oil 1",
        "category": {
            "id": 1,
            "name": "skin type"
        },
        "description": [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non in morbi luctus sed amet amet risus ligula. Neque diam tincidunt est praesent sed tortor. In facilisi urna amet nec habitant eget. Faucibus hendrerit quam viverra sit malesuada nulla in. Donec lacus molestie duis et habitant sed.",
            "Duis orci odio sagittis mauris dignissim. Enim, nisl velit feugiat malesuada velit facilisi. Nunc odio nisl, feugiat nec arcu adipiscing. Id vestibulum m",
            "Faucibus donec nibh non tempor erat mauris tempor. Justo, viverra consequat leo."
        ],
        "excerpts": "Toning Oil dolor does amet, consectetur adipiscing elit. Convallis at egestas magna purus sit urna, eu.Convallis  mi mattis mattis vel tellus ",
        'price':5000,
        'promoPrice':5000,
        "imageURL": "/assets/images/product-1.png",
        "createdOn":"1579737786364",
        "lastUpdate":"1579737786364",
        "availibility": "true",
        "review": [
            {
                "name":"Cross",
                "reviewSummary": "Mad Ohh!",
                "rating": 2.5,
                "reviewMessage": "This is just for testing purpose only. You dig?"
            }
        ],
        "tag": ["Lotion", "Oil", "toning", "Acne", "cream", "dark"],
        "isPopular": true,
        "ratingAverage": 1.24
    },
    {
        "id": 2,
        "name": "Toning Oil 2",
        "category": {
            "id": 2,
            "name": "skin concern"
        },
        "description": [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non in morbi luctus sed amet amet risus ligula. Neque diam tincidunt est praesent sed tortor. In facilisi urna amet nec habitant eget. Faucibus hendrerit quam viverra sit malesuada nulla in. Donec lacus molestie duis et habitant sed.",
            "Duis orci odio sagittis mauris dignissim. Enim, nisl velit feugiat malesuada velit facilisi. Nunc odio nisl, feugiat nec arcu adipiscing. Id vestibulum m",
            "Faucibus donec nibh non tempor erat mauris tempor. Justo, viverra consequat leo."
        ],
        "excerpts": "Toning Oil dolor does amet, consectetur adipiscing elit. Convallis at egestas magna purus sit urna, eu.Convallis  mi mattis mattis vel tellus ",
        'price':5000,
        "promoPrice":4500,
        "imageURL": "/assets/images/product-2.png",
        "createdOn":"1579737786364",
        "lastUpdate":"1579737786364",
        "availibility": "true",
        "review": [
            {
                "name":"Cross",
                "reviewSummary": "Mad Ohh!",
                "rating": 2.5,
                "reviewMessage": "This is just for testing purpose only. You dig?"
            },
            {
                "name":"Mako",
                "reviewSummary": "Mad Ohh!",
                "rating": 2.5,
                "reviewMessage": "This is just for testing purpose only. You dig?"
            },
            {
                "name":"Sydney",
                "reviewSummary": "Mad Ohh!",
                "rating": 2.5,
                "reviewMessage": "This is just for testing purpose only. You dig?"
            }
        ],
        "tag": ["Lotion", "cream", "dark"],
        "isPopular": true,
        "ratingAverage": 3.24
      }
    ]
  }

}
