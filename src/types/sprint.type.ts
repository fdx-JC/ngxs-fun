export interface ISprint {
  projectId: string;
  sprintId: string;
  sprintDate: string;
  rosters: IRosterItem[];
}

export interface IRosterItem {
  email: string;
  startDate: string;
  endDate: string;
  position: string;
  department: string;
  team: string;
  fte: number;
}
