import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @Input() placeholder: string;
  @Input() options: IUser[];

  constructor() {}

  ngOnInit(): void {}

  onAddUser(): void {
    //TODO finder out whats in the input
  }
}
