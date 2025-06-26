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
                    title: 'Dashboard',
                },
            },
            {
                path: 'employee-management/role-master',
                loadComponent: () =>
                    import('./employee-management/role-master/role-master.component').then((m) => m.RoleMasterComponent),
                data: {
                    title: 'Role Master',
                },
            },
            {
                path: 'employee-management/designation-master',
                loadComponent: () =>
                    import('./employee-management/designation-master/designation-master.component').then((m) => m.DesignationMasterComponent),
                data: {
                    title: 'Designation Master',
                },
            },
            {
                path: 'employee-management/department-master',
                loadComponent: () =>
                    import('./employee-management/department-master/department-master.component').then((m) => m.DepartmentMasterComponent),
                data: {
                    title: 'Department Master',
                },
            },
            {
                path: 'setting/menu-master',
                loadComponent: () =>
                    import('./setting/menu-master/menu-master.component').then((m) => m.MenuMasterComponent),
                data: {
                    title: 'Menu Master',
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
                    title: 'Add Employee',
                },
            },
            {
                path: 'employee-management/edit-employee/:id',
                loadComponent: () =>
                    import('./employee-management/add-new-user/add-new-user.component').then((m) => m.AddNewUserComponent),
                data: {
                    title: 'Update Employee',
                },
            },
            {
                path: 'profile/:id',
                loadComponent: () =>
                    import('./employee-management/add-new-user/add-new-user.component').then((m) => m.AddNewUserComponent),
                data: {
                    title: 'Profile',
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
                path: 'setting/ip-address-master',
                loadComponent: () =>
                    import('./Setting/ip-address-master/ip-address-master.component').then((m) => m.IpAddressMasterComponent),
                data: {
                    title: 'IP Address Master',
                },
            },
            {
                path: 'setting/general-settings',
                loadComponent: () =>
                    import('./Setting/general-setting/general-setting.component').then((m) => m.GeneralSettingComponent),
                data: {
                    title: 'General Setting',
                },
            },
            {
                path: 'company-management/company-list',
                loadComponent: () =>
                    import('./company management/company-management/company-management.component').then((m) => m.CompanyManagementComponent),
                data: {
                    title: 'Company Management',
                },
            },
            {
                path: 'company-management/add-company-details',
                loadComponent: () =>
                    import('./company management/company-master/company-master.component').then((m) => m.CompanyMasterComponent),
                data: {
                    title: 'Add Company',
                },
            },
            {
                path: 'company-management/edit-company-details/:id',
                loadComponent: () =>
                    import('./company management/company-master/company-master.component').then((m) => m.CompanyMasterComponent),
                data: {
                    title: 'Update Company',
                },
            },
            {
                path: 'company-management/company-document-master',
                loadComponent: () =>
                    import('./company management/company-doc-master/company-doc-master.component').then((m) => m.CompanyDocMasterComponent),
                data: {
                    title: 'Company Documents',
                },
            },
            {
                path: 'employee-management/document-type-master',
                loadComponent: () =>
                    import('./employee-management/document-type-master/document-type-master.component').then((m) => m.DocumentTypeMasterComponent),
                data: {
                    title: 'Document Type Master',
                },
            },
            {
                path: 'employee-management/salary-generation',
                loadComponent: () =>
                    import('./employee-management/salary-generation/salary-generation.component').then((m) => m.SalaryGenerationComponent),
                data: {
                    title: 'Salary Generation',
                },
            },
            {
                path: 'employee-management/monthly-salary-details',
                loadComponent: () =>
                    import('./employee-management/monthly-salary-details/monthly-salary-details.component').then((m) => m.MonthlySalaryDetailsComponent),
                data: {
                    title: 'Monthly Salary Details',
                },
            },
            {
                path: 'leave-management/work-from-home-list',
                loadComponent: () =>
                    import('./leave-management/work-from-home/work-from-home.component').then((m) => m.WorkFromHomeComponent),
                data: {
                    title: 'WFH List',
                },
            },
            {
                path: 'leave-management/leave-list',
                loadComponent: () =>
                    import('./leave-management/leave-list/leave-list.component').then((m) => m.LeaveListComponent),
                data: {
                    title: 'Leave List',
                },
            },
            {
                path: 'leave-management/holiday-list',
                loadComponent: () =>
                    import('./leave-management/holiday-list/holiday-list.component').then((m) => m.HolidayListComponent),
                data: {
                    title: 'Holiday List',
                },
            },
            {
                path: 'leave-management/short-leave',
                loadComponent: () =>
                    import('./leave-management/short-leave/short-leave.component').then((m) => m.ShortLeaveComponent),
                data: {
                    title: 'Short Leave',
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
            {
                path: 'change-password/:id',
                loadComponent: () =>
                    import('./change-password/change-password.component').then((m) => m.ChangePasswordComponent),
                data: {
                    title: 'Change Password',
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
