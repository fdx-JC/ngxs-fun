export enum ConfirmationDialogType {
  INFO = 'Info',
  ERROR = 'Error',
  WARN = 'Warn',
  SUCCESS = 'Success'
}

interface IConfirmationDialogIcon {
  show: boolean;
  name: string;
}

interface IConfirmationDialogButton {
  label: string;
}

export interface IConfirmationConfig {
  type: ConfirmationDialogType;
  title?: string;
  message: string;
  icon?: IConfirmationDialogIcon;
  actions: {
    confirm: IConfirmationDialogButton;
    cancel?: IConfirmationDialogButton;
  };
}
