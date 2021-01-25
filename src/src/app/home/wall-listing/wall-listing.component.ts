import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonServiceService } from 'src/app/core/common-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationStrategy } from '@angular/common';
import { LoginService } from 'src/app/login/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MessageService } from 'src/app/CommonServices/message.service';
import { SelectClientComponent } from './pop-up/select-client/select-client.component';
import { HomeService } from '../home.service';
import { CreateWallComponent } from './pop-up/create-wall/create-wall.component';
import { DeleteWallComponent } from './pop-up/delete-wall/delete-wall.component';
import { Subscription, Observable } from 'rxjs';
import { ConfirmDeleteWallComponent } from './pop-up/confirm-delete-wall/confirm-delete-wall.component';
import { CancelDeleteComponent } from './pop-up/cancel-delete/cancel-delete.component';

export interface WallList {
  wallId: number;
  wallName: string;
  wallLabel: string;
  activeScreens: number;
  // open: boolean;
  editWallName: boolean;
  editWallLabel: boolean;
}

@Component({
  selector: 'app-wall-listing',
  templateUrl: './wall-listing.component.html',
  styleUrls: ['../home.component.css', './wall-listing.component.css']
})
export class WallListingComponent implements OnInit, AfterViewInit {

  // wallId: number;
  // userId: number;
  // value: string;
  // status: boolean;
  // statusArray: any = [];

  tempArrayForOriginalData: any = [];
  // wallTypes: { label: string; value: { id: number; name: string; status: boolean }; }[];
  // selectedtype: any;
  errMessage: any;
  errMessageShow = false;
  noErrorShow = false;
  noErrMessage: any;
  formData: Object;
  error: boolean;
  errorCode: any;
  errorMesage: any;
  // isPwdExpiryReminderNeedToShow: string;
  passwordBlock: any;

  accountList: any;
  changeAccountSubscription: Subscription;
  selectedAccountId: any;
  // selectedAccountName: string;
  editWallRowindex = null;


  displayedColumns: string[] = ['wallName', 'wallLabel', 'activeScreens', 'actions'];
  dataSource = new MatTableDataSource<WallList>();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialog: MatDialog,
    private router: Router,
    public spinner: NgxSpinnerService,
    private location: LocationStrategy,
    public messageService: MessageService,
    public homeService: HomeService) {
    this.selectedAccountId = localStorage.getItem('selectedAccountId');
    this.homeService.selectedAccountName = localStorage.getItem('selectedAccountName');

    // this.wallTypes = [
    //   { label: 'Enabled', value: { id: 1, name: 'Enabled', status: true } },
    //   { label: 'Disabled', value: { id: 2, name: 'Disabled', status: false } },
    // ];
    // this.selectedtype = this.wallTypes.slice(0, 1).map(a => a.value);

    // check if back or forward button is pressed.
    this.location.onPopState(() => {
      // set isBackButtonClicked to true.
      this.messageService.setBackClicked(true);
      return false;
    });
  }

  ngOnInit() {
    this.spinner.show();

    // change detection subject for change account dropdown option
    this.changeAccountSubscription = this.homeService.getChangeAccountData().subscribe((item: any[]) => {
      this.showWallTable(item[0].value, item[0].label);
    });

    // get client list api. if list > 1 ? nothing : show pop
    this.getAccountList().then(items => {
      if (items) {
        this.selectAccountDailog(items);
      }
    }).catch(err => {
    });
    // show select list pop-up

    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: WallList, filter: string): boolean => {
      return data.wallName.toLowerCase().includes(filter) || data.wallLabel.toLowerCase().includes(filter);
    };
    this.calcHeight();
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  async getAccountList(): Promise<any> {
    try {
      const items = await this.homeService.getAccountList().toPromise();
      return new Promise((resolve, reject) => {
        if (items.accounts.length === 0) {
          this.spinner.hide();
          resolve();
        }

        // add clientList to allClientList array
        this.homeService.allAccountList = [];
        items.accounts.forEach(element => {
          let obj = {
            'value': element.accountId,
            'label': element.accountName
          };
          this.homeService.allAccountList.push(obj);
        });
        this.spinner.hide();
        resolve(items);
      });

    } catch (error) {
      console.log('getAccountList api err:', error);
      this.spinner.hide();
    }
  }

  selectAccountDailog(items) {
    if (items.accounts.length > 1) {

      // skip select client pop-up if already selected
      if (!this.selectedAccountId) {

        // at fresh login render 1st account from list behind the pop-up
        this.showWallTable(items.accounts[0].accountId, items.accounts[0].accountName);

        const dialogRef = this.dialog.open(SelectClientComponent, {
          width: '30rem',
          data: {
            data: this.homeService.allAccountList
          },
        });

        dialogRef.afterClosed().subscribe(
          accountId => {
            // if client selected get that clent data from api
            if (accountId !== '' && accountId !== undefined) {
              // set selected client name to clientName
              let selectedAccountArray = this.homeService.allAccountList.filter(el => el.value === accountId);
              // get walltable data from clientId
              this.showWallTable(accountId, selectedAccountArray[0].label);
            }
          }
        );
      } else {
        this.showWallTable(this.selectedAccountId, this.homeService.selectedAccountName);
      }
    } else if (items.accounts.length === 1) {
      // having only one account in list
      this.showWallTable(items.accounts[0].accountId, items.accounts[0].accountName);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // same pop-up for create a wall and for edit wall(pass wallName and WallLabel)
  createWallPopUp() {
    const dialogRef = this.dialog.open(CreateWallComponent, {
      width: '30rem',
      data: {
        // no data passing for create wall
        data: ''
      }
    });

    // after createWall dilaog close
    dialogRef.afterClosed().subscribe(
      createWallInputs => {
        if (createWallInputs) {
          // refresh wall table data
          this.getAccountList().then(items => {
            this.showWallTable(this.selectedAccountId, this.homeService.selectedAccountName);
          }).catch(err => {
            console.log('Error or reject from getAcc function', err);
          });
        }
      });
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    this.checkInputFieldEvent();
  }

  checkInputFieldEvent() {
    if (this.editWallRowindex != null) {
      let obj = {
        "wallId": this.tempArrayForOriginalData[this.editWallRowindex].wallId,
        "wallName": this.tempArrayForOriginalData[this.editWallRowindex].wallName,
        "accountId": localStorage.getItem('selectedAccountId'),
        "label": this.tempArrayForOriginalData[this.editWallRowindex].wallLabel
      }
      this.spinner.show();
      this.homeService.updateWallName(obj).subscribe(updated => {
        this.showWallTable(this.selectedAccountId, this.homeService.selectedAccountName);
        this.closeWallEditInput();
      }, err => {
        console.log('Error while updating wall name..', err);
        this.spinner.hide();
      });

    }
  }

  closeWallEditInput() {
    this.tempArrayForOriginalData.forEach(element => {
      element.editWallName = false;
      element.editWallLabel = false;
    });
    this.editWallRowindex = null;
  }

  clickWallName(index) {
    if (this.editWallRowindex == null) {
      this.editWallRowindex = index;
      this.tempArrayForOriginalData.forEach(element => {
        element.editWallName = false;
        element.editWallLabel = false;
      });

      this.tempArrayForOriginalData[index].editWallName = !this.tempArrayForOriginalData[index].editWallName;
      this.sortTable();
    }

  }

  clickWallLabel(index) {
    if (this.editWallRowindex == null) {
      this.editWallRowindex = index;

      this.tempArrayForOriginalData.forEach(element => {
        element.editWallName = false;
        element.editWallLabel = false;
      });

      this.tempArrayForOriginalData[index].editWallLabel = !this.tempArrayForOriginalData[index].editWallLabel;
      this.sortTable();
    }
  }

  sortTable() {
    const tempARR = [];
    for (let i = 0; i < this.tempArrayForOriginalData.length; i++) {
      tempARR.push(this.tempArrayForOriginalData[i]);
    }
    this.dataSource.data = tempARR.sort();
  }

  showWallTable(accountId, accountName) {
    if (!accountId) {
    }
    localStorage.setItem('selectedAccountId', accountId);
    localStorage.setItem('selectedAccountName', accountName);
    this.homeService.selectedAccountName = accountName;
    this.selectedAccountId = accountId;

    const tempARR = [];
    this.spinner.show();
    this.homeService.getSelectedAccountsWall(accountId).subscribe(wallData => {
      let temptArr = [];
      temptArr = wallData.walls;

      this.tempArrayForOriginalData = temptArr;

      // // this.dataSource.data = response;
      // if (sType.length === 1) {
      for (let i = 0; i < this.tempArrayForOriginalData.length; i++) {
        // if (sType[0].id === 1 && this.tempArrayForOriginalData[i]['open'] === true) {
        tempARR.push(this.tempArrayForOriginalData[i]);
        // } else if (sType[0].id === 2 && this.tempArrayForOriginalData[i]['open'] === false) {
        //   tempARR.push(this.tempArrayForOriginalData[i]);
        // }
      }
      // } else {
      //   for (let i = 0; i < this.tempArrayForOriginalData.length; i++) {
      //     if (this.tempArrayForOriginalData[i]['open'] === true) {
      //       tempARR.push(this.tempArrayForOriginalData[i]);
      //     } else if (this.tempArrayForOriginalData[i]['open'] === false) {
      //       tempARR.push(this.tempArrayForOriginalData[i]);
      //     }
      //   }
      // }
      this.dataSource.data = tempARR.sort();

      this.spinner.hide();
    },
      wallDataErr => {
        console.log('wallDataErr', wallDataErr);
        this.spinner.hide();
        this.error = true;
        this.errorCode = wallDataErr.error.errorCode;

        // implement this
        // if (this.errorCode === 500) {
        //   const dialogRef = this.dialog.open(ErrorDialogBoxComponent, {
        //     width: '40.5rem'
        //   });
        //   dialogRef.afterClosed().subscribe(result => {

        //   });
        // }
      });
  }

  deleteWallStatus(wallId, wallName) {
    this.spinner.show();
    this.homeService.deleteWallStatus(wallId).subscribe(res => {
      this.spinner.hide();

      this.deleteWall(wallId, wallName);
    },
      error => {
        console.log('Error while getting delete wall status', error.error.errorCode);
        this.spinner.hide();
        if (error.error.errorCode == 401) {
          //open confirm delete popup with res status
          const dialogRef = this.dialog.open(CancelDeleteComponent, {
            width: '36.0625rem',
            data: {
              'statusCode': error.error.errorCode,
              'message': error.error.errorMessage
            }
          });
        }
      }
    );
  }

  deleteWall(wallId, wallName) {
    const dialogRef = this.dialog.open(DeleteWallComponent, {
      width: '36.0625rem',
      data: {
        'wallName': wallName,
      }
    });

    dialogRef.afterClosed().subscribe(deleteRes => {
      if (deleteRes === true) {
        this.spinner.show();

        this.homeService.deleteWall(wallId).subscribe(response => {
          this.showWallTable(this.selectedAccountId, this.homeService.selectedAccountName);
        },
          error => {
            this.spinner.hide();
            console.log('delete wall err', error);

          }
        );
      }
    });
  }

  editWall(wallName, wallId) {
    let passObject = {
      'wallId': wallId,
      'wallName': wallName,
      'wallLabel': ''
    };
    this.router.navigate(['wall/wall-design'], { state: passObject });
  }

  onChange(ob: MatSlideToggleChange, wallId, status) {
    this.spinner.show();
    // const dialogRef = this.dialog.open(WallStatusComponent, {
    //   width: '36.0625rem',
    //   data: status
    // });
    // this.spinner.hide();

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result == true) {
    //     this.service.updateWallStatus(ob.checked, wallId).subscribe(response => {
    //       if (this.selectedtype.length === 1 && ob.checked === true) {
    //         this.selectedtype = this.wallTypes.slice(1).map(a => a.value);
    //       } else if (this.selectedtype.length === 1 && ob.checked === false) {
    //         this.selectedtype = this.wallTypes.slice(0, 1).map(a => a.value);
    //       } else {
    //         this.selectedtype = this.wallTypes.slice(0, 2).map(a => a.value);
    //       }
    //       this.getWall(this.accountId, this.selectedtype);
    //     },
    //     );
    //   }
    //   else {
    //     this.getWall(this.accountId, this.selectedtype);

    //   }
    // }
    // );
  }

  calcHeight() {
    let appHeader = document.getElementById("agency-header");
    let appHeaderheight = appHeader.offsetHeight;
    let appHeaderWidth = appHeader.offsetWidth;

    let saFooter = document.getElementById("agency-footer");
    let saFooterheight = saFooter.offsetHeight;
    let saFooterWidth = saFooter.offsetWidth;

    let wallHeader = document.getElementById("wall-page-header");
    let wallHeaderheight = wallHeader.offsetHeight;
    let wallHeaderWidth = wallHeader.offsetWidth;

    let wallStatus = document.getElementById("wall-status");
    let wallStatusheight = wallStatus.offsetHeight;
    let wallStatusWidth = wallStatus.offsetWidth;

    let screenHeight = window.innerHeight;
    let maxHeight = screenHeight - (appHeaderheight + saFooterheight + wallStatusheight);

    document.getElementById('matTableContainter').style.maxHeight = (maxHeight - 200) + 'px';
  }

}
