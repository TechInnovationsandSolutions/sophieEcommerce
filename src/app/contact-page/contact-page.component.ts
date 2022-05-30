import { Component, OnInit } from '@angular/core';
import { ProductService, IContact } from '../shared';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FirstCharCapitalizePipe } from '../common/first-char-capitalize.pipe';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  providers: [FirstCharCapitalizePipe]
})
export class ContactPageComponent implements OnInit {
  contactDetails: any[];
  loading = false;

  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    subject: [''],
    body: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private firstChar: FirstCharCapitalizePipe
  ) { }

  ngOnInit() {
    this.productService.makeSEO('Contacts');
    this.productService.getContactDetails().subscribe(resp => {
        this.contactDetails = resp;
    });
  }

  clearForm() {
    this.contactForm.reset({});
  }

  canDeactivate() {
    // if the form is dirty
    if (this.contactForm.dirty) {
      return window.confirm('Do you want to discard message?');
    }

    return true;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const msg: IContact = this.contactForm.value;
      const defaultSubject = 'Contact message from Sophie Bath and Body';
      msg.subject = msg.subject ? (this.firstChar.transform(msg.subject) + ' - ' + defaultSubject) : defaultSubject;
      this.loading = true;
      this.productService.contactUs(msg).then(r => {
        this.loading = false;
        if (r.status === 'success') {
          Swal.fire('Message Sent', 'Hi ' + msg.name + '. Your message has been received. Thank you.', 'success');
          this.clearForm();
        }
      }).catch(e => {
        this.loading = false;
      });
    }
  }
}
