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

export const TITLEROUTES: TitlerouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard' },
    { path: '/admin/setting/role-master', title: 'Role Master' },
    { path: '/admin/setting/menu-master', title: 'Menu Master' },
    { path: '/admin/setting/role-wise-menu', title: 'Role Wise Menu' },
    { path: '/admin/setting/user-wise-menu', title: 'User Wise Menu' },
    { path: '/admin/setting/general-setting', title: 'General Setting' },

    { path: '/admin/setting/ip-address-save', title: 'IP Address Master' },

    { path: '/admin/product/product-list', title: 'Product List' },
    { path: '/admin/product/add-new-product', title: 'Add New Product' },
    { path: '/admin/user/user-list', title: 'Admin User List' },
    { path: '/admin/user/customer-list', title: 'Customer List' },
    { path: '/admin/user/add-new-user', title: 'Add New Admin User' },
    { path: '/admin/banner/banner-list', title: 'Banner List' },
    { path: '/admin/banner/add-new-banner', title: 'Add New Banner' },
    { path: '/admin/blog/blog-list', title: 'Blog List' },
    { path: '/admin/blog/add-new-blog', title: 'Add New Blog' },
    { path: '/admin/news/news-list', title: 'News List' },
    { path: '/admin/news/add-new-news', title: 'Add New News' },
    { path: '/admin/content/content', title: 'Content' },
    { path: '/admin/order/order-list', title: 'Order List' },

    { path: '/admin/voucher/product/add-new-sell-person-voucher', title: 'Add New Sell Person Voucher' },
    { path: '/admin/voucher/product/add-new-custom-voucher', title: 'Add New Custom Voucher' },
    { path: '/admin/voucher/product/sell-person-voucher-list', title: 'Sell Person Voucher List' },
    { path: '/admin/voucher/product/custom-voucher-list', title: 'Custom Voucher List' },
    { path: '/admin/product/demo-list', title: 'Request Demo List' },
    { path: '/admin/spectro/spectro-list', title: 'Spectro List' },
    { path: '/admin/service-manager/all-request-list', title: 'Service All List' },
    { path: '/admin/service-manager/new-request-list', title: 'Service New List' },
    { path: '/admin/service-manager/pending-request-list', title: 'Service Pending List' },
    { path: '/admin/service-manager/closed-request-list', title: 'Service Closed List' },
    { path: '/admin/service-engineer/assign-service-list', title: 'Service Assign List' },
    { path: '/admin/service-engineer/pending-service-list', title: 'Service Pending List' },
    { path: '/admin/service-engineer/closed-service-list', title: 'Service Closed List' },
    { path: '/admin/oem-desk/oem-desk-list', title: 'OEM Desk List' }
];

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
