import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './dialog/dialog.component';
import {
  ConfirmationDialogType,
  IConfirmationConfig,
} from './confirmation.model';

@Injectable()
export class ConfirmationService {
  private defaultConfig: IConfirmationConfig = {
    type: ConfirmationDialogType.WARN,
    title: 'Confirm action',
    message: 'Are you sure you want to confirm this action?',
    icon: 'feather:alert-triangle',
    actions: {
      confirm: {
        label: 'Confirm',
      },
      cancel: {
        label: 'Cancel',
      },
    },
  };

  /**
   * Constructor
   */
  constructor(private matDialog: MatDialog) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  open(
    config: IConfirmationConfig = this.defaultConfig
  ): MatDialogRef<ConfirmationDialogComponent> {
    // Merge the user config with the default config
    const userConfig = Object.assign(this.defaultConfig, config);

    // Open the dialog
    return this.matDialog.open(ConfirmationDialogComponent, {
      autoFocus: false,
      data: userConfig,
    });
  }
}
