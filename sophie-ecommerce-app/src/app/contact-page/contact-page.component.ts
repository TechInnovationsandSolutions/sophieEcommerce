import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared';

@Component({
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  contactDetails: any[];


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getContactDetails().subscribe(resp=>{
        this.contactDetails = resp;
    });
  }

}
