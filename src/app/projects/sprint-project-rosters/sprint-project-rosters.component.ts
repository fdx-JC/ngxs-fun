import { Component, Input, OnInit } from '@angular/core';
import { IRosterItem, RosterPosition } from 'src/app/models/project.model';

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

  constructor() {}

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
}
