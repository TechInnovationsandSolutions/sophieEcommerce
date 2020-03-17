import { Component, OnInit } from '@angular/core';
// import Parallax from 'parallax-js';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // document.querySelector('.pg404-sect').addEventListener('mouseover',function name(e) {
    //   var movement = -30;
    //   var target ='content404';
    //   var $this = document.querySelector('.content404');
    //   var relX = e.o - $this.offset().left;
    //   var relY = e.pageY - $this.offset().top;

    //   Parallax.to(target, 1, {
    //     x: (relX - $this.width() / 2) / $this.width() * movement,
    //     y: (relY - $this.height() / 2) / $this.height() * movement
    //   });
    // })
  }

}
