import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthFailComponent } from './auth-fail.component';

@NgModule({
  declarations: [AuthFailComponent],
  imports: [CommonModule],
  exports: [AuthFailComponent],
})
export class AuthFailModule {}
