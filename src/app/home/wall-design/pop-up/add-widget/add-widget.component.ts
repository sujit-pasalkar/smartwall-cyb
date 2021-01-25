import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';
@Component({
  selector: 'app-add-widget',
  templateUrl: './add-widget.component.html',
  styleUrls: ['./add-widget.component.css', '../../../home.component.css']
})
export class AddWidgetComponent implements OnInit {

  addWidgetObject: any[] = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddWidgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public homeService: HomeService) { }

  ngOnInit(): void {

    // remove
    // this.addWidgetObject = this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems.length != 0 ?
    //   JSON.parse(JSON.stringify(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems)) :
    //   [{
    //     "dashboardId": "",
    //     "widgetId": "",
    //     "name": "",
    //     "newUploaded": true
    //   }]

      if(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems.length != 0){
        if(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems[0].contentTypeId == '13ce14bc-e2ab-11ea-9cdb-06a49e672dea'){
          this.addWidgetObject = JSON.parse(JSON.stringify(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems));
        } else{
          this.addWidgetObject = [{
            "dashboardId": "",
            "widgetId": "",
            "name": "",
            "newUploaded": true
          }];
        }
      } else{
        this.addWidgetObject = [{
          "dashboardId": "",
          "widgetId": "",
          "name": "",
          "newUploaded": true
        }];
      }
  }

  save() {
    if(this.addWidgetObject[0].dashboardId != "" && this.addWidgetObject[0].widgetId != "" && this.addWidgetObject[0].name != ""){
      console.log('afetr save-', this.addWidgetObject);
      this.addWidgetObject[0].newUploaded= true
      this.dialogRef.close(this.addWidgetObject);
    }
  }

  selectedFromExisting(event){

  }
}
