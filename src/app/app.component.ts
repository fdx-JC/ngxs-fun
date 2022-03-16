import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Store } from '@ngxs/store';
import { filter, Subscription } from 'rxjs';
import { IAuthUser } from './models/auth.model';
import { AuthenticationService } from './services/authentication.service';
import { Auth } from './store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ngxs-fun';
  appSubscription: Subscription = new Subscription();

  loginDisplay = false;
  authUser: IAuthUser | null = null;

  constructor(
    private msalBroadcastService: MsalBroadcastService,
    private authenticationService: AuthenticationService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.appSubscription = this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        const user = this.authenticationService.getAuthUser();
        if (user) {
          const currentUser = {
            username: user.username,
            name: user.name,
          };
          this.store.dispatch(new Auth.LoadCurrentUser(currentUser));
        }
      });
  }

  ngOnDestroy(): void {
    this.appSubscription?.unsubscribe();
  }
}
