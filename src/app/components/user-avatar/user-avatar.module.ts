import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from './user-avatar.component';
import { DisplayNameInitials } from 'src/app/pipes/display-name-initials.pipe';

@NgModule({
  declarations: [DisplayNameInitials, UserAvatarComponent],
  imports: [CommonModule],
  exports: [UserAvatarComponent],
})
export class UserAvatarModule {}
