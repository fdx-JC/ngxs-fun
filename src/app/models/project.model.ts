export interface IProject {
  id: string; // projectId
  name: string; // projectName
  tableId: string; // sprintId
  sprint: string; // sprintDate
  roster: IRosterItem[];
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

export enum RosterPosition {
  SUPPORT = 'Support',

  DEVELOPER = 'Developer',
  SENIOR_DEVELOPER = 'Senior Developer',
  LEAD_DEVELOPER = 'Lead Developer',

  DIGITAL_ANALYST = 'Digital Analyst',
  SENIOR_DIGITAL_DEVELOPER = 'Senior Digital Analyst',

  FRONT_END_DEVELOPER = 'Front-End Developer',
  LEAD_FRONT_END_DEVELOPER = 'Lead front-end developer',

  PRODUCT_MANAGER = 'Product Manager',
  SENIOR_PRODUCT_MANAGER = 'Senior Product Manager',
}
