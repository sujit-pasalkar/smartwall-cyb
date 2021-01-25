import { Component, OnInit, Input } from '@angular/core';
// import { contentBox } from './content-box-object';
import { UploadImageComponent } from '../pop-up/upload-image/upload-image.component';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../home.service';
import { UploadVideoComponent } from '../pop-up/upload-video/upload-video.component';
import { AddFeedsComponent } from '../pop-up/add-feeds/add-feeds.component';
import { AddWidgetComponent } from '../pop-up/add-widget/add-widget.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DeleteContentComponent } from '../pop-up/delete-content/delete-content.component';

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
  imageTransitionEffectsArr: any[] = [];
  videoTransitionEffectsArr: any[] = [];
  imageContentItems: any[] = [];
  selectedContentTypeName: string = 'Select Type';
  selectedTransitionName:string= 'Select Transition';

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
      this.selectedContentType(this.homeService.editScreenDetails.contents[this.index].contentTypeItems[0].contentTypeId);
    }

  }

  selectedContentType(event) {

    this.homeService.editScreenDetails.contents[this.index].contentTypeId = event;
    this.editContentBoxObject.contentTypeId = event;
    let selected = this.homeService.contentTypeIds.filter(c => {
      return c.contentTypeId == event;
    });
    this.selectedContentTypeArr = selected;
    this.selectedContentTypeName = this.selectedContentTypeArr[0].contentTypeName;

    if (this.selectedContentTypeArr[0].contentTypeId == '8f722385-d2ee-11ea-becb-288217eb58f3') {
      if(this.homeService.editScreenDetails.contents[this.index].transition != ""){
        this.selectedTransitionName = this.homeService.editScreenDetails.contents[this.index].transition;
      }
      this.homeService.getImageTransition(this.selectedContentTypeArr[0].contentTypeId).subscribe(res => {
        this.imageTransitionEffectsArr = res.transitions;
      }, err => {
        console.log('err while getting image transition', err);
      });
    } else if (this.selectedContentTypeArr[0].contentTypeId == '6c80f302-d3eb-11ea-9cdb-06a49e672dea' &&
      this.homeService.editScreenDetails.contents[this.index].contentTypeItems.length != 0) {
      // video
      if (this.homeService.editScreenDetails.contents[this.index].contentTypeItems[0].contentTypeId == '6c80f302-d3eb-11ea-9cdb-06a49e672dea') {
        this.setImageFromVideoUrl();
      }
    }

  }

  setImageFromVideoUrl() {
    this.homeService.editScreenDetails.contents[this.index].contentTypeItems.forEach((element, i) => {
      var src = element.targetUrl;
      var video = document.createElement('video');

      video.src = src;
      video.width = 360;
      video.height = 240;
      video.currentTime = 15;

      video.setAttribute('crossOrigin', 'anonymous');
      // video.play();

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
      });
    });
  }

  selectedTransitionType(event) {
    this.homeService.editScreenDetails.contents[this.index].transition = event;
    this.selectedTransitionName = event;

  }

  uploadImagePopup() {
    const dialogRef = this.dialog.open(UploadImageComponent, {
      width: '56.0625rem',
      data: {
        'index': this.index,
        'contentTypeId': this.selectedContentTypeArr[0].contentTypeId
      }
    });

    dialogRef.afterClosed().subscribe((uploaded: any[]) => {
      if (uploaded) {
        this.homeService.editScreenDetails.contents[this.index].contentTypeItems = [];
        uploaded.forEach((element, i: number) => {
          if (element.newUploaded) {
            this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(
              {
                "contentTypeItemId": "",
                "itemDisplayTime": "",
                "itemSequence": i,
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
            this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(
              {
                ...element,
                "itemSequence": i,
                "imageFile": '',
                "contentBoxContentTypeItemId": "",
                "contetBoxId": ""
              });
          }
        });
      }
    });
  }

  uploadVideoPopup() {
    const dialogRef = this.dialog.open(UploadVideoComponent, {
      width: '56.0625rem',
      data: {
        'index': this.index,
        'contentTypeId': this.selectedContentTypeArr[0].contentTypeId
      }
    });

    dialogRef.afterClosed().subscribe(uploaded => {
      if (uploaded) {
        this.homeService.editScreenDetails.contents[this.index].contentTypeItems = [];
        uploaded.forEach((element, i: number) => {
          if (element.newUploaded) {
            this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(
              {
                "contentTypeItemId": "",
                "itemDisplayTime": "",
                "itemSequence": i,
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
            this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push({
              ...element,
              "itemSequence": i,
              "imageFile": '',
              "contentBoxContentTypeItemId": "",
              "contetBoxId": ""
            });
          }
        });
      }
    });
  }

  uploadFeedPopup() {
    const dialogRef = this.dialog.open(AddFeedsComponent, {
      width: '39.0625rem',
      data: {
        'index': this.index,
        'contentTypeId': this.selectedContentTypeArr[0].contentTypeId
      }
    });

    dialogRef.afterClosed().subscribe(uploaded => {
      if (uploaded) {
        this.homeService.editScreenDetails.contents[this.index].contentTypeItems = [];
        if (uploaded[0].newUploaded) {
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
          this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push(
            {
              ...uploaded[0],
              "contentBoxContentTypeItemId": "",
              "contetBoxId": ""
            });
        }

      }
    });
  }

  uploadWidgtPopup() {
    const dialogRef = this.dialog.open(AddWidgetComponent, {
      width: '39.0625rem',
      data: {
        'index': this.index,
        'contentTypeId': this.selectedContentTypeArr[0].contentTypeId
      }
    });

    dialogRef.afterClosed().subscribe(uploaded => {

      if (uploaded) {
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
              "widgetId": uploaded[0].targetUrl,
              "accountId": localStorage.getItem('selectedAccountId'),
              "name": uploaded[0].name,
              "contentBoxContentTypeItemId": "",
              "contentBoxId": ""
            }
          );
        }
        else {
          this.homeService.editScreenDetails.contents[this.index].contentTypeItems.push({
            ...uploaded[0],
            "contentBoxContentTypeItemId": "",
            "contetBoxId": ""
          });
        }

      }
    });
  }

  dropImages(event: CdkDragDrop<any>) {

    this.homeService.editScreenDetails.contents[this.index].contentTypeItems[event.previousContainer.data.index] = event.container.data.item
    this.homeService.editScreenDetails.contents[this.index].contentTypeItems[event.container.data.index] = event.previousContainer.data.item

    this.addSequence();
  }

  deleteImageVideo(i) {
    this.homeService.editScreenDetails.contents[this.index].contentTypeItems.splice(i, 1);
    this.addSequence();
  }

  addSequence() {
    this.homeService.editScreenDetails.contents[this.index].contentTypeItems.forEach(
      (item, index) => item.itemSequence = index
    )
  }

  deleteContent(i?){
    let contentName;
    if(this.selectedContentTypeArr[0].contentTypeId == '8f722385-d2ee-11ea-becb-288217eb58f3'){
      contentName = 'Image'
    } else if(this.selectedContentTypeArr[0].contentTypeId == 'aa666ce2-d555-11ea-9cdb-06a49e672dea'){
      contentName = 'Feed'
    } else if(this.selectedContentTypeArr[0].contentTypeId == '6c80f302-d3eb-11ea-9cdb-06a49e672dea'){
      contentName = 'Video'
    } else{
      contentName = 'Widget'
    }
    const dialogRef = this.dialog.open(DeleteContentComponent, {
      width: '36.0625rem',
      data: {
        'contentName': contentName,
      }
    });

    dialogRef.afterClosed().subscribe(deleteRes => {
      if (deleteRes === true) {
        // call actual delete
        if(contentName == 'Feed' || contentName == 'Widget'){
          this.deleteFeed();
        } else{
          this.deleteImageVideo(i);
        }
      }
    });
  }

  deleteFeed(){
    this.homeService.editScreenDetails.contents[this.index].contentTypeItems = [];
  }

}
