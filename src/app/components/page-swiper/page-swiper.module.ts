import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { PageSwiperComponent } from './page-swiper.component';

@NgModule({
  declarations: [PageSwiperComponent],
  imports: [CommonModule, SwiperModule],
  exports: [PageSwiperComponent],
})
export class PageSwiperModule {}
