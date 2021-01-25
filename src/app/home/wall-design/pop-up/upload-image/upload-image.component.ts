import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any, public homeService: HomeService) { }

  ngOnInit(): void {
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
    // dont add same names
    // let unique: any[] = []
    this.homeService.existingImages.forEach(element => {
      // this.imageVideoList.forEach(duplicate => {
      //   console.log(duplicate.name != element.name, duplicate.name, element.name);
      //   if (duplicate.name != element.name) {
      //     unique.push({
      //       ...element,
      //       'newUploaded': false
      //     });
      //   }

      // });
      // this.imageVideoList.includes(e=> )


      // this.imageVideoList.concat(unique)

      testImageList.push({
        ...element,
        'newUploaded': false
      });
    });

    // this.imageVideoList = [...new Set(testImageList.map(item => item.targetUrl))]
    testImageList.map(item => item.name).filter((value,index,self) => self.indexOf(value) === index)


    // this.addIndexToImages();
    console.log('existing images',this.homeService.existingImages);

    console.log('this.imageVideoList', this.imageVideoList, this.data.index,testImageList);

  }

  uploadImage(event) {
    // console.log('img e-',event);
    // reader.onloadend =

    // var file = event.srcElement.files[0];
    // var reader = new FileReader;

    // // this.selectedBackgroungImage = <File>event.target.files[0];
    // let file = event.target.files[0];
    // let reader = new FileReader();
    // let img: HTMLImageElement = <HTMLImageElement>document.getElementById("showImgTest");
    // reader.onloadend = function () {
    //   img.src = reader.result as string;
    //   // $('showImgTest').attr('src',reader.result);
    // }
    // reader.readAsDataURL(file);


    // // code to upload image file
    // let file1 = event.target.files[0] as File;
    // const formData = new FormData();
    // formData.append("file", file1);
    // const config = {
    //   headers: {
    //     'Accept': 'application/json',
    //   }
    // };

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
          'newUploaded': true
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
