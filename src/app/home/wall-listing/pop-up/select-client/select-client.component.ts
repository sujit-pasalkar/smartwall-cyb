import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-client',
  templateUrl: './select-client.component.html',
  styleUrls: ['../../../home.component.css', './select-client.component.css']
})
export class SelectClientComponent implements OnInit {

  selectedClient;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SelectClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
  }

  continue() {

    if (this.selectedClient != null) { // undefined
      this.dialogRef.close(this.selectedClient);
    }
  }

  cancel() {
    // if (this.selectedClient != null) {
    //   this.dialogRef.close();
    // }
   }

  selectedClientId(event) {
    console.log(event);
    this.selectedClient = event;
  }

}
