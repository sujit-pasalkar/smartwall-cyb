import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-background-image',
  templateUrl: './background-image.component.html',
  styleUrls: ['./background-image.component.css', '../../../home.component.css']
})
export class BackgroundImageComponent implements OnInit {
  imageVideoList: any[] = [];
  addingImg = false;
  selectedIndex;

  constructor(
    public homeService: HomeService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BackgroundImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.homeService.getExistingBgImageData().subscribe(data => {
      console.log('existing bg-', data);
      this.homeService.existingBackgroundImages = data.bgContents;
      this.imageVideoList = JSON.parse(JSON.stringify(this.homeService.existingBackgroundImages));
      this.addIndexToImages();

    },
      error => {
        console.log('error while getting existing data-', error);
      });
  }

  uploadImage(event) {
    // dont add same video/image logic--fail
    let upload = true;
    for (let i = 0; i < this.imageVideoList.length; i++) {
      // console.log(this.imageVideoList[i].fileName, '--', event.srcElement.files[0].name,
      //   'ans ', (this.imageVideoList[i].fimeName as string) == (event.srcElement.files[0].name as string));
      if ((this.imageVideoList[i].fimeName as string) == (event.srcElement.files[0].name as string)) {
        upload = false;
        // console.log('found same');
        break;
      }

    }
    if (upload) {
      this.addingImg = true;
      var file = event.srcElement.files[0];
      var reader = new FileReader;
      reader.onloadend = () => {
        this.imageVideoList.push(
          {
            'src': reader.result as string, // new Blob([new Unit8Array(reader.result)],{type: 'text/plain'}),//
            // 'selectable': true,
            'fileName': event.srcElement.files[0].name,
            'isChecked': false,
            'file': file,
            'bgImageUrl': '',

          }
        );
        this.addIndexToImages();
      }
      reader.readAsDataURL(file);
      // console.log('then-', this.homeService.bgImagesList);
      setTimeout(() => {
        this.addingImg = false;
      }, 10);
      this.addIndexToImages();

    }
  }

  addIndexToImages() {
    this.imageVideoList.forEach(
      (item, index) => item.index = index
    )
  }

  deleteUploadedImage(index) {
    this.addingImg = true;
    this.imageVideoList.splice(index, 1);
    this.addIndexToImages();
    console.log('delete-', this.imageVideoList);
    setTimeout(() => {
      this.addingImg = false;
    }, 10);
  }

  selectBgImage(event, index) {
    console.log(event);
    this.selectedIndex = index;
    this.imageVideoList.forEach(e => {
      e.isChecked = false;
    });
    this.imageVideoList[index].isChecked = true;

  }

  save() {
    let sendVideoData: any[] = [];
    sendVideoData = this.imageVideoList.filter(i => {
      return i.isChecked;
    });
    console.log('afetr save-', sendVideoData);
    if(sendVideoData.length != 0){
      this.dialogRef.close(sendVideoData);
    }
  }
}
