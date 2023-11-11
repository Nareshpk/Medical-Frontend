import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable()
export class ToastService {
  snackBarConfig: MatSnackBarConfig;
  snackBarRef: MatSnackBarRef<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  snackBarAutoHide = '2000';

  constructor(private readonly snackBar: MatSnackBar) {}

  saveSnackBar(message: string, autoHideTimeInMs: string = this.snackBarAutoHide): void {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = parseInt(autoHideTimeInMs, 0);
    this.snackBarConfig.panelClass = ['glam-snackbar', 'custom-snackbar'];
    this.snackBarRef = this.snackBar.open(message, '', this.snackBarConfig);
  }

  updateSnackBar(message: string, autoHideTimeInMs: string = this.snackBarAutoHide): void {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = parseInt(autoHideTimeInMs, 0);
    this.snackBarConfig.panelClass = ['glam-snackbar', 'custom-snackbar-update'];
    this.snackBarRef = this.snackBar.open(message, '', this.snackBarConfig);
  }
}
