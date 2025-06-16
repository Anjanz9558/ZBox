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
                }
            },
            {
                path: 'employee-management/employee-list',
                loadComponent: () =>
                    import('./employee-management/employee-list/employee-list.component').then((m) => m.EmployeeListComponent),
                data: {
                    title: 'Employee List',
                },
            },
            {
                path: 'employee-management/add-new-employee',
                loadComponent: () =>
                    import('./employee-management/add-new-user/add-new-user.component').then((m) => m.AddNewUserComponent),
                data: {
                    title: 'Employee List',
                },
            },
            {
                path: 'employee-management/edit-employee/:id',
                loadComponent: () =>
                    import('./employee-management/add-new-user/add-new-user.component').then((m) => m.AddNewUserComponent),
                data: {
                    title: 'Employee List',
                },
            },
            {
                path: 'setting/role-wise-menu',
                loadComponent: () =>
                    import('./Setting/role-wise-menu/role-wise-menu.component').then((m) => m.RoleWiseMenuComponent),
                data: {
                    title: 'Role Wise Menu',
                },
            },
            {
                path: 'attendance-management/attendance-list',
                loadComponent: () =>
                    import('./attendance-management/attendance-list/attendance-list.component').then((m) => m.AttendanceListComponent),
                data: {
                    title: 'Attendance List',
                },
            },
            {
                path: 'attendance-management/pending-list',
                loadComponent: () =>
                    import('./attendance-management/pending-attendance/pending-attendance.component').then((m) => m.PendingAttendanceComponent),
                data: {
                    title: 'Pending Attendance',
                },
            },
            {
                path: 'attendance-management/attendance-consolidate-report',
                loadComponent: () =>
                    import('./attendance-management/attendance-consolidation/attendance-consolidation.component').then((m) => m.AttendanceConsolidationComponent),
                data: {
                    title: 'Attendance Consolidation Report',
                },
            },
            // {
            //     path: 'employee-management/document-type-master',
            //     loadComponent: () =>
            //         import('./employee-management/document-master/document-master.component').then((m) => m.DocumentMasterComponent),
            //     data: {
            //         title: 'Document Type Master',
            //     },
            // },
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
