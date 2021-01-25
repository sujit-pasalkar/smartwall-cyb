import { Component, OnInit, OnDestroy, ViewChild, HostListener, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { HomeService } from '../home.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/app/core/common-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { UploadImageComponent } from './pop-up/upload-image/upload-image.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { layoutTypeIds, screenList, screenDetails, contentTypeIds } from './content-box/content-box-object';
import { BackgroundImageComponent } from './pop-up/background-image/background-image.component';
import { CancelComponent } from './pop-up/cancel/cancel.component';


@Component({
  selector: 'app-wall-design',
  templateUrl: './wall-design.component.html',
  styleUrls: ['../home.component.css', './wall-design.component.css']
})
export class WallDesignComponent implements OnInit, OnDestroy {

  // questionPanel: boolean = false;

  choosenLayout: number = 1;
  changePassword = false;
  wallId;
  screenListArray: any[] = [];
  bannerImage: boolean = true;
  // selectedScreenItem;
  addScreenPanelSuccess: boolean = false;

  editScreenId: string;
  editScreenPassword;
  selectedBackgroungImage: File = null;
  selectedScreenUserId: string;

  createScreenForm: FormGroup;
  createScreenFormSubmitted = false;
  chooseContentFrom: any[] = [];
  addScreenError: string;

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!document.getElementById("addScreenPanel").contains(event.target) && this.addScreenPanelSuccess) {
      this.addScreenPanelSuccess = false;
      this.chooseContentFrom = [];
      this.editScreenId = '';
      this.editScreenPassword = '';
      this.addScreenError = '';
      this.choosenLayout = 1;

    }

    // for closing password input field
    if (!this.bannerImage && this.changePassword) {
      if (!document.getElementById("changeScreenPassword").contains(event.target) && this.changePassword) {
        this.changePassword = false;
        if (this.homeService.editScreenDetails.password) {
          this.changeDesignPassword();
        }
      }
    }
  }

  changeDesignPassword() {
    this.homeService.changeDesignPassword().subscribe(res => {
      console.log('change pwd res', res);
    }, err => {
      console.log('change pwd err', err);
    });
  }

  constructor(public dialog: MatDialog,
    public homeService: HomeService,
    public spinner: NgxSpinnerService,
    private router: Router
  ) {

    let wallIdData = this.router.getCurrentNavigation().extras.state;
    if (wallIdData) {
      if (wallIdData.wallId != '') {
        localStorage.setItem('selectedWallId', wallIdData.wallId);
        this.wallId = wallIdData.wallId;
      }
    }
  }

  ngOnInit() {
    // test
    // this.screenListArray = screenList;
    // create screen validation
    this.createScreenForm = new FormGroup({
      editScreenId: new FormControl('', Validators.required),
      editScreenPassword: new FormControl('', Validators.required)
    });

    $('#textarealength').keyup(function () {
      var characterCount = $(this).val().length,
        current = $('#current'),
        maximum = $('#maximum'),
        theCount = $('#the-count');
      current.text(characterCount);
    });

    /* GET WALL DATA FROM WALL ID- API
    DATA - SCREEN LIST
    */
    this.getLayoutIds();
    this.getContentTypeIds();
    this.getScreenList().then(sucess => {
      //  functionality - make 1 screen auto selected
      if (this.screenListArray.length != 0) {
        this.getScreenDetails(this.screenListArray[0].userId);
      }
    }).catch(err => {
      console.log('Error or reject from getAcc function', err);
    });

    this.calcHeight();
    this.calcHeightRight();
    if (document.getElementById('screenPanelAddLabel') !== undefined) {
      // this.calcHeightAddLabel();
    }
  }

  get f() { return this.createScreenForm.controls; }

  getLayoutIds() {
    this.spinner.show();
    this.homeService.getLayoutIds().subscribe((layout) => {
      this.homeService.layoutTypesObject = layout.layoutTypes;
      console.log('layoutId-', JSON.stringify(this.homeService.layoutTypesObject));
      this.spinner.hide();
    },
      error => {
        console.log('error while getting layoutIds-', error);
        this.spinner.hide();
      });
    // this.homeService.layoutTypesObject = layoutTypeIds;
  }

  getContentTypeIds() {
    this.spinner.show();
    this.homeService.getContentTypeIds().subscribe((contentTypeIds) => {
      this.homeService.contentTypeIds = contentTypeIds.contentTypes;
      console.log('contentTypeIds-', contentTypeIds);
      this.spinner.hide();
    },
      error => {
        console.log('error while getting contentTypeIds-', error);
        this.spinner.hide();
      });
    // this.homeService.contentTypeIds = contentTypeIds;
  }

  async getScreenList(): Promise<any> {
    try {
      this.spinner.show();
      const list = await this.homeService.getScreenList().toPromise();
      this.screenListArray = list.screens;
      return new Promise((resolve, reject) => {
        this.spinner.hide();
        resolve();
      });

    } catch (error) {
      console.log('getAccountList api err:', error);
      this.spinner.hide();
    }
    // this.screenListArray = screenList;
  }

  changeLayout(number: number) {
    this.choosenLayout = number;
  }

  changeScreenPassword() {
    this.changePassword = !this.changePassword;
  }

  clickEventM() {
    this.addScreenPanelSuccess = !this.addScreenPanelSuccess;
  }

  ngOnDestroy() {
    // unsubscribe all subscription
  }

  // Function for open choose layout Panel for wall
  chooseLayout() {
    this.addScreenPanelSuccess = !this.addScreenPanelSuccess;
  }

  // Function for add screen from choose layout panel
  addScreen(chooseContent) {
    this.spinner.show();
    /*  if(!this.chooseContentFrom)*/

    /* add screenAdd validation - screen name unique,screeid req, pass req, pass criteria */
    // if (this.editScreenId && this.editScreenPassword && this.choosenLayout) {
    console.log(this.homeService.layoutTypesObject, this.choosenLayout - 1);
    let addScreenObj;
    if (chooseContent) {
      addScreenObj = {
        'screenId': this.editScreenId,
        'password': this.editScreenPassword,
        'layoutTypeId': '',
        'wallId': localStorage.getItem('selectedWallId'),
        'accountId': localStorage.getItem('selectedAccountId'),
        'copyUserId': this.chooseContentFrom[0].userId
      }
    } else {
      addScreenObj = {
        'screenId': this.editScreenId,
        'password': this.editScreenPassword,
        'layoutTypeId': this.homeService.layoutTypesObject[this.choosenLayout - 1].layoutTypeId,
        'wallId': localStorage.getItem('selectedWallId'),
        'accountId': localStorage.getItem('selectedAccountId'),
        'copyUserId': ''
      }
    }
    console.log('screen addScreenObj -', addScreenObj);

    this.homeService.addNewScreenInList(addScreenObj).subscribe(sucess => {
      console.log('screen added -', sucess);

      this.getScreenList().then(sucess => {
        this.screenListArray.forEach(list => {
          console.log(list.screenId == this.editScreenId, list.screenId, this.editScreenId);

          if (list.screenId == this.editScreenId) {
            this.getScreenDetails(list.userId)
          }
        });

        this.chooseContentFrom = [];
        this.editScreenId = '';
        this.editScreenPassword = '';
        this.choosenLayout = 1;
        this.addScreenPanelSuccess = false;
        this.addScreenError = '';
      }).catch(err => {
        console.log('Error or reject from getAcc function', err);
        this.spinner.hide();
        this.addScreenError = '';
      });
    }, error => {
      console.log('Error while adding new screen- ', error);
      this.addScreenError = error.error.errorMessage
      this.spinner.hide();
    });

    // this.screenListArray.push(addScreenObj);
    // console.log('obj', this.screenListArray);

    /* call addScreen API - then call getScreenList API -
    if screenlist len == only 1 get screenId and show that screen- if screen len>1 show previusly selected screen id detail
    */

    // if (this.screenListArray.length == 1) {
    //   this.selectedScreenItem = this.screenListArray[0];
    //   localStorage.setItem('selectedScreenId', this.selectedScreenItem.screenId);
    // }

    // /* add proper layout layout img on added screen list -left */
    // this.bannerImage = false;

    // // last
    // this.getSelectedScreenData(localStorage.getItem('selectedScreenId'));

    // }
  }

  getAvailableWalls() {
    // to get realtime available walls
    this.homeService.getSelectedAccountsWall(localStorage.getItem('selectedAccountId')).subscribe(wallData => {
      // this.selectedScreenData.availableWalls = wallData.walls;
      this.homeService.editScreenDetails.availableWalls = wallData.walls;
    },
      wallDataErr => {
        console.log('wallDataErr', wallDataErr);
      });
  }

  getScreenDetails(screenUserId) {
    this.selectedScreenUserId = screenUserId;
    this.spinner.show();
    this.homeService.getScreenDetails(screenUserId).subscribe((sd) => {
      this.getAvailableWalls();
      this.homeService.originalScreenDetails = JSON.parse(JSON.stringify(sd));
      this.homeService.editScreenDetails = JSON.parse(JSON.stringify(sd));
      this.homeService.editScreenDetails.accountId = localStorage.getItem('selectedAccountId');
      this.homeService.originalScreenDetails.accountId = localStorage.getItem('selectedAccountId');

      this.bannerImage = false;
      this.spinner.hide();
    },
      error => {
        console.log('error while getting sd-', error);
        this.spinner.hide();
      });

    // this.getAvailableWalls();
    // this.homeService.originalScreenDetails = JSON.parse(JSON.stringify(screenDetails));
    // this.homeService.editScreenDetails = JSON.parse(JSON.stringify(screenDetails));
    // this.bannerImage = false;
  }

  selectedClientId(event) {
    let isPresentInSelectedWalls = this.homeService.editScreenDetails.selectedWalls.filter((obj, i) => {
      if (obj.wallId == event) {
        // pop
        this.homeService.editScreenDetails.selectedWalls.splice(i, 1);
      }
      return obj.wallId == event;
    });

    if (isPresentInSelectedWalls.length == 0) {
      let selectedFromAvailableWalls = this.homeService.editScreenDetails.availableWalls.filter(obj => {
        return obj.wallId == event;
      });
      // push
      this.homeService.editScreenDetails.selectedWalls.push(selectedFromAvailableWalls[0]);
    }
  }

  uploadBgImagePopup() {
    const dialogRef = this.dialog.open(BackgroundImageComponent, {
      width: '56.0625rem',
    });

    dialogRef.afterClosed().subscribe(uploaded => {
      if (uploaded) {
        let formData = new FormData();
        formData.append("bgImageFile", uploaded[0].fileName)
        this.homeService.editScreenDetails.bgImageFile = uploaded[0].src // uploaded[0].file // formData// null // uploaded[0].file ;   //
        this.homeService.editScreenDetails.imageFileName = uploaded[0].fileName; //
        this.homeService.editScreenDetails.bgImageFileName = uploaded[0].fileName;
        this.homeService.editScreenDetails.bgImageUrl = uploaded[0].src;
      }
    });
  }

  cancel() {
    const dialogRef = this.dialog.open(CancelComponent, {
      width: '36.0625rem',
    });

    dialogRef.afterClosed().subscribe(uploaded => {
      if (uploaded) {
        this.homeService.editScreenDetails = JSON.parse(JSON.stringify(this.homeService.originalScreenDetails));
      }
    });
  }

  save() {
    this.spinner.show();
    this.homeService.save(this.homeService.editScreenDetails).subscribe(success => {
      this.spinner.hide();
    }, err => {
      console.log('save er', err);
      this.spinner.hide();
    });
  }

  submitAddLayout() {
    console.log('called submit layout');

    this.createScreenFormSubmitted = true;

    // if (this.createScreenForm.valid) {
      this.editScreenId = this.createScreenForm.controls.editScreenId.value;
      this.editScreenPassword = this.createScreenForm.controls.editScreenPassword.value;
      if (this.chooseContentFrom.length != 0) {
        console.log('dropdown is selected');
        this.addScreen(true);
      } else {  // if (this.choosenLayout < 0)
        // check screen id is same or !
        console.log('manual');
        this.addScreen(false);
      }
    // }
  }

  selectedLayoutType(event) {
    this.chooseContentFrom = this.screenListArray.filter(f => {
      return f.userId == event;
    });
    console.log('select layout', this.chooseContentFrom);
  }

  preview() {
    let userId = this.selectedScreenUserId;
    let token = localStorage.getItem('x-auth-token');
    window.open('https://smartwall-dev.andishere.com/dashboard-preview?userId=' + userId + '&token=' + token, "_blank");
  }


  calcHeight() {
    let appHeader = document.getElementById("agency-header");
    let appHeaderheight = appHeader.offsetHeight;

    let saFooter = document.getElementById("agency-footer");
    let saFooterheight = saFooter.offsetHeight;

    let saHeader = document.getElementById("sa-header");
    let saHeaderheight = saHeader.offsetHeight;

    let screenHeight = window.innerHeight;
    let maxHeight = screenHeight - (appHeaderheight + saFooterheight + saHeaderheight);
    // document.getElementById('questionPanelList').style.maxHeight = (maxHeight - 90) + 'px'
  }

  calcHeightAddLabel() {
    let appHeader = document.getElementById("agency-header");
    let appHeaderheight = appHeader.offsetHeight;

    let saFooter = document.getElementById("agency-footer");
    let saFooterheight = saFooter.offsetHeight;

    let saHeader = document.getElementById("sa-header");
    let saHeaderheight = saHeader.offsetHeight;

    let screenHeight = window.innerHeight;
    let maxHeight = screenHeight - (appHeaderheight + saFooterheight + saHeaderheight);

    document.getElementById('screenPanelAddLabel').style.maxHeight = (maxHeight - 170) + 'px';
  }
  calcHeightRight() {
    let appHeader = document.getElementById("agency-header");
    let appHeaderheight = appHeader.offsetHeight;

    let saFooter = document.getElementById("agency-footer");
    let saFooterheight = saFooter.offsetHeight;

    let saHeader = document.getElementById("sa-header");
    let saHeaderheight = saHeader.offsetHeight;

    let screenHeight = window.innerHeight;
    let maxHeight = screenHeight - (appHeaderheight + saFooterheight + saHeaderheight);

    document.getElementById('design-content').style.maxHeight = maxHeight + 'px';

  }

  /* change */
  @HostListener('document:click', ['$event'])
  clickout(event) {
    $(document).mouseup(function (e) {
      let questionPanelOpen = $('.question-panel');
      if (!questionPanelOpen.is(e.target) && questionPanelOpen.has(e.target).length === 0) {
        $(".question-panel").removeClass("success").addClass("closew");
      }
    });
  }

  /* functionality for drag and drop- NEED IMPLEMENTATION */
  drop(event: CdkDragDrop<string[]>) {
  }

}
