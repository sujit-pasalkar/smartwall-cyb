import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service'

@Component({
  selector: 'design-header',
  templateUrl: './design-header.component.html',
  styleUrls: ['./design-header.component.css']
})
export class DesignHeaderComponent implements OnInit {

  // public updateButton;
  // public labelText;
  // public editIcon = false;
  // tempLabel: any;
  // errorInWallName: any;
  // showErrorMessage = false;

  constructor(private router: Router, private commonServiceService: CommonServiceService, private elementRef: ElementRef) {
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
  }

  ngOnInit() {
  }

  navigate(){}


}
