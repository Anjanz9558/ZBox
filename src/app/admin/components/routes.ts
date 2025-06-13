

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Dashboard',
        },
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
                data: {
                    title: 'dashbaord List',
                },
            },
             {
                path: 'employee-management/role-master',
                loadComponent: () =>
                    import('./employee-management/role-master/role-master.component').then((m) => m.RoleMasterComponent),
                data: {
                    title: 'role master',
                },
            },
              {
                path: 'employee-management/designation-master',
                loadComponent: () =>
                    import('./employee-management/designation-master/designation-master.component').then((m) => m.DesignationMasterComponent),
                data: {
                    title: 'designation master',
                },
            },
               {
                path: 'employee-management/technology-master',
                loadComponent: () =>
                    import('./employee-management/department-master/department-master.component').then((m) => m.DepartmentMasterComponent),
                data: {
                    title: 'department master',
                },
            },
                 {
                path: 'setting/menu-master',
                loadComponent: () =>
                    import('./setting/menu-master/menu-master.component').then((m) => m.MenuMasterComponent),
                data: {
                    title: 'menu master',
                },
            },
            // {
            //   path: 'order',
            //   data: {
            //     title: 'Orders',
            //   },
            //   children: [
            //     {
            //       path: '',
            //       redirectTo: 'List',
            //       pathMatch: 'full',
            //     },
            //     {
            //       path: 'List',
            //       loadComponent: () =>
            //         import('./orders/orders.component').then((m) => m.OrdersComponent),
            //       data: {
            //         title: 'Order List',
            //       },
            //     },
            //     {
            //       path: 'Create',
            //       loadComponent: () =>
            //         import('./orders/orders.component').then((m) => m.OrdersComponent),
            //       data: {
            //         title: 'Order List',
            //       },
            //     },
            //     {
            //       path: 'Edit/:id',
            //       loadComponent: () =>
            //         import('./orders/orders.component').then((m) => m.OrdersComponent),
            //       data: {
            //         title: 'Edit Order',
            //       },
            //     },
            //     {
            //       path: 'AddressEdit',
            //       loadComponent: () =>
            //         import('./orders/orders.component').then((m) => m.OrdersComponent),
            //       data: {
            //         title: 'Edit Order Address',
            //       },
            //     },

            //   ],
            // },

        ],
    },
];
