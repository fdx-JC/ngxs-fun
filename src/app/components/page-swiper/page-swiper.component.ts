import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-page-swiper',
  templateUrl: './page-swiper.component.html',
  styleUrls: ['./page-swiper.component.scss'],
})
export class PageSwiperComponent implements OnInit {
  @Output() swipe = new EventEmitter();
  @Output() slideChange = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  config: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
