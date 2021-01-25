import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css', '../../../home.component.css']
})
export class DeployComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeployComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public homeService: HomeService,
    public spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
  }

}
