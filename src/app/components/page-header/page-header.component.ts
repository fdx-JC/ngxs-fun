import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input() title = 'Who Is Supporting';

  showShadow = false;

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    const scrollHeight = document.documentElement.scrollTop;

    this.showShadow = scrollHeight > 96;
  }
}
