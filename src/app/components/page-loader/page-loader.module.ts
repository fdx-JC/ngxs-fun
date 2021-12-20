import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PageLoaderComponent } from './page-loader.component';

@NgModule({
  declarations: [PageLoaderComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [PageLoaderComponent],
})
export class PageLoaderModule {}
