import { Routes } from '@angular/router';
import { AdminLayoutComponent, FrontLayoutComponent } from './layout';
import { adminAuthGuard } from './admin/guards/admin-auth.guard';
import { frontAuthGuard } from './frontend/guards/front-auth.guard';
export const routes: Routes = [

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [adminAuthGuard],
    component: AdminLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/components/routes').then((m) => m.routes)
      },
      // {
      //   path: '',
      //   loadChildren: () => import('./admin/configuration/routes').then((m) => m.routes)
      // },
      // {
      //   path: '',
      //   loadChildren: () => import('./admin/catalog/routes').then((m) => m.routes)
      // },
      // {
      //   path: '',
      //   loadChildren: () => import('./admin/customer/routes').then((m) => m.routes)
      // },
      // {
      //   path: '',
      //   loadChildren: () => import('./admin/content-management/routes').then((m) => m.routes)
      // },
      // {
      //   path: '',
      //   loadChildren: () => import('./admin/sales/routes').then((m) => m.routes)
      // },
    ]
  },
  // {
  //   path: '404',
  //   loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
  //   data: {
  //     title: 'Page 404'
  //   }
  // },
  // {
  //   path: '500',
  //   loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
  //   data: {
  //     title: 'Page 500'
  //   }
  // },
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent),
    data: {
      title: 'Login Page'
    }
  },

  // {
  //   path: 'register',
  //   loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
  // { path: '**', redirectTo: '' },

  {
    path: '',
    component: FrontLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        canActivate: [frontAuthGuard],
        loadChildren: () => import('./frontend/components/routes').then((m) => m.routes)
      },

      // {
      //   path: 'admin/configuration',
      //   loadChildren: () => import('./admin/configuration/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'admin/catalog',
      //   loadChildren: () => import('./admin/catalog/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'admin/customers',
      //   loadChildren: () => import('./admin/customer/routes').then((m) => m.routes)
      // },
      // {
      //   path: 'admin/contentManagement',
      //   loadChildren: () => import('./admin/content-management/routes').then((m) => m.routes)
      // },

    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./frontend/user-login/user-login.component').then(m => m.UserLoginComponent),
    data: {
      title: 'Login Page'
    }
  },

  {
    path: '**',
    redirectTo: '404'
  }
];
