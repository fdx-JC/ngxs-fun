export namespace User {
  export class GetUsers {
    static readonly type = '[User API] Fetch Users';
    constructor(public emails: string[]) {}
  }
}
