import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-feeds',
  templateUrl: './add-feeds.component.html',
  styleUrls: ['./add-feeds.component.css', '../../../home.component.css']
})
export class AddFeedsComponent implements OnInit {
  addFeedObject: any[] = [];
  selectedFromExistingFeeds: any[] = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddFeedsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public homeService: HomeService,
    public spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.spinner.show();
    this.homeService.getExistingContentData(this.data.contentTypeId).subscribe(data => {
      this.homeService.existingTagBoxUrl = data.contents;
      this.spinner.hide();
    },
      error => {
        console.log('error while getting existing data-', error);
        this.spinner.hide();
      });

    if (this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems.length != 0) {
      if (this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems[0].contentTypeId == 'aa666ce2-d555-11ea-9cdb-06a49e672dea') {
        this.addFeedObject = JSON.parse(JSON.stringify(this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems));
      } else {
        this.addFeedObject = [{
          "name": "",
          "targetUrl": "",
          "newUploaded": true
        }]
      }
    } else {
      this.addFeedObject = [{
        "name": "",
        "targetUrl": "",
        "newUploaded": true
      }]
    }
  }

  save() {
    if (this.selectedFromExistingFeeds.length == 0) {
      if (this.addFeedObject[0].targetUrl != "" && this.addFeedObject[0].name != "") {
        console.log('afetr save-', this.addFeedObject);
        this.addFeedObject[0].newUploaded = true
        this.dialogRef.close(this.addFeedObject);
      }
    } else{
      this.dialogRef.close(this.selectedFromExistingFeeds);
    }
  }

  selectedFromExisting(event) {
    console.log(event);
    this.homeService.existingTagBoxUrl.forEach(e => {
      if (e.contentTypeItemId == event) {
        this.selectedFromExistingFeeds = [];
        this.selectedFromExistingFeeds.push({
          ...e,
          "newUploaded": false
        })
      }
    });

  }

}
