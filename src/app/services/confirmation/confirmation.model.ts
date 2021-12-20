export enum ConfirmationDialogType {
  INFO = 'Info',
  ERROR = 'Error',
  WARN = 'Warn',
  SUCCESS = 'Success',
}

interface IConfirmationDialogButton {
  label: string;
}

export interface IConfirmationConfig {
  type: ConfirmationDialogType;
  title?: string;
  message: string;
  icon?: string;
  actions?: {
    confirm: IConfirmationDialogButton;
    cancel?: IConfirmationDialogButton;
  };
}
