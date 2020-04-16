import { Component, OnInit } from '@angular/core';
import { ProductService, ITestimonial } from '../../shared';

@Component({
  selector: 'testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {

  testimonials: ITestimonial[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getTestimonials().subscribe(resp => {
      this.testimonials = resp;
    });

  }

}
