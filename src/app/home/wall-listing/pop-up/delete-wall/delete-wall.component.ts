import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-wall',
  templateUrl: './delete-wall.component.html',
  styleUrls: ['../../../home.component.css', './delete-wall.component.css']
})
export class DeleteWallComponent implements OnInit {

  // wallName: string;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteWallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
}
