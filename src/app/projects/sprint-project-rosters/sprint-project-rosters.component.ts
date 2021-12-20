import { Component, Input, OnInit } from '@angular/core';
import { IRosterItem, RosterPosition } from 'src/app/models/project.model';
import { ConfirmationDialogType } from 'src/app/services/confirmation/confirmation.model';
import { ConfirmationService } from 'src/app/services/confirmation/confirmation.service';

interface IRosterPosition {
  [positionName: string]: string[]; // might need to extend to have roster start - end date
}

@Component({
  selector: 'app-sprint-project-rosters',
  templateUrl: './sprint-project-rosters.component.html',
  styleUrls: ['./sprint-project-rosters.component.scss'],
})
export class SprintProjectRostersComponent implements OnInit {
  @Input() sprintId: string;
  @Input() rosters: IRosterItem[];

  rostersByPosition: IRosterPosition;

  constructor(private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.rostersByPosition = Object.values(RosterPosition).reduce(
      (acc, position) => {
        return {
          ...acc,
          [position]: this.rosters
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
      title: 'Remove roster from sprint',
      message: `Are you sure you want to remove ${email}?`,
    });
    confirmation.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        console.log(
          'TODO, dispatch action to remove the roster with email',
          email
        );
      }
    });
  }
}
