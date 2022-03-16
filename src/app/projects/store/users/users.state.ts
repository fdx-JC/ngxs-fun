/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  StateOperator,
} from '@ngxs/store';
import { catchError, mergeMap, of } from 'rxjs';
import { patch } from '@ngxs/store/operators';

import { ILoadable, LoadableStatus } from 'src/app/models/meta';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.services';
import { User } from './users.action';

export interface ILoadableUser {
  [email: string]: ILoadable<IUser>;
}

export interface UserStateModel {
  entities: ILoadableUser;
}

@State<UserStateModel>({
  name: 'userState',
  defaults: {
    entities: {},
  },
})
@Injectable()
export class UserState {
  constructor(private userService: UserService) {}

  @Selector()
  static selectUsers(state: UserStateModel): ILoadable<IUser>[] {
    return Object.values(state.entities);
  }

  @Action(User.GetUsers)
  getDataFromState(
    ctx: StateContext<UserStateModel>,
    action: { emails: string[] }
  ) {
    const state = ctx.getState();

    // filter out emails has been loaded
    const userEmailsToLoad = action.emails.filter((email) => {
      const userStatus = state.entities[email]?.status;
      return !(
        userStatus === LoadableStatus.Loaded ||
        userStatus === LoadableStatus.Loading
      );
    });

    if (!userEmailsToLoad.length) {
      return state;
    }

    userEmailsToLoad.map((email) =>
      ctx.setState(
        updateEntity({
          status: LoadableStatus.Loading,
          message: '',
          value: { mail: email, photo: null, displayName: '' },
        })
      )
    );

    return this.userService.getUsers(userEmailsToLoad).pipe(
      mergeMap((users) => {
        return users.map((user) =>
          ctx.setState(
            updateEntity({
              status: LoadableStatus.Loaded,
              message: '',
              value: user,
            })
          )
        );
      }),
      catchError(() => {
        return of(
          action.emails.map((email) =>
            ctx.setState(
              updateEntity({
                status: LoadableStatus.Error,
                message: `Error occurred while loading ${email}`,
                value: { mail: email, photo: null, displayName: '' },
              })
            )
          )
        );
      })
    );
  }
}

function updateEntity(entity: ILoadable<IUser>): StateOperator<UserStateModel> {
  return patch<UserStateModel>({
    entities: patch({ [entity.value?.mail!]: entity }),
  });
}
