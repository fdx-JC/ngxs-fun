import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  IProject,
  IRosterItem,
  RosterPosition,
} from 'src/app/models/project.model';
import { ConfirmationDialogType } from 'src/app/services/confirmation/confirmation.model';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';
import { Project } from '../store/projects/projects.actions';

interface IRosterPosition {
  [positionName: string]: string[]; // might need to extend to have roster start - end date
}

@Component({
  selector: 'app-sprint-project-rosters',
  templateUrl: './sprint-project-rosters.component.html',
  styleUrls: ['./sprint-project-rosters.component.scss'],
})
export class SprintProjectRostersComponent implements OnInit {
  @Input() project: IProject;

  rostersByPosition: IRosterPosition;

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
  }

  removeRosterFromSprint(email: string): void {
    const confirmation = this.confirmationService.open({
      type: ConfirmationDialogType?.WARN,
      title: `Remove from ${this.project.name} - ${this.project.sprint}`,
      message: `Are you sure you want to remove ${email}?`,
    });
    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this.store.dispatch(
          new Project.RemoveRosterFromProject(email, this.project.tableId)
        );
      }
    });
  }
}
