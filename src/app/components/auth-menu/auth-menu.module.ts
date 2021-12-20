import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { AuthMenuComponent } from './auth-menu.component';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';

@NgModule({
  declarations: [AuthMenuComponent],
  imports: [
    CommonModule,
    UserAvatarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  exports: [AuthMenuComponent],
})
export class AuthMenuModule {}
