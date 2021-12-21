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
  @Input() disabled: boolean;
  @Output() removeUser = new EventEmitter<string>();

  @Select(UserState.selectUsers) allUses$: Observable<ILoadable<IUser>[]>;

  users: IUser[];
  loading: boolean;
  rosterSubscription: Subscription;

  userSnapshot: ILoadable<IUser>[];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.userSnapshot = this.store.selectSnapshot(UserState.selectUsers);

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
      // HACK??? prevent dispatch api call ??
      this.userSnapshot = this.store.selectSnapshot(UserState.selectUsers);
      // all user loaded
      const loaded = this.userSnapshot?.every(
        (user) => user.status === LoadableStatus.Loaded
      );
      if (this.userSnapshot?.length && loaded) {
        return;
      }

      this.store.dispatch(new User.GetUsers(this.rosterEmails));
    }
  }

  onRemoveUser(email: string): void {
    this.removeUser.emit(email);
  }
}
