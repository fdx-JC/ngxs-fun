import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @Input() loading: boolean;
  @Input() user: IUser;
  @Input() size = 32;
  photo: string | null;

  constructor() {}

  ngOnInit(): void {}
}
