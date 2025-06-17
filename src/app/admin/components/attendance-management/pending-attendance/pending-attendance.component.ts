import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditorModule } from '@tinymce/tinymce-angular';
declare const $: any;
import moment from 'moment';
import { NgOtpInputComponent } from 'ng-otp-input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { CommonService } from '../../../../shared/common.service';
import { ConfirmDirective } from '../../../../shared/directives/common.directive';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, GroupByPipe, NiceTimePipe } from '../../../../shared/pipe/common.pipe';
import { StorageService } from '../../../../shared/storage.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-pending-attendance',
  imports: [
    CommonModule,
    // PipeModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    // Ng2SearchPipeModule,
    HttpClientModule,
    AngularEditorModule,
    MatAutocompleteModule,
    MatSortModule,
    EditorModule,
    NgOtpInputComponent,
    NgSelectModule,
    NgxMatSelectSearchModule,
    ConfirmDirective,
    NgxPaginationModule,
    // FullCalendarModule,
    // NgbModule,
    // NgbDatepickerModule,
    // NgxMaskModule,
    NiceTimePipe,
    GroupByPipe,
    ArraySortPipeDesc,
    ArraySortPipeAsc,
    ArraySortPipeSimple,
    FilterPipe,
  ],

  standalone: true,
  templateUrl: './pending-attendance.component.html',
  styleUrl: './pending-attendance.component.scss'
})
export class PendingAttendanceComponent implements OnInit {
  statusList: any = [];
  allPendingAttendanceList: any[] = [];
  isView: Boolean = false;
  isCreated: Boolean = false;
  isUpdated: Boolean = false;
  isDeleted: Boolean = false;
  pendingAttendanceSelectedId: boolean = false;
  pendingStatusChange: any[] = [];
  selectedPendingAttIds: any[] = [];
  checkedSalaryIds: any[] = [];
  attendanceTypeStatus: any = null;

  monthArray = [
    { value: 1, month: 'January' },
    { value: 2, month: 'February' },
    { value: 3, month: 'March' },
    { value: 4, month: 'April' },
    { value: 5, month: 'May' },
    { value: 6, month: 'June' },
    { value: 7, month: 'July' },
    { value: 8, month: 'August' },
    { value: 9, month: 'September' },
    { value: 10, month: 'October' },
    { value: 11, month: 'November' },
    { value: 12, month: 'December' },
  ];
  yearArray: any[] = [];
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear()
  attendanceStatusType = [
    { name: "All", value: 0 },
    { name: "Pending", value: 1 },
    { name: "Approved", value: 2 },
    { name: "Rejected", value: 3 },
    { name: "Cancled", value: 4 }
  ]
  constructor(public commonService: CommonService, public route: ActivatedRoute, public storageService: StorageService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder, private router: Router) {
    let pagePermission = { module: "pendingattendancelist" }
    this.adminLayoutService.getpagePermission(pagePermission).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.isView = Response.data.isView;
        this.isCreated = Response.data.isCreated;
        this.isUpdated = Response.data.isUpdated;
        this.isDeleted = Response.data.isDeleted;
        if (this.isView === false) {
          this.router.navigate(['admin/dashboard']);
        }

      }
    }, (error: any) => {
      console.log(error.error.Message);
    });
  }

  dayTypeList = [
    { name: "First Half", value: 1 },
    { name: "Second Half", value: 2 },
    { name: "Full Day", value: 3 },
    { name: "Leave", value: 4 },
  ]

  ngOnInit() {
    this.getPendingAttendanceList();
    this.getYear()
    this.defaultForm()
    this.statusList = [
      { id: 1, label: 'pending' },
      { id: 2, label: 'approve' },
      { id: 3, label: 'reject' }
    ];
    this.mySelect = 5;
    this.l = 10;
    this.attendanceTypeStatus = this.attendanceStatusType[1].value;
    if (this.router.url.includes('leave-list-search')) {
      this.route.queryParams.subscribe((x: any) => {
        this.month = parseInt(x.month);
        this.year = x.year;
        this.searchTerm = x.name;
        this.attendanceTypeStatus = 2
      });
    }
  }

  getYear() {
    let CurrentYear = new Date().getFullYear()

    let startYear = 2019;

    while (startYear <= CurrentYear) {
      this.yearArray.push(startYear++)
    }
    console.log(this.yearArray);

    return this.yearArray.reverse()
  }

  noData: boolean = false;
  pendingAttendanceList: any[] = [];
  l: number = 0;
  p: number = 1;
  itemsPage: any;
  mySelect = 0;
  submitterSearchFormData: boolean = false;
  searchForm!: FormGroup;
  searchTerm = '';

  defaultForm() {
    this.searchForm = this.fb.group({
      fromDate: [new Date(moment(new Date()).subtract(1, 'month').format('YYYY-MM-DD'))],
      toDate: [new Date()]
    });
  }

  searchFilter(value: string): void {
    this.allPendingAttendanceList = this.pendingAttendanceList.filter((val) => JSON.stringify(val.fullName).toLowerCase().includes(value.toLowerCase()))
    this.p = 1;
    if (this.allPendingAttendanceList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  onfromDateChange() {
    this.searchForm.controls['toDate'].setValue('');
  }


  itemsPerPage(): void {
    this.l = this.mySelect;
  }

  getPendingAttendanceList() {
    this.pendingAttendanceList = []
    let obj = {
      month: this.month == null ? '' : this.month,
      year: this.year == null ? '' : this.year
    }
    this.adminLayoutService.getpendingManualAttendanceList(obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.allPendingAttendanceList = Response.data;
        this.pendingAttendanceList = this.allPendingAttendanceList.sort((a, b) => {
          return new Date(b.checkInTimeInDate).getTime() - new Date(a.checkInTimeInDate).getTime();
        });
        this.pendingAttendanceList = this.allPendingAttendanceList;
        this.noData = false;
        this.pendingStatusChange = [];
        for (var i = 0; i < this.pendingAttendanceList.length; i++) {
          if (this.pendingAttendanceList[i].isApprovedManualAttendance == 1 && this.pendingAttendanceList[i].isCheckIn != false && this.pendingAttendanceList[i].isCheckOut != false) {
            this.pendingStatusChange.push(this.pendingAttendanceList[i]);
          }
        }
        this.search(this.searchTerm, this.attendanceTypeStatus)
      } else {
        this.noData = true;
        this.allPendingAttendanceList = [];
        this.pendingStatusChange = [];
        this.pendingAttendanceList = [];
      }
    }, (error: any) => {
      console.log(error.error.Message);
    });
  }

  search(value: string, attendanceType: any): void {
    if (attendanceType != 0) {
      this.allPendingAttendanceList = this.pendingAttendanceList.filter((val) => val.fullName.toLowerCase().includes(value.toLowerCase()) && attendanceType == val.isApprovedManualAttendance);
      this.p = 1;
      if (this.allPendingAttendanceList.length == 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    }
    else {
      this.allPendingAttendanceList = this.pendingAttendanceList.filter((val) => val.fullName.toLowerCase().includes(value.toLowerCase()));
      this.p = 1;
      if (this.allPendingAttendanceList.length == 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    }
  }

  selectedDayType: number = 0;

  updateStatus(e: any, empId: any) {

    let params = {
      "penddingAttendanceId": empId,
      "approveType": e.id == 2 ? 1 : e.id == 3 ? 2 : 1
    }

    this.adminLayoutService.updateAttendanceStatus(params).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        // this.commonService.notifier.notify('success', Response.meta.message);
        this.checkedSalaryIds = [];
        this.selectedPendingAttIds = [];
        this.pendingAttendanceSelectedId = false;
        this.getPendingAttendanceList();
      }
      //for select sub industry step
    }, (error: any) => {
      console.log(error.error.Message);
    });

  }

  sortingList(sort: Sort) {

    const data = this.allPendingAttendanceList.slice();
    if (!sort.active || sort.direction === '') {
      this.pendingAttendanceList = data;
      return;
    }

    this.pendingAttendanceList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'empNumber': return compare(a.empNumber, b.empNumber, isAsc);
        case 'fullName': return compare(a.fullName, b.fullName, isAsc);
        default: return 0;
      }
    });
  }

  onClickSelectAllAttID() {
    for (var i = 0; i < this.pendingAttendanceList.length; i++) {
      if (this.pendingAttendanceList[i].isApprovedManualAttendance == 1 && this.pendingAttendanceList[i].isCheckIn != false && this.pendingAttendanceList[i].isCheckOut != false) {
        this.pendingAttendanceList[i].isSelected = this.pendingAttendanceSelectedId;
      }
    }
    this.getCheckSalaryDetailsList();
  }

  getCheckSalaryDetailsList() {
    this.checkedSalaryIds = [];
    this.selectedPendingAttIds = [];
    for (var i = 0; i < this.pendingAttendanceList.length; i++) {
      if (this.pendingAttendanceList[i].isSelected)
        this.checkedSalaryIds.push(this.pendingAttendanceList[i]);
    }
    if (this.pendingAttendanceSelectedId === true) {
      this.checkedSalaryIds.forEach((e: any) => {
        this.selectedPendingAttIds.push(e._id);
      })
    }
    else {
      this.checkedSalaryIds.forEach(e => {
        const index = this.selectedPendingAttIds.indexOf(e._id);
        if (index > -1) {
          this.selectedPendingAttIds.splice(index, 1);
        }
      })
    }
  }

  onClickChange(event: any, Id: any) {
    if (event.target.checked === true) {
      this.selectedPendingAttIds.push(Id);

      if (this.selectedPendingAttIds.length == this.pendingStatusChange.length) {
        this.pendingAttendanceSelectedId = true;
      }
    }
    else {
      const index = this.selectedPendingAttIds.indexOf(Id);
      console.log("Index : ", index);
      if (index > -1) {
        this.selectedPendingAttIds.splice(index, 1);
      }
      if (this.selectedPendingAttIds.length != this.pendingAttendanceList.length) {
        this.pendingAttendanceSelectedId = false
      }
    }
  }

  updateSelectedStatus(status: any) {
    if (status.id == 2 || status.id == 3) {
      this.selectedPendingAttIds.forEach(Id => {
        this.updateStatus(status, Id);
      });
    } else {
      return;
    }
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}