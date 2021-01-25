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
  selectedFromExistingWidgets: any[] = [];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddWidgetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public homeService: HomeService) { }

  ngOnInit(): void {

    this.homeService.getExistingContentData(this.data.contentTypeId).subscribe(data => {
      console.log('existing data-', data);
      this.homeService.existingWidgets = data.contents;
    },
    error => {
      console.log('error while getting existing data-', error);
    });

      if(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems.length != 0){
        if(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems[0].contentTypeId == '13ce14bc-e2ab-11ea-9cdb-06a49e672dea'){
          this.addWidgetObject = JSON.parse(JSON.stringify(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems));
        } else{
          this.addWidgetObject = [{
            "dashboardId": "",
            "targetUrl": "",
            "name": "",
            "newUploaded": true
          }];
        }
      } else{
        this.addWidgetObject = [{
          "dashboardId": "",
          "targetUrl": "",
          "name": "",
          "newUploaded": true
        }];
      }
  }

  save() {
    console.log('ex',this.selectedFromExistingWidgets);

    if (this.selectedFromExistingWidgets.length == 0) {
    if(this.addWidgetObject[0].dashboardId != "" && this.addWidgetObject[0].targetUrl != "" && this.addWidgetObject[0].name != ""){
      console.log('afetr save-', this.addWidgetObject);
      this.addWidgetObject[0].newUploaded= true
      this.dialogRef.close(this.addWidgetObject);
    }}else{
      this.dialogRef.close(this.selectedFromExistingWidgets);
    }
  }

  selectedFromExisting(event){
    console.log(event);
    this.homeService.existingWidgets.forEach(e => {
      if (e.contentTypeItemId == event) {
        this.selectedFromExistingWidgets = [];
        this.selectedFromExistingWidgets.push({
          ...e,
          "newUploaded": false
        })
      }
    });
  }
}
