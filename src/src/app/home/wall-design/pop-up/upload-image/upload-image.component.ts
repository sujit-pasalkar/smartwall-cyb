import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css', '../../../home.component.css']
})
export class UploadImageComponent implements OnInit {
  imageVideoList: any[] = [];
  addingImg = false

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public homeService: HomeService,
    public spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.spinner.show()
    this.homeService.getExistingContentData(this.data.contentTypeId).subscribe(data => {
      console.log('existing data-', data);
      this.homeService.existingImages = data.contents;
      this.spinner.hide();
    },
      error => {
        console.log('error while getting existing data-', error);
        this.spinner.hide();
      });

    console.log('existing-', this.homeService.existingImages);


    let testImageList: any[] = [];
    this.homeService.editScreenDetails.contents[this.data.index].contentTypeItems.forEach(element => {
      if (element.contentTypeId == '8f722385-d2ee-11ea-becb-288217eb58f3') {
        testImageList.push(
          {
            ...element,
            'isChecked': true,
            'newUploaded': false
          }
        );
      }
    });

    this.homeService.existingImages.forEach(element => {
      testImageList.push({
        ...element,
        'isChecked': false,
        'newUploaded': false
      });
    });

    this.imageVideoList = JSON.parse(JSON.stringify(testImageList.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i)));
    console.log('ii', testImageList.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i))

    this.addIndexToImages();

    console.log('imageVideoList', this.imageVideoList);

  }

  uploadImage(event) {
    this.addingImg = true;
    var file = event.srcElement.files[0];
    var reader = new FileReader;
    reader.onloadend = () => {
      this.imageVideoList.push(
        {
          'src': reader.result as string,
          // 'selectable': true,
          'fileName': event.srcElement.files[0].name,
          'isChecked': false,
          'file': file,
          'newUploaded': true,
          'targetUrl': ''
        }
      );
      this.addIndexToImages();
    }
    reader.readAsDataURL(file);
    console.log('then-', this.imageVideoList);
    setTimeout(() => {
      this.addingImg = false;
    }, 10);
    this.addIndexToImages();

  }

  addIndexToImages() {
    this.imageVideoList.forEach(
      (item, index) => item.index = index
    )
  }

  selectImage(event, index) {
    this.imageVideoList[index].isChecked = event.checked;
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

  save() {
    let sendVideoData: any[] = [];
    sendVideoData = this.imageVideoList.filter(i => {
      return i.isChecked;
    });
    console.log('afetr save-', sendVideoData);
    this.dialogRef.close(sendVideoData);
  }

}
