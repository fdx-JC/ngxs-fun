import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IAuthUser } from 'src/app/models/auth.model';
import { Auth } from './auth.actions';

export class AuthStateModel {
  user: IAuthUser | null = null;
}

@State<AuthStateModel>({
  name: 'authState',
  defaults: {
    user: null,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static selectCurrentUser(state: AuthStateModel) {
    return state.user;
  }

  @Action(Auth.LoadCurrentUser)
  addDataToState(
    ctx: StateContext<AuthStateModel>,
    { authUser }: Auth.LoadCurrentUser
  ) {
    const state = ctx.getState();
    ctx.setState({ ...state, user: authUser });
  }
}
