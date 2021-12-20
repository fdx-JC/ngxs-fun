import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() title = 'Who Is Supporting';

  showShadow = false;

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    const scrollHeight = document.documentElement.scrollTop;

    this.showShadow = scrollHeight > 96;
  }

  constructor() {}

  ngOnInit() {}
}
