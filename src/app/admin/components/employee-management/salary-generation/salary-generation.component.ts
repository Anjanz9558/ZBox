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
import fs from 'file-saver'; 
import * as XLSX from 'xlsx';
import { NgSelectModule } from '@ng-select/ng-select';



@Component({
  selector: 'app-salary-generation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule,
    MatSortModule,
    FilterPipe,
    NgSelectModule
  ],
  templateUrl: './salary-generation.component.html',
  styleUrl: './salary-generation.component.scss'
})
export class SalaryGenerationComponent implements OnInit {

  dt = new Date();
  month = this.dt.getMonth();
  year = this.dt.getFullYear();
  searchForm!: FormGroup;
  noData: any;
  l: number = 0;
  p: number = 1;
  itemsPage: any;
  mySelect: any;
  monthArray: any[] = [];
  allSalaryGenerationList: any[] = [];
  salaryGenerationList: any[] = [];
  salaryTableShow: boolean = false;
  get fSearchData(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }
  searchData: boolean = false;

  isView: boolean = false;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;
  searchTerm:any;

  constructor(private commonService: CommonService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder, private router: Router) {
    let pagePermission = { module: "SalaryGeneration" }
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
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  ngOnInit() {

    this.monthArray = [
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

    this.noData = false;
    this.mySelect = 5;
    this.l = 10;
    this.defaultForm();
    this.getYear();
    // this.getSalaryGenerationList();
  }

  yearArray = new Array<number>();
  getYear() {
    this.yearArray = new Array<number>();
    let d = new Date();

    for (let index = 0; index < 2; index++) {
      let prYear = d.getFullYear();
      let arr = prYear - index;
      this.yearArray.push(arr)
    }
    return this.yearArray;
  }

  defaultForm() {
    this.searchForm = this.fb.group({
      month: [this.monthArray[this.month].value, [Validators.required]],
      year: [this.year, [Validators.required]],
    });
  }

  itemsPerPage(): void {
    this.l = this.mySelect;
  }

  getSalaryGenerationList() {

    if (this.searchForm.invalid) {
      this.searchData = true;
      return;
    }

    this.salaryTableShow = false;
    let Obj = {
      month: this.searchForm.value.month,
      year: this.searchForm.value.year
    }

    this.adminLayoutService.getSalaryGenerationList(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.salaryTableShow = true;
        this.searchData = false;
        this.allSalaryGenerationList = Response.data
        this.salaryGenerationList = this.allSalaryGenerationList
        this.sortingList({ active: 'empNumber', direction: 'asc' })
      }
    })

  }

  generateSalaryExcel() {
    const worksheetData = this.salaryGenerationList.map(e => ({
      "Month & Year": this.monthArray[this.searchForm.value.month - 1].month + ' ' + this.searchForm.value.year,
      "Employee Number": e.empNumber,
      "Employee Name": e.employeeName,
      "Basic Salary": e.basicSalary,
      "HRA": e.HRA,
      "Professional Tax": e.professionalText,
      "Transport Allowance": e.transportAllowance,
      "PF": e.PF,
      "PF Employer": e.PFEmployer,
      "Miscellaneous Allowances": e.miscellaneousAllowances,
      "Total Salary": e.finalAmount
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Salary Report': worksheet }, SheetNames: ['Salary Report'] };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    fs.saveAs(data, `${this.monthArray[this.searchForm.value.month - 1].month}_Salary_Report.xlsx`);
  }


  downloadSalaryGenerationWorkReport(employeeId: any) {
  //   let downloadSalaryGenerationObj = {
  //     month: this.searchForm.value.month,
  //     year: this.searchForm.value.year,
  //     employeeId: employeeId
  //   }
  //   this.adminLayoutService.downloadSalaryGenerationReportByEmployeeID(downloadSalaryGenerationObj).subscribe((Response: any) => {
  //     if (Response.meta.code == 200) {

  //       const base64URL = Response.data.body.data;
  //       const binary = base64URL;
  //       const len = binary.length;
  //       const buffer = new ArrayBuffer(len);
  //       const view = new Uint8Array(binary);
  //       var byteArrays = [];
  //       byteArrays.push(view);
  //       const blob = new Blob(byteArrays, { type: 'application/pdf' });
  //       const url = URL.createObjectURL(blob);

  //       const downloadLink = document.createElement('a');
  //       document.body.appendChild(downloadLink);
  //       downloadLink.href = url;
  //       var extension = "SalaryInvoice.pdf";
  //       downloadLink.download = new Date().getTime() + extension;
  //       downloadLink.target = '_blank';
  //       downloadLink.click();


  //       // let inVoicePDF = this.commonService.rootData.uploadsUrl + "salaryPdfMonthWise/" + Response.data.fileName;
  //       // const pdfUrl = inVoicePDF;
  //       // const pdfName = Response.data.fileName.split('.')[0];
  //       // FileSaver.saveAs(pdfUrl, pdfName);
  //       // this.commonService.notifier.notify('success', "Salary Report Download Successfully.");
  //     }
  //     else {
  //       // this.commonService.notifier.notify('error', Response.meta.message);
  //     }
  //   })
  }

search(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
    this.salaryGenerationList = this.allSalaryGenerationList.filter((val) => JSON.stringify(val).toLowerCase().includes(value.toLowerCase()));
    this.salaryGenerationList = this.salaryGenerationList;
    this.p = 1;
    if (this.salaryGenerationList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  sortingList(sort: Sort) {

    const data = this.allSalaryGenerationList.slice();
    if (!sort.active || sort.direction === '') {
      this.salaryGenerationList = data;
      return;
    }

    this.salaryGenerationList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'empNumber': return compare(a.empNumber, b.empNumber, isAsc);
        case 'employeeName': return compare(a.employeeName, b.employeeName, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
