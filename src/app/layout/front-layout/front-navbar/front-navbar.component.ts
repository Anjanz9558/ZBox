import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../front-sidebar/front-sidebar.component';
import { CommonModule, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FrontLayoutService } from '../../front-layout/front-layout.service';
import { SocketIOService } from '../../front-layout/socket-io.service';
import { CommonService } from '../../../shared/common.service';
import { NiceDateFormatPipe } from 'src/app/shared/pipe/common.pipe';
declare const $: any;
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-front-navbar',
  imports: [NiceDateFormatPipe,CommonModule,InfiniteScrollModule,RouterLink],
  templateUrl: './front-navbar.component.html',
  styleUrl: './front-navbar.component.scss'
})
export class FrontNavbarComponent implements OnInit {
  private listTitles!: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  userName: string = "";
  profileImage = "";
  lastPage: boolean = false;
  notificationList: any[] = [];
  notificationPageNumber = 0;
  isViewCount = 0;
  noNotificationData: boolean = false;
  dropdownOpen: any;

  constructor(location: Location, private element: ElementRef, public commonService: CommonService, private router: Router, private socketIOService: SocketIOService, private frontLayoutService: FrontLayoutService) {
    this.location = location;
    this.sidebarVisible = false;
    this.socketIOService.socketConnectionEstablish();
    let self = this
    $(document).ready(function () {
      $(".notificationDropDown").click(function (e: any) {
        setTimeout(() => {
          self.scrollToTop()
          console.log("event", e.currentTarget.ariaExpanded);
          self.dropdownOpen = e.currentTarget.ariaExpanded
          if (e.currentTarget.ariaExpanded == "true") {
            self.isViewUpdate()
          }
        }, 200);
      });
    });
  }


  private scrollToTop(): void {
    // setTimeout(() => {
    const lastMessage = document.getElementById(`${'notificationId-' + 0}`);
    if (lastMessage) {
      lastMessage.scrollIntoView();
    }
    // }, 200)
  }

  onScroll(): void {
    if (this.lastPage == false) {
      let Obj = {
        pageNumber: this.notificationPageNumber
      }
      this.frontLayoutService.getNotification(Obj).subscribe((Response: any) => {
        if (Response.meta.code == 200) {
          this.notificationList = this.notificationList.concat(Response.data.notifications);
          if (!!Response.data.nextPage) {
            this.notificationPageNumber = Response.data.nextPage;
            this.lastPage = Response.data.isLastPage;
          }
          else {
            this.lastPage = Response.data.isLastPage;
          }
          this.noNotificationData = false;
        } else {
          this.noNotificationData = true;
        }
      },
        (error: any) => {
          console.log(error.error.Message);
        }
      );
    }

  }

  isViewUpdate() {
    this.frontLayoutService.isViewNotification().subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        this.notificationList.map((x: any) => {
          x.isView = true;
        })

        if (this.dropdownOpen == "false") {
          let count = 0;
          this.notificationList.filter((x: any) => {
            if (x.isView == false) {
              count++;
            }
          })
          this.isViewCount = count
        }
        else {
          this.isViewCount = 0
        }
      }
    })
  }

  routingFromNotificationType(type: any) {
    if (type == 3) {
      this.router.navigate(['admin/tickets/tickets-list'])
    }
    else if (type == 1) {
      this.router.navigate(['admin/employee-leave-list'])
    }
  }

  isReadUpdate(type: any, id: any, index: any) {
    let obj = {
      _id: id
    }
    this.frontLayoutService.isReadNotification(obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.notificationList[index].isRead = true;
        this.routingFromNotificationType(type);
      }
    })
  }

  ngOnInit() {
    const loginUserDataStr = localStorage.getItem("LoginUserData");

    if (!loginUserDataStr) {
      console.error('LoginUserData not found in localStorage');
      return;
    }

    const LoginUserData = JSON.parse(loginUserDataStr);
    this.userName = LoginUserData?.firstName + ' ' + LoginUserData?.lastName;
    this.profileImage = environment.uploadedUrl + LoginUserData?.profile_image;
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    const body = document.getElementsByTagName('body')[0];
    this.router.events.subscribe((event) => {
      body.classList.remove('nav-open')
      //this.sidebarClose();
      var $layer: any = document.getElementsByClassName('close-layer')[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });

    this.getNotificationList();

    this.socketIOService.receiveNotification().subscribe((response: any) => {
      console.log("notification", response);
      this.notificationList.push(response);
      this.notificationList.sort((a: any, b: any) => this.sortDate(a.createdAt, b.createdAt))
      this.onBeforeOpen()
      let count = 0;
      this.notificationList.filter((x: any) => {
        if (x.isView == false) {
          count++;
        }
      })
      this.isViewCount = count;
      if (this.dropdownOpen == "true") {
        if (this.isViewCount > 0) {
          this.isViewUpdate()
        }
      }
    })
  }
  sortDate(date1: any, date2: any) {
    let fDate = new Date(date1);
    let lDate = new Date(date2);
    return (fDate > lDate ? -1 : 1) * (true ? 1 : -1)
  }
  onBeforeOpen() {
    let audio: HTMLAudioElement = new Audio('assets/audio/MessageTone.mp3');
    audio.play();
  }



  getNotificationList() {
    this.notificationPageNumber = 0
    this.notificationList = []
    let obj = {
      pageNumber: this.notificationPageNumber
    }
    this.frontLayoutService.getNotification(obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.notificationList = Response.data.notifications;
        let count = 0;
        this.notificationList.filter((x: any) => {
          if (x.isView == false) {
            count++;
          }
        })
        this.isViewCount = count
        if (!!Response.data.nextPage) {
          this.notificationPageNumber = Response.data.nextPage;
          this.lastPage = Response.data.isLastPage;
        } else {
          this.lastPage = Response.data.isLastPage;
        }
        this.noNotificationData = false;
      }
      else {
        this.noNotificationData = true;
      }
    })
  }

  logout() {

    localStorage.clear();
    this.router.navigate(['/admin-login/login']);
  }
  myprofile() {
    const userDataStr = localStorage.getItem("LoginUserData");

    if (!userDataStr) {
      console.error('LoginUserData not found in localStorage');
      return;
    }

    const loginUserData = JSON.parse(userDataStr);
    const empId = loginUserData?.employeeId;

    if (!empId) {
      console.error('Employee ID not found in LoginUserData');
      return;
    }

    this.router.navigate(['/admin/my-profile/' + empId]);
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    // setTimeout(function () {
    //     toggleButton.classList.add('toggled');
    // }, 500);

    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  // sidebarClose() {
  //     const body = document.getElementsByTagName('body')[0];
  //     this.toggleButton.classList.remove('toggled');
  //     this.sidebarVisible = false;
  //     body.classList.remove('nav-open');
  // };
  // sidebarToggle() {
  //     // const toggleButton = this.toggleButton;
  //     // const body = document.getElementsByTagName('body')[0];
  //     var $toggle = document.getElementsByClassName('navbar-toggler')[0];

  //     if (this.sidebarVisible === false) {
  //         this.sidebarOpen();
  //     } else {
  //         this.sidebarClose();
  //     }
  //     const body = document.getElementsByTagName('body')[0];

  //     if (this.mobile_menu_visible == 1) {
  //         // $('html').removeClass('nav-open');
  //         body.classList.remove('nav-open');
  //         if ($layer) {
  //             $layer.remove();
  //         }
  //         setTimeout(function() {
  //             $toggle.classList.remove('toggled');
  //         }, 400);

  //         this.mobile_menu_visible = 0;
  //     } else {
  //         setTimeout(function() {
  //             $toggle.classList.add('toggled');
  //         }, 430);

  //         var $layer = document.createElement('div');
  //         $layer.setAttribute('class', 'close-layer');


  //         if (body.querySelectorAll('.main-panel')) {
  //             document.getElementsByClassName('main-panel')[0].appendChild($layer);
  //         }else if (body.classList.contains('off-canvas-sidebar')) {
  //             document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
  //         }

  //         setTimeout(function() {
  //             $layer.classList.add('visible');
  //         }, 100);

  //         $layer.onclick = function() { //asign a function
  //           body.classList.remove('nav-open');
  //           this.mobile_menu_visible = 0;
  //           $layer.classList.remove('visible');
  //           setTimeout(function() {
  //               $layer.remove();
  //               $toggle.classList.remove('toggled');
  //           }, 400);
  //         }.bind(this);

  //         body.classList.add('nav-open');
  //         this.mobile_menu_visible = 1;

  //     }
  // };

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    if (titlee.charAt(0) === '?') {
      titlee = titlee.slice(1);
    }

    if (titlee.includes('dashboard')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Dashboard'
      };
    }
    else if (titlee.includes('manual-attendance')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Manual Attendance'
      };
    }
    else if (titlee.includes('task-details')) {
      return {
        pastUrl: 'task-management/assign-project-list',
        pastLinkName: 'Assign Project List /',
        currentPageName: 'Task Details'
      };
    }
    else if (titlee.includes('task-management/add-task')) {
      let projectId = localStorage.getItem("projectId");
      return {
        pastUrl: 'task-management/task-details/' + projectId,
        pastLinkName: 'Task Details /',
        currentPageName: 'Add Task'
      };
    }
    else if (titlee.includes('task-management/view-assign-task')) {
      let projectId = localStorage.getItem("projectId");
      return {
        pastUrl: 'task-management/task-details/' + projectId,
        pastLinkName: ' Task Details /',
        currentPageName: 'View Task Details'
      };
    }
    else if (titlee.includes('task-management/update-assign-task')) {
      let projectId = localStorage.getItem("projectId");
      return {
        pastUrl: 'task-management/task-details/' + projectId,
        pastLinkName: 'Task Details /',
        currentPageName: 'Edit Task'
      };
    }
    else if (titlee.includes('assign-project-list')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Assign Project List'
      };
    }
    else if (titlee.includes('task-management/employee-wise-assign-task-list')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Employee Wise Assign Task List'
      };
    }
    else if (titlee.includes('task-board')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Task Board'
      };
    }
    else if (titlee.includes('summary-report')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Attendance Report'
      };
    }
    else if (titlee.includes('view-ticket')) {
      return {
        pastUrl: 'tickets/tickets-list',
        pastLinkName: 'Ticket List /',
        currentPageName: 'View Ticket'
      };
    }
    else if (titlee.includes('tickets-list')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Ticket List'
      };
    }
    else if (titlee.includes('add-task-report')) {
      return {
        pastUrl: 'task-report',
        pastLinkName: 'My Work Report /',
        currentPageName: 'Add Work Report'
      };
    }
    else if (titlee.includes('employee-short-leave')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Employee Short Leave'
      };
    }
    else if (titlee.includes('short-leave')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Short Leave'
      };
    }
    else if (titlee.includes('employee-task-report')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Employee Task Report'
      };
    }
    else if (titlee.includes('interview-details')) {
      return {
        pastUrl: 'interview',
        pastLinkName: 'Interview /',
        currentPageName: 'Interview Details'
      };
    }
    else if (titlee.includes('interview')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Interview'
      };
    }
    else if (titlee.includes('task-report')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'My Work Report'
      };
    }
    else if (titlee.includes('my-profile')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'My Profile'
      };
    }
    else if (titlee.includes('assign-user-status')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Change Employee Status'
      };
    }
    else if (titlee.includes('employee-leave-list')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Employee Leave List'
      };
    }
    else if (titlee.includes('employee-work-from-home')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Employee Work From Home List'
      };
    }
    else if (titlee.includes('work-from-home')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Work From Home List'
      };
    }
    else if (titlee.includes('leave')) {
      return {
        pastUrl: '#',
        pastLinkName: '',
        currentPageName: 'Leave'
      };
    }
    return {
      pastUrl: '#',
      pastLinkName: '',
      currentPageName: 'Unknown Page'
    };
  }
}
