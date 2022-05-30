import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapsible-component',
  templateUrl: './collapsible-component.component.html',
  styleUrls: ['./collapsible-component.component.scss']
})
export class CollapsibleComponentComponent implements OnInit {
  visibleSection = true;

  constructor() { }

  ngOnInit() {
  }

  toggleContent() {
    this.visibleSection = !this.visibleSection;
  }
}
