import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ConfirmationDialogType,
  IConfirmationConfig,
} from '../confirmation.model';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  info = ConfirmationDialogType.INFO;
  warn = ConfirmationDialogType.WARN;
  error = ConfirmationDialogType.ERROR;
  success = ConfirmationDialogType.SUCCESS;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IConfirmationConfig,
    public matDialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}
}
