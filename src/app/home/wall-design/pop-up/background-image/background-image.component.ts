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

    this.imageVideoList = JSON.parse(JSON.stringify(this.homeService.existingBackgroundImages));
    this.addIndexToImages();
  }

  uploadImage(event) {
    // dont add same video/image logic--fail
    let upload = true;
    for (let i = 0; i < this.imageVideoList.length; i++) {
      console.log(this.imageVideoList[i].fileName,'--',event.srcElement.files[0].name,
      'ans ',(this.imageVideoList[i].fimeName as string) == (event.srcElement.files[0].name as string));
      if ((this.imageVideoList[i].fimeName as string) == (event.srcElement.files[0].name as string)) {
        upload = false;
        console.log('found same');
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
            'fileName':  event.srcElement.files[0].name,
            'isChecked': false,
            'file': file
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

      // upload img api
    // code to upload image file
    // let file1 = event.target.files[0] as File;
    // this.homeService.uploadImage(event.target.files[0] as File).subscribe(r =>{
    //   console.log('upload success',r);
    // }, err =>{
    //   console.log('Error while uploading image',err);
    // })

    }
  }

  addIndexToImages() {
    this.imageVideoList.forEach(
      (item, index) => item.index = index
    )
  }

  deleteUploadedImage(index) {
    // this.addingImg = true;
    // this.imageVideoList.splice(index, 1);
    // this.addIndexToImages();
    // setTimeout(() => {
    //   this.addingImg = false;
    // }, 10);
    this.addingImg = true;
    this.imageVideoList.splice(index, 1);
    this.addIndexToImages();
    console.log('delete-', this.imageVideoList);
    setTimeout(() => {
      this.addingImg = false;
    }, 10);
  }

  selectBgImage(event,index) {
    console.log(event);
    this.selectedIndex = index;
    this.imageVideoList.forEach(e => {
      e.isChecked = false;
    });
    this.imageVideoList[index].isChecked =  true;

  }

  save() {
    // if (this.selectedIndex ) {
    // this.homeService.editScreenDetails.bgImageUrl = this.homeService.bgImagesList[this.selectedIndex].src;
    // }
    // this.dialogRef.close();

    let sendVideoData: any[] = [];
    sendVideoData = this.imageVideoList.filter(i => {
      return i.isChecked;
    });
    console.log('afetr save-', sendVideoData);
    this.dialogRef.close(sendVideoData);
  }
}
