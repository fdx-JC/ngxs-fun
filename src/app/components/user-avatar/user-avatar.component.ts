import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() photo: string | null;
  @Input() name: string | null | undefined;
  @Input() size: number;
  @Input() loading: boolean;
}
