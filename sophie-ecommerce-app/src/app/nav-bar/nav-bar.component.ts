import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{

  ngOnInit(){
    this.clickLink();
  }

  constructor() { }

  collapseIfMobile(){
    var toggleBtn = <HTMLElement>document.querySelector('button.navbar-toggler');
    var isToggleBtnVisible = (window.getComputedStyle(toggleBtn)['display'] != 'none') ? true : false;

    if (isToggleBtnVisible) {
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
}
