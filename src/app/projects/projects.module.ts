import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { projectsRoutes } from './projects.routes';
import { ProjectsComponent } from './projects.component';
import { ProjectState } from './store/projects/projects.state';
import { PageLoaderModule } from '../components/page-loader/page-loader.module';
import { PageNavigationModule } from '../components/page-navigation/page-navigation.module';
import { DisplayDateRange } from '../pipes/display-date-range.pipe';
import { SprintProjectsComponent } from './sprint-projects/sprint-projects.component';
import { SprintProjectRostersComponent } from './sprint-project-rosters/sprint-project-rosters.component';
import { RostersComponent } from './rosters/rosters.component';
import { UserState } from './store/users/users.state';
import { UserItemModule } from '../components/user-item/user-item.module';
import { ConfirmationModule } from '../services/confirmation/confirmation.module';
import { AddUserModule } from '../components/add-user/add-user.module';

@NgModule({
  declarations: [
    ProjectsComponent,
    DisplayDateRange,
    SprintProjectsComponent,
    SprintProjectRostersComponent,
    RostersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(projectsRoutes),
    NgxsModule.forFeature([ProjectState, UserState]),
    PageLoaderModule,
    PageNavigationModule,
    UserItemModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    ConfirmationModule,
    AddUserModule,
  ],
})
export class ProjectsModule {}
