import { Component, OnInit} from '@angular/core';
import { ProductService, ICart } from '../shared';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  cartItems: ICart[] = [];
  searchText = '';

  constructor(
    private productService: ProductService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.clickLink();
    if (this.auth.isAuthenticated()) {
      this.productService.populateLocalCartItems();
    }
    this.productService.getLocalCartItems().subscribe(cItems => {
      // console.log('cart items', cItems);
      this.cartItems = cItems;
    });
  }

  collapseIfMobile() {
    const toggleBtn = document.querySelector('button.navbar-toggler') as HTMLElement;
    const div = document.getElementById('navbarSupportedContent') as HTMLElement;
    const isToggleBtnVisible = (window.getComputedStyle(toggleBtn).display !== 'none') ? true : false;
    const divCollapse = (window.getComputedStyle(div).display !== 'none') ? true : false;

    if (isToggleBtnVisible && divCollapse) {
      toggleBtn.click();
    }
  }

  clickLink() {
    window.onload = e => {
      document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', this.collapseIfMobile);
      });
    };
  }

  logOut() {
    if (!!this.auth.currentUser) {
      this.auth.logOut();
      Swal.fire({
        icon: 'success',
        background: '#FFD9E8',
        title: 'Logged out successfully',
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  }

  searchFormSubmit() {
    // console.log();
    // console.log(this.searchText);
    if (this.searchText) {
      // console.log('yum yum');
      this.router.navigate(['/shop/search'], {
        queryParams: {
          searchhTerm: this.searchText,
          page: 1
        },
        queryParamsHandling: 'merge'
      });
      // window.location.href = '/shop/search?searchhTerm=' + this.searchText;
    }
  }
}
