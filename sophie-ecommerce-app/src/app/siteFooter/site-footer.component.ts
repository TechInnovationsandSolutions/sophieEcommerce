import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared';

@Component({
    selector: 'site-footer',
    templateUrl: './site-footer.component.html',
    styleUrls: ['./site-footer.component.scss']
})

export class SiteFooterComponent implements OnInit {
    socialMedia: any[];
    contactDetails: any[];

    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.productService.getContactDetails().subscribe(resp => {
            this.contactDetails = resp;
        });

        this.productService.getSocialMedia().subscribe(resp => {
            this.socialMedia = resp;
        });
    }
}
