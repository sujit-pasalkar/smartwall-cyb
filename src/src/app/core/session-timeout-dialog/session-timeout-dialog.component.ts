import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonServiceService } from '../common-service.service';
@Component({
  selector: 'sa-session-timeout-dialog',
  templateUrl: './session-timeout-dialog.component.html',
  styleUrls: ['./session-timeout-dialog.component.css', '../../app.component.css']
})
export class SessionTimeoutDialogComponent implements OnInit {
  seconds = 30;
  constructor(public dialog: MatDialog,
    private commonService: CommonServiceService,
    public dialogRef: MatDialogRef<SessionTimeoutDialogComponent>) { }


  ngOnInit() {
    setInterval(() => {
      this.seconds -= 1;
    }, 1000);

    setTimeout(() => {

      this.dialogRef.close('auto');

    }, 30000);
  }

  logout() {

    this.dialogRef.close('manually');
  }


}
