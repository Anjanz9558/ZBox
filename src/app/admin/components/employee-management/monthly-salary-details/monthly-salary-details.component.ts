import { Component, OnInit } from '@angular/core';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { CommonService } from '../../../../shared/common.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidatorFn, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
// import * as Chartist from 'chartist';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSortModule, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDirective } from '../../../../shared/directives/common.directive';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, NiceTimePipe } from '../../../../shared/pipe/common.pipe';
// import { GroupByPipe } from 'ngx-pipes';
import { StorageService, StorageKey } from '../../../../shared/storage.service';
declare const $: any;
import { environment } from '../../../../../environments/environment';
import { NgSelectModule } from '@ng-select/ng-select';


@Component({
  selector: 'app-monthly-salary-details',
 standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule,
    MatSortModule,
  NgSelectModule
  ],
  templateUrl:'./monthly-salary-details.component.html',
  styleUrl: './monthly-salary-details.component.scss'
})
export class MonthlySalaryDetailsComponent implements OnInit {
invalidYear :boolean=false;
invalidMonth :boolean=false;
  l: number=0;
  p: number = 1;
  mySelect:any;
  searchTerm: any;
  noData = false;
  yearArray = new Array<number>();
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
  searchForm!: FormGroup;
  dt = new Date();
  toMonth = this.dt.getMonth() + 1;
  toYear = this.dt.getFullYear();
  month = this.toMonth;
  year = this.toYear;
  allMonthlySalaryDetailsList: any[] = [];
  monthlySalaryDetailsList: any[] = [];
  get fSearchData(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }
  searchData: boolean = false;

  constructor(private commonService: CommonService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.noData = false;
    this.mySelect = 5;
    this.l = 10;
    this.getYear();
    this.defaultForm();
    this.getMonthlySalaryDetails()
  }

  defaultForm() {
    this.searchForm = this.fb.group({
      name: [''],
      month: [this.month, [Validators.required]],
      year: [this.year, [Validators.required]],
    });
  }

  getYear() {
    let CurrentYear = new Date().getFullYear()

    let startYear = 2019;

    while (startYear <= CurrentYear) {
      this.yearArray.push(startYear++)
    }
    return this.yearArray.reverse()
  }

  getMonthlySalaryDetails() {
    this.monthlySalaryDetailsList =[];
    this.monthlySalarySelectedId = false;
    this.onClickSelectAllApplicationID();

    let Obj = {
      month: this.searchForm.value.month,
      year: this.searchForm.value.year
    }
    // api name j change karvanu ama 
    this.adminLayoutService.getMonthlySalaryDetailsByMonthYear(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.allMonthlySalaryDetailsList = Response.data;
        this.monthlySalaryDetailsList = this.allMonthlySalaryDetailsList;
        this.noData = false;
        this.sortingList({ active: 'userName', direction: 'asc' })
      }
      else {
        this.monthlySalaryDetailsList = [];
        this.noData = true
      }
    })
  }

  search(value: string): void {
    this.monthlySalaryDetailsList = this.allMonthlySalaryDetailsList.filter((val: any) => JSON.stringify(val).toLowerCase().includes(value.toLowerCase()));
    this.p = 1;
    if (this.monthlySalaryDetailsList.length == 0) {
      this.monthlySalaryDetailsList = [];
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  sortingList(sort: Sort) {

    const data = this.allMonthlySalaryDetailsList.slice();
    if (!sort.active || sort.direction === '') {
      this.monthlySalaryDetailsList = data;
      return;
    }

    this.monthlySalaryDetailsList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userName': return compare(a.userName, b.userName, isAsc);
        default: return 0;
      }
    });
  }

  monthlySalarySelectedId: boolean = false;
checkedSalaryIds: any[] = [];
selectedSalaryIds: string[] = [];

  onClickSelectAllApplicationID() {
    for (var i = 0; i < this.monthlySalaryDetailsList.length; i++) {

      this.monthlySalaryDetailsList[i].isSelected = this.monthlySalarySelectedId;
    }
    this.getCheckSalaryDetailsList();
  }
  getCheckSalaryDetailsList() {
    this.checkedSalaryIds = [];
    this.selectedSalaryIds = [];
    for (var i = 0; i < this.monthlySalaryDetailsList.length; i++) {
      if (this.monthlySalaryDetailsList[i].isSelected)
        this.checkedSalaryIds.push(this.monthlySalaryDetailsList[i]);
    }
    if (this.monthlySalarySelectedId === true) {
      this.checkedSalaryIds.forEach(e => {
        this.selectedSalaryIds.push(e._id);
      })
    }
    else {
      this.checkedSalaryIds.forEach(e => {
        const index = this.selectedSalaryIds.indexOf(e._id);
        if (index > -1) {
          this.selectedSalaryIds.splice(index, 1);
        }
      })
    }
  }
  onClickChange(event: any, index: number, Id: any) {
    if (event.target.checked === true) {
      this.selectedSalaryIds.push(Id);
      if (this.selectedSalaryIds.length == this.monthlySalaryDetailsList.length) {
        this.monthlySalarySelectedId = true
      }
    }
    else {
      const index = this.selectedSalaryIds.indexOf(Id);
      if (index > -1) {
        this.selectedSalaryIds.splice(index, 1);
      }
      if (this.selectedSalaryIds.length != this.monthlySalaryDetailsList.length) {
        this.monthlySalarySelectedId = false
      }
    }
  }

  downloadMonthlySalarySlip() {
    let Obj = {
      monthlySalaryId: this.selectedSalaryIds
    }
    this.adminLayoutService.downloadSalarySlipZip(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        this.monthlySalarySelectedId = false;
        this.onClickSelectAllApplicationID();
        const url = environment.uploadsUrl + 'salaryZip/' + Response.data;
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.href = url;
        var extension = Response.data;
        downloadLink.download = extension;
        downloadLink.target = '_blank';
        downloadLink.click();
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    })
  }

}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
