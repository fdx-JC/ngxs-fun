import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserItemComponent } from './user-item.component';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';

@NgModule({
  declarations: [UserItemComponent],
  imports: [CommonModule, UserAvatarModule],
  exports: [UserItemComponent],
})
export class UserItemModule {}
