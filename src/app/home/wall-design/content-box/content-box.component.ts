import { Component, OnInit, Input } from '@angular/core';
import { contentBox } from './content-box-object';
import { UploadImageComponent } from '../pop-up/upload-image/upload-image.component';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../home.service';
import { UploadVideoComponent } from '../pop-up/upload-video/upload-video.component';
import { AddFeedsComponent } from '../pop-up/add-feeds/add-feeds.component';
import { AddWidgetComponent } from '../pop-up/add-widget/add-widget.component';

@Component({
  selector: 'app-content-box',
  templateUrl: './content-box.component.html',
  styleUrls: ['../wall-design.component.css', './content-box.component.css']
})
export class ContentBoxComponent implements OnInit {

  @Input() contentBoxObject;
  @Input() index;

  editContentBoxObject;
  // imageVideoList: any[];
  // videoList: any[]; // img
  responsiveOptions: any
  layoutBoxImage: string;
  selectedContentTypeArr: any[];
  addingImg: boolean = false;
  imageTransitionEffectsArr: any[] =[];
  videoTransitionEffectsArr: any[] =[];

  constructor(public dialog: MatDialog, public homeService: HomeService) { }

  ngOnInit(): void {
    // dummy content box Object:
    this.editContentBoxObject = JSON.parse(JSON.stringify(this.contentBoxObject));

    this.homeService.layoutTypesObject.forEach(layout => {
      if (layout.layoutTypeId === this.editContentBoxObject.layoutTypeId) {
        this.layoutBoxImage = layout.name + '-' + this.index;
      }
    });


    if (this.homeService.editScreenDetails.contents[this.index].contentTypeItems.length != 0) {
      this.selectedContentType(this.homeService.editScreenDetails.contents[this.index].contentTypeItems[0].contentTypeId)
      // this.homeService.editScreenDetails.contents[this.index].contentTypeId =
      // this.homeService.editScreenDetails.contents[this.index].contentTypeItems[0].contentTypeId;

      // this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(
      //   {
      //     "contentTypeItemId": "", // for new upload blank
      //     "itemDisplayTime": "",
      //     "itemSequence": null,
      //     "targetUrl": null,  //old img/vid -->url->name
      //     "imageFile": null,// for new image-->blob ,
      //     "contentTypeId": '',
      //     "contentTypeName": '',
      //     "dashboardId": "",
      //     "widgetId": "",
      //     "accountId": localStorage.getItem('selectedAccountId'),
      //     "name": "", // img/vid name
      //     "contentBoxContentTypeItemId": "",
      //     "contentBoxId": "",
      //   }
      // );
    }

    console.log('after []', this.homeService.editScreenDetails.contents[this.index]);

    // img-video upload corosol data
    // this.imageVideoList = [1, 2, 3];
  }

  selectedContentType(event) {
    this.homeService.editScreenDetails.contents[this.index].contentTypeId = event;
    // .contentTypeItems[0]
    this.editContentBoxObject.contentTypeId = event;
    let selected = this.homeService.contentTypeIds.filter(c => {
      return c.contentTypeId == event;
    });
    this.selectedContentTypeArr = selected;

    // from selected contentTypeId get existing data
    // if (this.selectedContentTypeArr[0].contentTypeName == 'image') {
    this.homeService.getExistingContentData(this.selectedContentTypeArr[0].contentTypeId).subscribe(data => {
      console.log('existing data-', data);
      if (this.selectedContentTypeArr[0].contentTypeId == '8f722385-d2ee-11ea-becb-288217eb58f3') {
        this.homeService.existingImages = data.contents;
        this.homeService.getImageTransition(this.selectedContentTypeArr[0].contentTypeId).subscribe(res => {
          this.imageTransitionEffectsArr = res.transitions;
          console.log('transition res', res.transitions);
        }, err => {
          console.log('err while getting image transition', err);
        });
      } else if (this.selectedContentTypeArr[0].contentTypeId == '6c80f302-d3eb-11ea-9cdb-06a49e672dea') {
        this.homeService.existingVideos = data.contents;
        if(this.homeService.editScreenDetails.contents[this.index].contentTypeItems.length != 0){
          this.setImageFromVideoUrl();
        }
        this.homeService.getImageTransition(this.selectedContentTypeArr[0].contentTypeId).subscribe(res => {
          this.videoTransitionEffectsArr = res.transitions;
          console.log('transition res', res.transitions);
        }, err => {
          console.log('err while getting image transition', err);
        });
      } else if (this.selectedContentTypeArr[0].contentTypeId == '13ce14bc-e2ab-11ea-9cdb-06a49e672dea') {
        this.homeService.existingWidgets = data.contents;
      } else if (this.selectedContentTypeArr[0].contentTypeId == 'aa666ce2-d555-11ea-9cdb-06a49e672dea') {
        this.homeService.existingTagBoxUrl = data.contents;
      }
    },
      error => {
        console.log('error while getting existing data-', error);
      });
    // }
    console.log('content-', event, this.homeService.editScreenDetails.contents[this.index],this.homeService.noExistingData);

  }

  setImageFromVideoUrl() {
    this.homeService.editScreenDetails.contents[this.index].contentTypeItems.forEach((element,i) => {
      var src = element.targetUrl;
      var video = document.createElement('video');

      video.src = src;
      video.width = 360;
      video.height = 240;

      video.setAttribute('crossOrigin', 'anonymous');
      video.play();

      var canvas = document.createElement('canvas');
      canvas.width = 360;
      canvas.height = 240;
      var context = canvas.getContext('2d');

      video.addEventListener('loadeddata', () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        video.pause();

        var videoImageUrl = canvas.toDataURL('image/jpeg');
        // this.addThumbnail(videoImageUrl);
        element.src = videoImageUrl;
        console.log('added.....',i);
      });
    });
  }

  selectedTransitionType(event) {
    console.log('tr', event);
    this.homeService.editScreenDetails.contents[this.index].transition = event;

  }

  uploadImagePopup() {
    const dialogRef = this.dialog.open(UploadImageComponent, {
      width: '56.0625rem',
      data: {
        'index': this.index
      }
    });

    dialogRef.afterClosed().subscribe((uploaded: any[]) => {
      if (uploaded) {
        console.log('uploaded images,', uploaded);
        this.homeService.editScreenDetails.contents[this.index].contentTypeItems = [];
        uploaded.forEach((element, i) => {
          if (element.newUploaded) {
            this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(
              {
                "contentTypeItemId": "", // for new upload blank
                "itemDisplayTime": "",
                "itemSequence": element.index,
                "targetUrl": "",
                "imageFile": element.src,
                "contentTypeId": this.selectedContentTypeArr[0].contentTypeId,
                "contentTypeName": this.selectedContentTypeArr[0].contentTypeName,
                "dashboardId": "",
                "widgetId": "",
                "accountId": localStorage.getItem('selectedAccountId'),
                "name": element.fileName,
                "contentBoxContentTypeItemId": "",
                "contentBoxId": "",
                "src": element.src
              }
            );
          }
           else {
            //  split
            this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(element);
          }
        });

        this.addingImg = true;
        setTimeout(() => {
          this.addingImg = false;
        }, 10);
      }
    });
  }

  uploadVideoPopup() {
    const dialogRef = this.dialog.open(UploadVideoComponent, {
      width: '56.0625rem',
      data: {
        'index': this.index
      }
    });

    dialogRef.afterClosed().subscribe(uploaded => {
      if (uploaded) {
        console.log('uploaded video urls,', uploaded);
        this.homeService.editScreenDetails.contents[this.index].contentTypeItems = [];
        uploaded.forEach((element, i) => {
          if (element.newUploaded) {
            console.log('++',i);

            this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(
              {
                "contentTypeItemId": "",
                "itemDisplayTime": "",
                "itemSequence": element.index,
                "targetUrl": element.targetUrl,
                "imageFile": "",
                "contentTypeId": this.selectedContentTypeArr[0].contentTypeId,
                "contentTypeName": this.selectedContentTypeArr[0].contentTypeName,
                "dashboardId": "",
                "widgetId": "",
                "accountId": localStorage.getItem('selectedAccountId'),
                "name": "",
                "contentBoxContentTypeItemId": "",
                "contentBoxId": "",
                "src": element.src
              }
            );
          }
          else {
            this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(element);
          }
        });

        this.addingImg = true;
        setTimeout(() => {
          this.addingImg = false;
        }, 10);
      }
    });
  }

  uploadFeedPopup() {
    const dialogRef = this.dialog.open(AddFeedsComponent, {
      width: '39.0625rem',
      data: {
        'index': this.index
      }
    });

    dialogRef.afterClosed().subscribe(uploaded => {
      console.log('uploaded feed,', uploaded);
      this.homeService.editScreenDetails.contents[this.index].contentTypeItems = [];
      if (uploaded[0].newUploaded) {
        console.log('new');

        this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(
          {
            "contentTypeItemId": "",
            "itemDisplayTime": "",
            "itemSequence": "",
            "targetUrl": uploaded[0].targetUrl,
            "imageFile": "",
            "contentTypeId": this.selectedContentTypeArr[0].contentTypeId,
            "contentTypeName": this.selectedContentTypeArr[0].contentTypeName,
            "dashboardId": "",
            "widgetId": "",
            "accountId": localStorage.getItem('selectedAccountId'),
            "name": uploaded[0].name,
            "contentBoxContentTypeItemId": "",
            "contentBoxId": "",
          }
        );
      }
      else {
        console.log('ol');

        this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(uploaded[0]);
      }
    });
  }

  uploadWidgtPopup() {
    const dialogRef = this.dialog.open(AddWidgetComponent, {
      width: '39.0625rem',
      data: {
        'index': this.index
      }
    });

    dialogRef.afterClosed().subscribe(uploaded => {
      console.log('uploade widget,', uploaded);
      this.homeService.editScreenDetails.contents[this.index].contentTypeItems = [];
      if (uploaded[0].newUploaded) {
        this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(
          {
            "contentTypeItemId": "",
            "itemDisplayTime": "",
            "itemSequence": "",
            "targetUrl": "",
            "imageFile": "",
            "contentTypeId": this.selectedContentTypeArr[0].contentTypeId,
            "contentTypeName": this.selectedContentTypeArr[0].contentTypeName,
            "dashboardId": uploaded[0].dashboardId,
            "widgetId": uploaded[0].widgetId,
            "accountId": localStorage.getItem('selectedAccountId'),
            "name": uploaded[0].name,
            "contentBoxContentTypeItemId": "",
            "contentBoxId": ""
          }
        );
      }
      else {
        this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(uploaded[0]);
      }
    });
  }

}
