import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {
  constructor(private productService: ProductService, private fb: FormBuilder) { }

  contactDetails: any[];
  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    message: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    this.productService.getContactDetails().subscribe(resp => {
        this.contactDetails = resp;
    });
  }

  canDeactivate() {
    // if the form is dirty
    if (this.contactForm.dirty) {
      return window.confirm('Do you want to discard message?');
    }

    return true;
  }
}
