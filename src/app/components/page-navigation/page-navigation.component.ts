import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-navigation',
  templateUrl: './page-navigation.component.html',
  styleUrls: ['./page-navigation.component.scss'],
})
export class PageNavigationComponent implements OnInit {
  @Input() title: string = '';
  @Output() prev = new EventEmitter();
  @Output() next = new EventEmitter();

  hover: boolean;

  constructor() {}

  ngOnInit(): void {}

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
