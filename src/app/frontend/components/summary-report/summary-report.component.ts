import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FrontLayoutService } from '../../../layout/front-layout/front-layout.service';
import moment from 'moment';
declare const $: any;
import swal from 'sweetalert';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-summary-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,
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
    NgSelectModule
  ],
  templateUrl: './summary-report.component.html',
  styleUrl: './summary-report.component.scss'
})
export class SummaryReportComponent implements OnInit {
  monthArray: any[] = [];
  summaryForm!: FormGroup;
  dt = new Date();

  month = this.dt.getMonth();
  year = this.dt.getFullYear();
  toDate = this.dt.getDate()
  toMonth = (this.dt.getMonth() + 1);
  toYear = this.dt.getFullYear();
  noData: boolean = false;
  summaryReportList: any[] = [];
  monthInvalid: boolean = false;
  yearInvalid: boolean = false;
  submittedSummaryFormData: boolean = false;
  get fsummaryFormData() { return this.summaryForm.controls; }
  attendancedayType = [
    "(Half Day)",
    "(Half Day)",
    "(Full Day)",
    ""
  ];
  userList: any[] = [];

  todayDate = moment(new Date()).format('D-M-yyyy')
  constructor(private fb: FormBuilder, public frontLayoutService: FrontLayoutService) { }

  ngOnInit(): void {

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
    this.defaultForm();
    this.getUserActiveList();
    this.getYear();
  }
  yearArray = new Array<number>();
  getYear() {
    let d = new Date();
    let startYear = 2019;
    while (startYear <= d.getFullYear()) {
      this.yearArray.push(startYear++);
    }
    this.yearArray = this.yearArray.sort((a, b) => b - a)
    return this.yearArray;
  }
  defaultForm() {
    this.summaryForm = this.fb.group({
      month: [this.monthArray[this.month].value, [Validators.required]],
      year: [this.year, [Validators.required]],
      employeeId: [null]
    });
  }

  getUserActiveList() {

    this.frontLayoutService.assignPersonListForTask().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.userList = Response.data.sort((a: any, b: any) => {
          let x = a.userName.toUpperCase(),
            y = b.userName.toUpperCase();
          return x == y ? 0 : x > y ? 1 : -1;
        });
        const loginData = JSON.parse(localStorage.getItem("LoginUserData") || '{}');
        this.summaryForm.controls['employeeId'].setValue(loginData?.employeeId);
        this.getSummaryReportList()

      }
    })
  }

  getSummaryReportList() {

    this.submittedSummaryFormData = true;
    if ((this.summaryForm.value.month > this.toMonth && this.summaryForm.value.year == this.toYear)) {
      this.monthInvalid = true
    } else {
      this.monthInvalid = false
    }
    if ((this.summaryForm.value.year > this.toYear)) {
      this.yearInvalid = true
    } else {
      this.yearInvalid = false
    }

    if (this.summaryForm.invalid || this.monthInvalid === true || this.yearInvalid === true) {
      return
    }

    let params = {
      month: this.summaryForm.value.month,
      year: this.summaryForm.value.year,
      employeeId: this.summaryForm.value.employeeId
    }
    this.frontLayoutService.getSummaryReportList(params).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.submittedSummaryFormData = false;
        this.summaryReportList = Response.data.reverse().map((item: any) => {
          // Parse hours, minutes, and seconds
          const [hours, minutes, seconds] = item.totalWorkingHours.split(":").map(Number);
          // Calculate total minutes
          const totalMinutes = hours * 60 + minutes;
          return { ...item, totalMinute: totalMinutes };
        });

        console.log(this.summaryReportList);

        if (this.summaryReportList.length == 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      } else {
        this.noData = true;
      }
      //for select sub industry step
    }, (error) => {
      //console.log(error.error.Message);
    });
  }

}
