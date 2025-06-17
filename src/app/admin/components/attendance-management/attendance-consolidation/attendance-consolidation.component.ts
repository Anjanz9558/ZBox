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
import { NgOtpInputComponent } from 'ng-otp-input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ConfirmDirective } from '../../../../shared/directives/common.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, GroupByPipe, NiceTimePipe } from '../../../../shared/pipe/common.pipe';
import { CommonService } from '../../../../shared/common.service';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
declare const $: any;

@Component({
  selector: 'app-attendance-consolidation',
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
  templateUrl: './attendance-consolidation.component.html',
  styleUrl: './attendance-consolidation.component.scss'
})
export class AttendanceConsolidationComponent implements OnInit {

  yearArray = new Array<number>();
  l: number = 1;
  p: number = 1;
  mySelect = 1;
  noData = false;
  dt = new Date();
  month = this.dt.getMonth();
  year = this.dt.getFullYear();
  searchData = false;
  monthArray = [
    { value: '1', month: 'January' },
    { value: '2', month: 'February' },
    { value: '3', month: 'March' },
    { value: '4', month: 'April' },
    { value: '5', month: 'May' },
    { value: '6', month: 'June' },
    { value: '7', month: 'July' },
    { value: '8', month: 'August' },
    { value: '9', month: 'September' },
    { value: '10', month: 'October' },
    { value: '11', month: 'November' },
    { value: '12', month: 'December' },
  ];
  consolidateReport: any[] = [];
  getTotalLeavebyEmployeeId: any[] = [];
  getTotalHoliday: any[] = [];
  getPresentDay: any[] = [];
  searchForm!: FormGroup;
  searchTerm: any;
  get fSearchData(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }
  allConsolidateReport: any[] = [];

  constructor(private commonService: CommonService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.mySelect = 10;
    this.l = 10;
    this.defaultForm();
    this.getYear();
    let params = {
      month: this.searchForm.value.month,
      year: this.searchForm.value.year
    }
    this.getConsolidateReport(params);
  }
  defaultForm() {
    this.searchForm = this.fb.group({
      name: [''],
      month: [this.monthArray[this.month].value, [Validators.required]],
      year: [this.year, [Validators.required]],
    });
  }
  getYear() {
    this.yearArray = new Array<number>();
    let d = new Date();

    for (let index = 0; index < 1; index++) {
      let prYear = d.getFullYear();
      let arr = prYear - index;
      this.yearArray.push(arr)
    }
    return this.yearArray;
  }
  search() {
    if (this.searchForm.invalid) {
      this.searchData = true;
      return;
    }
    let params = {
      month: this.searchForm.value.month,
      year: this.searchForm.value.year
    }
    this.getConsolidateReport(params);
    this.searchFilter(this.searchTerm)

  }
  getConsolidateReport(params: any) {

    this.adminLayoutService.getConsolidateReport(params).subscribe((Response: any) => {



      if (Response.meta.code == 200) {

        this.allConsolidateReport = Response.data.filter((x: any) => x.employeeName ? x.employeeName : '');
        this.allConsolidateReport.forEach((item: any) => {
          item.workingDays = item.totalDaysOfMonth - item.totalHolidays;
        });
        this.consolidateReport = this.allConsolidateReport;
        this.sortingList({ active: 'employeeName', direction: 'asc' });
        if (this.consolidateReport.length == 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      } else {
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }
  getTotalLeaves(params: any) {

    this.adminLayoutService.getTotalLeavebyEmployeeId(params).subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        this.getTotalLeavebyEmployeeId = Response.data;
        $("#leave-days-modal").modal({ backdrop: 'static', keyboard: false });
        $("#leave-days-modal").modal('show');
      } else {
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }
  getTotalHolidays(params: any) {

    this.adminLayoutService.getTotalHoliday(params).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.getTotalHoliday = Response.data.sort((a: any, b: any) => {
          let date = this.sortDate(a.date, b.date);
          return date
        });
        $("#holidays-modal").modal({ backdrop: 'static', keyboard: false });
        $("#holidays-modal").modal('show');
      } else {
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }
  sortDate(date1: any, date2: any) {
    let fDate = new Date(date1);
    let lDate = new Date(date2);
    return (fDate > lDate ? -1 : 1) * (true ? -1 : 1)
  }
  getPresentDays(params: any) {
    this.getPresentDay = [];
    this.adminLayoutService.getTotalPresentDays(params).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.getPresentDay = Response.data;
        $("#presentDays-modal").modal({ backdrop: 'static', keyboard: false });
        $("#presentDays-modal").modal('show');
      } else {
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }
  cancelModal(modal: any) {
    $("#" + modal).modal("hide");
  }
  searchFilter(value: string): void {
    this.consolidateReport = this.allConsolidateReport.filter((val) => val.employeeName.toLowerCase().includes(value.toLowerCase()))
    console.log(this.consolidateReport);
    this.p = 1;
    if (this.consolidateReport.length == 0) {

      this.noData = true;
    } else {
      this.noData = false;
    }
  }
  sortingList(sort: Sort) {

    const data = this.allConsolidateReport.slice();
    if (!sort.active || sort.direction === '') {
      this.consolidateReport = data;
      return;
    }

    this.consolidateReport
      = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';

        switch (sort.active) {
          case 'empNumber': return compare(a.empNumber, b.empNumber, isAsc);
          case 'employeeName': return compare(a.employeeName.toLowerCase(), b.employeeName.toLowerCase(), isAsc);
          default: return 0;
        }
      });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
