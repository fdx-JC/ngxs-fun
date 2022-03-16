/* eslint-disable @typescript-eslint/no-namespace */
import { IAuthUser } from 'src/app/models/auth.model';

export namespace Auth {
  export class LoadCurrentUser {
    static readonly type = '[Auth API] Load Login User';
    constructor(public authUser: IAuthUser) {}
  }
}
