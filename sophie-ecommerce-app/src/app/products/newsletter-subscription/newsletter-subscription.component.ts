import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app';
import { Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  styleUrls: ['./newsletter-subscription.component.scss']
})
export class NewsletterSubscriptionComponent implements OnInit {
  loading = false;
  newsLetterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  subNewsLetter() {
    if (this.newsLetterForm.valid) {
      const useremail = this.newsLetterForm.value.email;
      this.loading = true;
      this.productService.newsletterSub(useremail).then(r => {
        this.loading = false;
        if (r.status === 'success') {
          Swal.fire('Thank you for Subscribing', '', 'success');
          this.newsLetterForm.reset({});
        }
      });
    }
  }
}
