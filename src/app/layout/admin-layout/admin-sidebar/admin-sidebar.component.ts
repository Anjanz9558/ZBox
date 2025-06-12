import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../shared/common.service';
// import { StorageService, StorageKey } from '../../shared/storage.service';
import { AdminLayoutService } from '../../../layout/admin-layout/admin-layout.service';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  children: any;
}
declare interface TitlerouteInfo {
  path: string;
  title: string;
}


@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent implements OnInit {
  // [x: string]: any;

  menuItems!: any[];
  id: any;
  toggle: any = {};
  dropdownshow: boolean = false;

  constructor(public commonService: CommonService, public adminLayoutService: AdminLayoutService) {
    // setTimeout(() => {
    //     // this.getsidemenuList();
    //     this.logo = this.commonService.rootData.uploadsUrl + "photos/" + this.storageService.getValue('logo')
    // }, 0);
  }

  ngOnInit() {
    // this.dropdownshow = false;

    this.getsidemenuList();
  }
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('nav-open');
  };
  getsidemenuList() {

    this.adminLayoutService.getSidemenuList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        this.menuItems = Response.data.sort((a: any, b: any) => a.order - b.order);
      } else {
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }


  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  dropdown() {
    this.dropdownshow = false;
    this.dropdownshow = true;
  }
  dropdownclose() {
    this.dropdownshow = false;
  }
}
