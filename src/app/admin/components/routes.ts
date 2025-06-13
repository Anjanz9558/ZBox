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
                path: 'employee-list',
                loadComponent: () =>
                    import('./employee_management/employee-list/employee-list.component').then((m) => m.EmployeeListComponent),
                data: {
                    title: 'Employee List',
                },
            },
            {
                path: 'add-new-employee',
                loadComponent: () =>
                    import('./employee_management/add-new-user/add-new-user.component').then((m) => m.AddNewUserComponent),
                data: {
                    title: 'Employee List',
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
