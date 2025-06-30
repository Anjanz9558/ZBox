import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Components'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('../components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'leave',
        loadComponent: () => import('../components/leave-apply/leave-apply.component').then(m => m.LeaveApplyComponent),
        data: {
          title: 'Leave Apply'
        }
      },
       {
        path: 'work-from-home',
        loadComponent: () => import('../components/work-from-home/work-from-home.component').then(m => m.WorkFromHomeComponent),
        data: {
          title: 'Work From Home'
        }
      },
       {
        path: 'short-leave',
        loadComponent: () => import('../components/short-leave/short-leave.component').then(m => m.ShortLeaveComponent),
        data: {
          title: 'Short Leave'
        }
      },

       {
        path: 'manual-attendance',
        loadComponent: () => import('../components/manual-attendance/manual-attendance.component').then(m => m.ManualAttendanceComponent),
        data: {
          title: 'Manual Attendance'
        }
      },
       {
        path: 'summary-report',
        loadComponent: () => import('../components/summary-report/summary-report.component').then(m => m.SummaryReportComponent),
        data: {
          title: 'Summary Report'
        }
      },
       {
      path: 'my-profile/:id',
        loadComponent: () => import('../components/my-profile/my-profile.component').then(m => m.MyProfileComponent),
        data: {
          title: ''
        }
      },
    ]
  },
  // {
  //   path: 'user/login',
  //   loadComponent: () => import('../user-login/user-login.component').then(m => m.UserLoginComponent),
  //   data: {
  //     title: 'Login Page'
  //   }
  // },
];


