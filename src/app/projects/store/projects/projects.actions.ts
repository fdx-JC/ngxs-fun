import { IRosterItem } from 'src/app/models/project.model';

export namespace Project {
  export class GetProjects {
    static readonly type = '[Project API] Fetch Projects';
  }

  export class SetCurrentSprint {
    static readonly type = '[Project Page] Set Current Sprint';
    constructor(public sprintKey: number) {}
  }

  export class AddRosterToProject {
    static readonly type = '[Project Page] Add Roster to Project';
    constructor(public roster: IRosterItem, public projectSprintId: string) {}
  }

  export class RemoveRosterFromProject {
    static readonly type = '[Project Page] Remove Roster to Project';
    constructor(public roster: IRosterItem, public projectSprintId: string) {}
  }
}
