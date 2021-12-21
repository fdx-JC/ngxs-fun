import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { ILoadable, LoadableStatus } from 'src/app/models/meta';
import { IUser } from 'src/app/models/user.model';
import { User } from '../store/users/users.action';
import { UserState } from '../store/users/users.state';

@Component({
  selector: 'app-rosters',
  templateUrl: './rosters.component.html',
  styleUrls: ['./rosters.component.scss'],
})
export class RostersComponent implements OnInit, OnChanges {
  @Input() rosterEmails: string[];
  @Output() removeUser = new EventEmitter<string>();

  // TODO update to user slice select???
  @Select(UserState.selectUsers) allUses$: Observable<ILoadable<IUser>[]>;

  users: IUser[];
  loading: boolean;
  rosterSubscription: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.rosterSubscription = this.allUses$.subscribe((users) => {
      const selectedUsers = users.filter((user) =>
        this.rosterEmails.includes(user.value?.mail!)
      );
      this.loading = selectedUsers.some(
        (user) => user.status === LoadableStatus.Loading
      );

      this.users = selectedUsers
        .map((user) => user.value!)
        .filter((user) => user);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['rosterEmails'] &&
      changes['rosterEmails'].currentValue &&
      this.rosterEmails.length
    ) {
      this.store.dispatch(new User.GetUsers(this.rosterEmails));
    }
  }

  onRemoveUser(email: string): void {
    this.removeUser.emit(email);
  }
}
