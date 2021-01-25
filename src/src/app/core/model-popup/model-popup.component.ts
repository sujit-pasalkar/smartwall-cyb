import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'sa-model-popup',
  templateUrl: './model-popup.component.html',
  styleUrls: ['./model-popup.component.css']
  // '../../wall/wall-common.component.css',
})
export class ModelPopupComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  ngOnInit() {
  }

}
