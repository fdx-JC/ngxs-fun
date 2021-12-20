import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { AvatarModule } from 'ngx-avatar';

import { AuthMenuComponent } from './auth-menu.component';

@NgModule({
  declarations: [AuthMenuComponent],
  imports: [
    CommonModule,
    AvatarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [AuthMenuComponent],
})
export class AuthMenuModule {}
