import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IAuthUser } from 'src/app/models/auth.model';
import { Select } from '@ngxs/store';
import { AuthState } from 'src/app/store/auth.state';
import { EMPTY, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-menu',
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss'],
})
export class AuthMenuComponent implements OnInit, OnDestroy {
  @Select(AuthState.selectCurrentUser)
  currentUser$: Observable<IAuthUser | null>;

  currentUser: IAuthUser | null = null;

  authSub: Subscription = new Subscription();

  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.authSub = this.currentUser$.subscribe((data) => {
      this.currentUser = data;
    });
  }

  login(): void {
    this.auth.login();
  }

  logout(): void {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
