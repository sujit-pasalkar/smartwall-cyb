import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-wall',
  templateUrl: './confirm-delete-wall.component.html',
  styleUrls: ['../../../home.component.css', './confirm-delete-wall.component.css']
})
export class ConfirmDeleteWallComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConfirmDeleteWallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('data,', data);

  }

  ngOnInit(): void {
  }

}
