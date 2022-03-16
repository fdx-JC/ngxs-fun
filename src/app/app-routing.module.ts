import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';
import { AuthFailComponent } from './components/auth-fail/auth-fail.component';

const routes: Routes = [
  {
    path: 'projects',
    canActivate: [MsalGuard],
    loadChildren: () =>
      import('./projects/projects.module').then(
        (module) => module.ProjectsModule
      ),
  },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'auth-fail', component: AuthFailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabled'
          : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
