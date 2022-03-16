import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { ILoadable, LoadableStatus } from 'src/app/models/meta';
import {
  IProject,
  IRosterItem,
  RosterPosition,
} from 'src/app/models/project.model';
import { IUser } from 'src/app/models/user.model';
import { ConfirmationDialogType } from 'src/app/services/confirmation/confirmation.model';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';
import { Project } from '../store/projects/projects.actions';
import { ProjectState } from '../store/projects/projects.state';
import { UserState } from '../store/users/users.state';

interface IRosterPosition {
  [positionName: string]: string[]; // might need to extend to have roster start - end date
}

@Component({
  selector: 'app-sprint-project-rosters',
  templateUrl: './sprint-project-rosters.component.html',
  styleUrls: ['./sprint-project-rosters.component.scss'],
})
export class SprintProjectRostersComponent implements OnInit, OnDestroy {
  @Select(UserState.selectUsers) allUses$: Observable<ILoadable<IUser>[]>;
  @Select(ProjectState.selectCurrentSprintUnallocated)
  unallocatedEmails$: Observable<string[]>;

  @Input() project: IProject;

  rostersByPosition: IRosterPosition;
  subscription: Subscription;
  users: IUser[] = [];

  supportPosition = RosterPosition.SUPPORT;

  constructor(
    private confirmationService: ConfirmationService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.rostersByPosition = Object.values(RosterPosition).reduce(
      (acc, position) => {
        return {
          ...acc,
          [position]: this.project.roster
            .filter((roster) => roster.position === position)
            .map((user) => user.email),
        };
      },
      {}
    );

    this.subscription = combineLatest([
      this.unallocatedEmails$,
      this.allUses$,
    ]).subscribe(([availableUsers, users]) => {
      const userArray: IUser[] = [];
      availableUsers.map((email) => {
        const matched = users.find(
          (user) =>
            user.value?.mail === email && user.status === LoadableStatus.Loaded
        )?.value;

        const existed =
          userArray.findIndex((user) => user.mail === matched?.mail) > 1;
        if (matched && !existed) {
          userArray.push(matched);
        }
      });
      this.users = userArray;
    });
  }

  removeRosterFromSprintProject(email: string): void {
    const roster = this.project.roster.find((roster) => roster.email === email);
    if (!roster) return;
    const confirmation = this.confirmationService.open({
      type: ConfirmationDialogType?.WARN,
      title: `Deallocate from ${this.project.name} - ${this.project.sprint}`,
      message: `Are you sure you want to deallocate ${email}?`,
    });
    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this.store.dispatch(
          new Project.RemoveRosterFromProject(roster, this.project.tableId)
        );
      }
    });
  }

  addRosterToSprintProject(event: { email: string; position: string }): void {
    const userRoster: IRosterItem = {
      email: event.email,
      startDate: '',
      endDate: '',
      position: event.position,
      department: '',
      team: this.project.name,
      fte: 0,
    };
    this.store.dispatch(
      new Project.AddRosterToProject(userRoster, this.project.tableId)
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
