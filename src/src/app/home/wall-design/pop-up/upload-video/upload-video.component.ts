import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css', '../../../home.component.css']
})
export class UploadVideoComponent implements OnInit {
  videoList: any[] = [];
  addingImg = false;
  videoUrl: string

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UploadVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public homeService: HomeService,
    public spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.homeService.getExistingContentData(this.data.contentTypeId).subscribe(data => {
      console.log('existing data-', data);
      this.homeService.existingVideos = data.contents;
      this.spinner.hide();
    },
    error => {
      console.log('error while getting existing data-', error);
      this.spinner.hide();
    });

    let removeDuplicates: any[]=[];

    this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems.forEach(element => {
      if (element.contentTypeId == '6c80f302-d3eb-11ea-9cdb-06a49e672dea') {
        removeDuplicates.push(
          {
            ...element,
            'isChecked': true,
            'newUploaded': false
          }
        );
      }

    });
    this.homeService.existingVideos.forEach(element => {
      removeDuplicates.push({
        ...element,
        'isChecked': false,
        'newUploaded': false
      });
    });

    // add conert to unique name code
    this.videoList = JSON.parse(JSON.stringify(removeDuplicates.filter((v,i,a)=>a.findIndex(t=>(t.targetUrl === v.targetUrl))===i)));
    // console.log('ii',testImageList.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i))

    this.setImageFromVideoUrl();

    this.addIndexToImages();
    console.log('this.videoList', this.videoList);

  }

  setImageFromVideoUrl() {
    this.videoList.forEach((element, i) => {
      var src = element.targetUrl;
      var video = document.createElement('video');

      video.src = src;
      video.currentTime =15;
      video.width = 360;
      video.height = 240;

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
        console.log('added.....', i);
      });
    });
  }

  addVideo() {
    this.spinner.show();
    console.log('adding', this.videoUrl);
    var src = this.videoUrl;
    var video = document.createElement('video');
    let time = 15

    video.src = src;
    video.currentTime = time;
    video.width = 360;
    video.height = 240;

    // video.controls = true;
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
      this.addThumbnail(videoImageUrl);
      console.log('added.....');
      this.spinner.hide();
    });
  }

  addThumbnail(videoImageUrl) {
    this.addingImg = true;
    this.videoList.push(
      {
        'src': videoImageUrl,
        'fileName': 'not found',
        'isChecked': false,
        'targetUrl': this.videoUrl,
        'newUploaded': true
      }
    );
    this.addIndexToImages();
    setTimeout(() => {
      this.addingImg = false;
    }, 10);
    this.addIndexToImages();
  }

  addIndexToImages() {
    this.videoList.forEach(
      (item, index) => item.index = index
    )
  }

  selectImage(event, index) {
    this.videoList[index].isChecked = event.checked;
  }

  deleteUploadedImage(index) {
    this.addingImg = true;
    this.videoList.splice(index, 1);
    this.addIndexToImages();
    setTimeout(() => {
      this.addingImg = false;
    }, 10);
  }

  save() {
    let sendImageData: any[] = [];
    sendImageData = this.videoList.filter(i => {
      return i.isChecked;
    });
    console.log('afetr save-', sendImageData);
    this.dialogRef.close(sendImageData);
  }

}
