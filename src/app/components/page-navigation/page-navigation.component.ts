import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.scss'],
})
export class PageNavigationComponent {
  @Input() title = '';
  @Input() disablePrev: boolean;
  @Input() disableNext: boolean;

  @Output() prev = new EventEmitter();
  @Output() next = new EventEmitter();

  hover: boolean;

  goToPreviousStep() {
    this.prev.emit();
  }

  goToNextStep() {
    this.next.emit();
  }

  mouseEnter(): void {
    this.hover = true;
  }

  mouseLeave(): void {
    this.hover = false;
  }
}
