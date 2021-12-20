import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subscription, take, tap } from 'rxjs';
import { ILoadable, LoadableStatus } from 'src/app/models/meta';
import { IUser } from 'src/app/models/user.model';
import { User } from '../store/users/users.action';
import { ILoadableUser, UserState } from '../store/users/users.state';

@Component({
  selector: 'app-rosters',
  templateUrl: './rosters.component.html',
  styleUrls: ['./rosters.component.scss'],
})
export class RostersComponent implements OnInit, OnChanges {
  @Input() rosterEmails: string[];
  // @Select(UserState.selectUsers)
  users$: Observable<ILoadable<IUser>[]>;

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
    // this.users$ = this.store.select(UserState.selectUsersByEmails).pipe(take(1));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['rosterEmails'] &&
      changes['rosterEmails'].currentValue &&
      this.rosterEmails.length
    ) {
      this.store.dispatch(new User.GetUsers(this.rosterEmails));

      this.users$ = this.store
        .select(UserState.selectUsersByEmails)
        .pipe(
          map((fn) => fn(changes['rosterEmails'].currentValue)),
          filter((users) => !!users)
        )
        .pipe(
          tap((data) => {
            console.log('data', data);
          })
        );
    }
  }
}
