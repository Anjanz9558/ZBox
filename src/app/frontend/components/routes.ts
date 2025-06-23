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
        redirectTo: '',
        pathMatch: 'full'
      },
      // {
      //   path: '',
      //   loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
      //   data: {
      //     title: 'Home'
      //   }
      // },
      {
        path: 'dashboard',
        loadComponent: () => import('../components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: {
          title: 'Leave Apply'
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


