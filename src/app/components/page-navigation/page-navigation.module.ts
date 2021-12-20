import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNavigationComponent } from './page-navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PageNavigationComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [PageNavigationComponent],
})
export class PageNavigationModule {}
