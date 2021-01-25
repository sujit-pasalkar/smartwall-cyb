import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-add-feeds',
  templateUrl: './add-feeds.component.html',
  styleUrls: ['./add-feeds.component.css', '../../../home.component.css']
})
export class AddFeedsComponent implements OnInit {
  addFeedObject: any[] = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddFeedsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public homeService: HomeService) { }

  ngOnInit(): void {
    // this.addFeedObject = this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems.length != 0 ?
    //   JSON.parse(JSON.stringify(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems)) :
      // [{
      //   "name": "",
      //   "targetUrl": "",
      //   "newUploaded": true
      // }]

    if(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems.length != 0){
      if(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems[0].contentTypeId == 'aa666ce2-d555-11ea-9cdb-06a49e672dea'){
        this.addFeedObject = JSON.parse(JSON.stringify(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems));
      } else{
        this.addFeedObject = [{
          "name": "",
          "targetUrl": "",
          "newUploaded": true
        }]
      }
    } else{
      this.addFeedObject = [{
        "name": "",
        "targetUrl": "",
        "newUploaded": true
      }]
    }
  }

  save() {
    if (this.addFeedObject[0].targetUrl != "" && this.addFeedObject[0].name != "") {
      console.log('afetr save-', this.addFeedObject);
      this.addFeedObject[0].newUploaded= true
      this.dialogRef.close(this.addFeedObject);
    }
  }

  selectedFromExisting(event){

  }

}
