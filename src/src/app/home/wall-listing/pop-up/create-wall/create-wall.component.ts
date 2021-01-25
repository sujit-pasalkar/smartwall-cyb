import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-wall',
  templateUrl: './create-wall.component.html',
  styleUrls: ['../../../home.component.css', './create-wall.component.css']
})
export class CreateWallComponent implements OnInit {

  name: string;
  label: string = '';
  errorMessage: string;
  error:boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateWallComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public homeService: HomeService,
    public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  continue() {
    if ((this.name != null && this.name.trim() !== '')) {
      let sendObject = {
        name: this.name,
        label: (this.label != null && this.label.trim() !== '') ? this.label : '-'
      };
      this.createWallApi(sendObject.name, sendObject.label);
    }
  }

  createWallApi(wallName, wallLabel) {
    this.spinner.show();
    this.homeService.createWall(wallName, wallLabel, localStorage.getItem('selectedAccountId')).subscribe(successRes => {
      this.spinner.hide();
      this.dialogRef.close(true);

    }, error => {
      console.log('Error while creating',error);
      this.spinner.hide();
      this.error = true;
      this.errorMessage = error.error.errorMessage;
    }
    );
  }

  cancel() {
  }

}
