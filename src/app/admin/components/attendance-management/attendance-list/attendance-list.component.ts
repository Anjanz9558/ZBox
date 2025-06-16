import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditorModule } from '@tinymce/tinymce-angular';
declare const $: any;
import moment from 'moment';
import * as XLSX from 'xlsx';
import * as fs from 'file-saver';
import { NgOtpInputComponent } from 'ng-otp-input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ConfirmDirective } from '../../../../shared/directives/confirm.directive';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, GroupByPipe, NiceTimePipe } from '../../../../shared/pipe/common.pipe';
import { environment } from '../../../../../environments/environment';
import { CommonService } from '../../../../shared/common.service';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-attendance-list',
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
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.scss'
})

export class AttendanceListComponent implements OnInit {
  yearArray = new Array<number>();
  attendanceMasterList: any;
  l: number = 0;
  p: number = 1;
  mySelect = 0;
  noData = false;
  dt = new Date();
  TodayDate: any;
  currentTodayDate = moment(new Date()).format('yyyy-MM-DD');
  toMonth = this.dt.getMonth() + 1;
  toYear = this.dt.getFullYear();
  month = this.toMonth;
  year = this.toYear;
  d = new Date(this.year, this.month - 1);
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayName = this.days[this.d.getDay()];
  daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
  searchData = false;
  sat = [];
  sun = [];
  elementsMeta = [];
  allAttendanceMasterList!: any[];
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
  dateForAttendanceList: any[] = [];
  holidayData: any[] = [];

  searchForm!: FormGroup;
  searchTerm: any;
  dateWiseAttendanceData: any;
  monthWiseAttendanceData: any;
  imgUrl = environment.uploadedUrl;
  invalidYear: boolean = false;
  invalidMonth: boolean = false;

  get fSearchData(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  defaultForm() {
    this.searchForm = this.fb.group({
      name: [''],
      month: [this.month, [Validators.required]],
      year: [this.year, [Validators.required]],
    });
  }




  constructor(public commonService: CommonService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getYear();
    this.defaultForm();
    let params = {
      month: this.searchForm.value.month,
      year: this.searchForm.value.year
    }
    this.getAttendanceLists(params);
    this.getDateForAttendanceList();
    // this.getDayNames(this.year, this.month);
    this.mySelect = 10;
    this.l = 10;
    this.TodayDate = this.dt.getDate();
    console.log(this.TodayDate);
  }
  itemsPerPage(): void {
    this.l = this.mySelect;
  }
  searchFilter(value: string): void {
    this.attendanceMasterList = this.allAttendanceMasterList.filter((val) => val.userName.toLowerCase().includes(value.toLowerCase()))
    console.log(this.attendanceMasterList);
    this.p = 1;
    if (this.attendanceMasterList.length == 0) {

      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  // getWeekend(year, month) {
  //   
  //   for (var i = 1; i <= this.daysInMonth; i++) {    //looping through days in month
  //     var newDate = new Date(year, month, i)
  //     if (newDate.getDay() == 0) {   //if Sunday
  //       this.sun.push(i);
  //     }
  //     if (newDate.getDay() == 6) {   //if Saturday
  //       this.sat.push(i);
  //     }
  //   }
  // }
  // getDayNames(year: number, month: number) {

  //   this.elementsMeta = [];
  //   var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  //   var daysInMonth = new Date(year, month, 0).getDate();
  //   var weekNumber = 0
  //   for (let i = 1; i <= daysInMonth; i++) {
  //     var d = new Date(year, month - 1, i);
  //     var dayName = days[d.getDay()];

  //     if (dayName === 'Sat') {
  //       weekNumber = weekNumber + 1
  //     }
  //     let modal = {
  //       columnTitle: i + "/" + month,
  //       dayName: dayName,
  //       weekNumber: weekNumber
  //     };
  //     this.elementsMeta.push(modal);
  //     //console.log("dayyyyyyy",i + ' ' + dayName);
  //   }
  //   console.log("dayyyyyyy", this.elementsMeta);
  // }
  counter(i: number) {
    return new Array(i);
  }

  openDetails(id: any, date: any) {
    // $("#add-attendance-details-modal").modal({ backdrop: 'static', keyboard: false, show: true });
    let Obj = {
      employeeId: id,
      fromDate: date + '/' + this.month + '/' + this.year
    }
    this.adminLayoutService.getDateWiseAttendanceData(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.dateWiseAttendanceData = Response.data;
        $("#add-attendance-details-modal").modal({ backdrop: 'static', keyboard: false });
        $("#add-attendance-details-modal").modal('show');
      }
    });
  }
  closeAttendanceDetails() {
    $("#add-attendance-details-modal").modal("hide");
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

  getAttendanceLists(params: any) {
    this.adminLayoutService.getAttendanceMasterList(params).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.attendanceMasterList = Response.data;
        this.allAttendanceMasterList = this.attendanceMasterList;
        this.searchData = false;
        this.sortingList({ active: 'userName', direction: 'asc' });
        if (this.attendanceMasterList.length == 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      } else {
        this.noData = true;
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  search() {
    if (this.toMonth >= this.searchForm.value.month) {
      this.invalidMonth = false;
    } else {
      if (this.month < this.searchForm.value.month && this.toYear > this.searchForm.value.year) {
        this.invalidMonth = false
      }
      else {
        this.invalidMonth = true;
      }
    }


    if (this.toYear >= this.searchForm.value.year) {
      this.invalidYear = false;
    } else {
      this.invalidYear = true;
    }
    if (this.searchForm.invalid || this.invalidMonth === true || this.invalidYear === true) {
      this.searchData = true;
      return;
    }
    let params = {
      month: this.searchForm.value.month,
      year: this.searchForm.value.year
    }
    console.log("search param", params);
    this.sun = [];
    this.sat = [];
    this.month = this.searchForm.value.month;
    this.year = this.searchForm.value.year;
    this.daysInMonth = new Date(this.year, this.month, 0).getDate();
    this.getDateForAttendanceList();
    this.getAttendanceLists(params);
    // this.getDayNames(this.year, this.month); // take -1 because month value getting from monthArray
  }
  onMonthChange() {
    if (this.toMonth < this.searchForm.value.month && this.searchData === true) {
      this.invalidMonth = true;
    } else {
      this.invalidMonth = false;
    }
  }
  getDateForAttendanceList() {
    this.dateForAttendanceList = [];
    if (this.searchForm.invalid) {
      this.searchData = true;
      return
    }
    let params = {
      month: this.searchForm.value.month,
      year: this.searchForm.value.year
    }

    this.adminLayoutService.getDateForAttendanceMasterList(params).subscribe((Response: any) => {
      this.dateForAttendanceList = Response.data;
      this.searchData = false;
    });
  }
  isHoliday(date: string) {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    // Check if the formattedDate exists in the holidayData array
    return this.holidayData.some(holiday => {
      // Convert the holiday date to the same format for comparison
      const holidayDate = new Date(holiday.date).toISOString().split('T')[0];
      return formattedDate === holidayDate;
    });
  }

  openMonthDetails(id: any) {

    let Obj = {
      employeeId: id,
      month: this.month,
      year: this.year
    }
    this.adminLayoutService.getMonthWiseAttendanceData(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.monthWiseAttendanceData = Response.data;
        this.holidayData = Response.data.holidayData;
        const holidayData: any[] = Response.data.holidayData;

        this.monthWiseAttendanceData.data.forEach((attendance: any) => {
          const isDateInHoliday = holidayData.some(holiday => holiday.date === attendance.date);

          if (attendance.type == "-" && attendance.checkInTime == null && attendance.CheckOutTime == null && !isDateInHoliday) {
            console.log("success");
            attendance.type = 4;
          }
          else {
            console.log("fgdgjeswyuqwdqydg")
          }
        });
      }
    });
    $("#add-month-attendance-details-modal").modal({ backdrop: 'static', keyboard: false });
    $("#add-month-attendance-details-modal").modal('show');
  }

  closeMonthAttendanceDetails() {
    $("#add-month-attendance-details-modal").modal("hide");
  }

  sortingList(sort: Sort) {

    const data = this.allAttendanceMasterList.slice();
    if (!sort.active || sort.direction === '') {
      this.attendanceMasterList = data;
      return;
    }

    this.attendanceMasterList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'userName': return compare(a.userName, b.userName, isAsc);
        default: return 0;
      }
    });
  }

  exportAttendanceExcel(): void {
    const selectedMonthIndex = this.searchForm.value.month - 1;
    const selectedMonth = this.monthArray[selectedMonthIndex].month;
    const selectedYear = this.searchForm.value.year;

    const excludedEmployeeIds = new Set([
      '65ba24b62c5b64605ccbfaba',
      '65c07426c5bc430748d5922a',
      '65cf11e195a6e639d4624e08',
      '6687f36444f71f1638007567',
      '668bc426d626561a5c450c5c'
    ]);

    // Prepare column headers (including dynamic employee names)
    const employees: any[] = this.allAttendanceMasterList.filter(emp => !excludedEmployeeIds.has(emp._id));
    const employeeKeys = employees.map(emp => `${emp.firstName} ${emp.lastName}`);

    // Build rows
    const worksheetData: any[] = this.dateForAttendanceList.map(dateEntry => {
      const row: any = {
        "Date": `${dateEntry.Date} ${selectedMonth} ${selectedYear}`,
        "Day": dateEntry.day
      };

      employees.forEach(emp => {
        const empName = `${emp.firstName} ${emp.lastName}`;
        if (dateEntry.isHoliDay) {
          row[empName] = (dateEntry.day === 'Sat' || dateEntry.day === 'Sun') ? 'Weekend' : dateEntry.holidayName;
        } else {
          row[empName] = emp[dateEntry.Date] === 3 ? 'P' : 'A';
        }
      });

      return row;
    });

    // Convert to sheet and workbook
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Attendance Report': worksheet }, SheetNames: ['Attendance Report'] };

    // Write and save
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    fs.saveAs(blob, `${selectedMonth}_Attendance_Report.xlsx`);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}