import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent {
  @Input() loading: boolean;
  @Input() user: IUser;
  @Input() size = 32;
  photo: string | null;
}
