import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-wall',
  templateUrl: './create-wall.component.html',
  styleUrls: ['../../../home.component.css', './create-wall.component.css']
})
export class CreateWallComponent implements OnInit {

  name: string;
  label: string ='';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateWallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  continue() {
    if ((this.name != null && this.name.trim() !== '')) {
      let sendObject = {
        name: this.name,
        label: (this.label != null && this.label.trim() !== '') ? this.label : '-'
      };
      this.dialogRef.close(sendObject);

    } else {
      this.dialogRef.close();
    }
  }

  cancel() {
  }

}
