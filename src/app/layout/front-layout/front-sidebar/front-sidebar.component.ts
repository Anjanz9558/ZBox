import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FrontLayoutService } from '../../front-layout/front-layout.service';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';


declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/admin/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/admin/user-profile', title: 'User Profile', icon: 'person', class: '' },
  { path: '/admin/table-list', title: 'Table List', icon: 'content_paste', class: '' },
  { path: '/admin/typography', title: 'Typography', icon: 'library_books', class: '' },
  { path: '/admin/icons', title: 'Icons', icon: 'bubble_chart', class: '' },
  { path: '/admin/maps', title: 'Maps', icon: 'location_on', class: '' },
  { path: '/admin/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/admin/upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];


@Component({
  selector: 'app-front-sidebar',
  imports: [CommonModule,RouterLink],
  templateUrl: './front-sidebar.component.html',
  styleUrl: './front-sidebar.component.scss'
})
export class FrontSidebarComponent implements OnInit {
  menuItems: any[]=[];
  profileImage = "";
  userName: string = "";
  empTaskReport: boolean = false;
  toggle: any = {};
  assignProjectListShowHide: boolean =false;

  constructor(private router: Router, private frontLayoutService: FrontLayoutService) {
    if (router.url.includes('leave') || router.url.includes('short-leave') || router.url.includes('work-from-home')) {
      this.toggle[0] = true;
    }
    else if (router.url.includes('employee-wise-assign-task-list') || router.url.includes('task-board') || router.url.includes('employee-task-report')) {
      this.toggle[1] = true;
    }
    else if (router.url.includes('assign-project-list') || router.url.includes('employee-short-leave') || router.url.includes('employee-work-from-home') || router.url.includes('employee-leave-list')) {
      this.toggle[2] = true;
    }
  }


ngOnInit() {
  this.getUserActiveList();
  this.getProjectList();
  this.menuItems = ROUTES.filter(menuItem => menuItem);

  const loginUserDataString = localStorage.getItem("LoginUserData");

  if (loginUserDataString) {
    const LoginUserData = JSON.parse(loginUserDataString);

    this.profileImage = environment.uploadedUrl + (LoginUserData?.profile_image || 'default.jpg');
    this.userName = (LoginUserData?.firstName || '') + ' ' + (LoginUserData?.lastName || '');
  } else {
    // Handle when localStorage data is missing or corrupted
    this.profileImage = 'assets/images/default-user.png';
    this.userName = 'Guest User';
  }

  this.getPendingCountData();
}

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('nav-open');
  };
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  getProjectList() {
    const loginUserDataString = localStorage.getItem("LoginUserData");

    if (!loginUserDataString) {
      // handle the case when LoginUserData is not in localStorage
      this.assignProjectListShowHide = false;
      return;
    }

    const loginUserData = JSON.parse(loginUserDataString);

    const Obj = {
      employeeId: loginUserData.employeeId
    };
    this.frontLayoutService.getProjectForTaskAssingList(Obj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.assignProjectListShowHide = true
      } else {
        this.assignProjectListShowHide = false
      }
      //for select sub industry step
    }, (error) => {

      //console.log(error.error.Message);
    });
  }
  logout() {

    localStorage.clear();
    this.router.navigate(['login']);
  }

  toggleClose() {
    this.toggle[0] = false;
    this.toggle[1] = false;
    this.toggle[2] = false
  }

  getUserActiveList() {

    this.frontLayoutService.assignPersonListForTask().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        if (Response.data.length > 1) {
          this.empTaskReport = false
        }
        else {
          this.empTaskReport = true
        }
      }
    })
  }


  pendingDataCount: any;


  getPendingCountData() {
    this.frontLayoutService.pendingDataCount().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.pendingDataCount = Response.data;
      }
    })
  }

}

