import { Component, OnInit} from '@angular/core';
import { ProductService, ICart } from '../shared';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  
  cartItems : ICart[] = [];

  constructor(private productService:ProductService, public auth:AuthService) { }

  ngOnInit(){
    this.clickLink();
    this.productService.getCartItems().subscribe(cItems=>{
      this.cartItems = cItems;
    })
  }

  collapseIfMobile(){
    var toggleBtn = <HTMLElement>document.querySelector('button.navbar-toggler');
    var div = <HTMLElement>document.getElementById('navbarSupportedContent');
    var isToggleBtnVisible = (window.getComputedStyle(toggleBtn)['display'] != 'none') ? true : false;
    var divCollapse = (window.getComputedStyle(div)['display'] != 'none') ? true : false;

    if (isToggleBtnVisible && divCollapse) {
      toggleBtn.click();
    }
  }

  clickLink(){
    window.onload = e=>{
      document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', this.collapseIfMobile);
      });
    }
  }

  logOut(){
    this.auth.logOut();
  }
}
