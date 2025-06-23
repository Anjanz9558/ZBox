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
  selector: 'app-work-from-home',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,
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
  templateUrl: './work-from-home.component.html',
  styleUrl: './work-from-home.component.scss'
})
export class WorkFromHomeComponent implements OnInit {

  month: string | null = null;
  monthArray: any[] = [];
  WFHDataListFormArray: any;
  holidayList: any[] = [];
  wfhListData: any[] = [];
  wfhForm!: FormGroup;
  WFHDataForm!: FormGroup;
  submittedWFHData: boolean = false;
  todayDate = new Date();
  minDate = new Date();
  maxDate = new Date()
  get fWFHData() { return this.wfhForm.controls; }
  name: string = '';
  empNo: string = '';



  constructor(private fb: FormBuilder, public frontLayoutService: FrontLayoutService) { 
        const storedData = localStorage.getItem("LoginUserData");

    if (storedData) {
      const LoginUserData = JSON.parse(storedData);
      this.name = `${LoginUserData.firstName ?? ''} ${LoginUserData.middleName ?? ''} ${LoginUserData.lastName ?? ''}`.trim();
      this.empNo = LoginUserData.empNumber ?? '';
    }

  }

  ngOnInit(): void {
    this.getHolidayList();
    this.defaultForm();
    this.defaultWFHDataForm();
    this.WFHDataListFormArray = this.WFHDataForm.get('wfhData') as FormArray;
    this.getYear()
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

    this.month = (new Date().getMonth() + 1).toString()
    this.getWFHListData();
  }

  defaultForm() {
    this.wfhForm = this.fb.group({
      reason: ['', [Validators.required]],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      workFromHomeApprovedby: ['', [Validators.required]],
    })
  }
  defaultWFHDataForm() {
    this.WFHDataForm = this.fb.group({
      wfhData: this.fb.array([])
    })
  }

  createLeaveData(oItem?: any): FormGroup {
    return this.fb.group({
      // leaveTypeId: [(oItem['leaveTypeId'] ? oItem['leaveTypeId'] : null),],
      // leaveTypeName: [(oItem['leaveTypeName'] ? oItem['leaveTypeName'] : null),],
      // leaveIs: [(oItem['leaveIs'] ? oItem['leaveIs'] : ''), [Validators.required]],
      date: [(oItem['date'] ? oItem['date'] : null),],
      // dayName: [(oItem['dayName'] ? oItem['dayName'] : ''),],
    });
  }

  getHolidayList() {
    this.frontLayoutService.getHolidayList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.holidayList = Response.data;
      }
    })
  }

  WFHFromDateChange() {
    this.wfhForm.controls['toDate'].setValue(null);
  }
  wfhModalOpen() {
    this.defaultForm();
    this.defaultWFHDataForm();
    this.submittedWFHData = false;
    this.WFHDataListFormArray.clear();
    $("#apply-wfh-modal").modal({ backdrop: 'static', keyboard: false});
    $("#apply-wfh-modal").modal('show');

  }
  cancelWFHModal() {
    this.defaultForm();
    this.submittedWFHData = false;
    this.defaultWFHDataForm();
    this.WFHDataListFormArray.clear();
    $("#apply-wfh-modal").modal('hide');
  }

  saveWorkFromHomeData() {
    debugger
    this.WFHDataListFormArray.clear();
    this.WFHDataListFormArray = this.WFHDataForm.get('wfhData') as FormArray;

    if (this.wfhForm.invalid) {
      this.submittedWFHData = true;
      return
    }

    let fromDate = this.wfhForm.value.fromDate

    let dateArray = [];
    let holidayArray:any = [];



    while (fromDate <= this.wfhForm.value.toDate) {

      this.holidayList.filter((x: any) => {
        let HolidayDate = moment(new Date(x.date)).format('DD-MM-yyyy');
        let fromDates = moment(new Date(fromDate)).format('DD-MM-yyyy');
        if (fromDates == HolidayDate) {
          holidayArray.push(new Date(x.date));
        }
      })

      dateArray.push(new Date(fromDate));
      fromDate = moment(fromDate).add(1, 'day')
    }

    holidayArray.filter((y: any) => {
      dateArray.filter((x: any, i: any) => {
        let holidayDate = moment(new Date(y)).format('DD-MM-yyyy');
        let fromDates = moment(new Date(x)).format('DD-MM-yyyy');
        if (fromDates == holidayDate) {
          dateArray.splice(i, 1)
        }


      })
    })

    dateArray.filter((x: any) => {
      let Obj = {
        date: moment(x).format('DD/MM/yyyy')
      }
      this.WFHDataListFormArray.push(this.createLeaveData(Obj))
    })

    let leaveDateWiseObj = {
  employeeId: JSON.parse(localStorage.getItem("LoginUserData") || '{}')?.employeeId,
      fromDate: moment(this.wfhForm.controls['fromDate'].value).format('DD/MM/yyyy'),
      toDate: moment(this.wfhForm.controls['toDate'].value).format('DD/MM/yyyy'),
      workFromHomeApprovedby: this.wfhForm.controls['workFromHomeApprovedby'].value,
      reason: this.wfhForm.controls['reason'].value,
      workFromHomeData: this.WFHDataForm.controls['wfhData'].value
    }

    this.frontLayoutService.saveWorkFromHome(leaveDateWiseObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.defaultForm();
        this.defaultWFHDataForm();
        $("#apply-wfh-modal").modal('hide');
        swal({
          text: "Your Work From is apply successfully.",
          icon: "success",
          timer: 1500,
          buttons: [false]
        });
        this.getWFHListData();
      }
      else {
        swal({
          text: Response.meta.message,
          icon: "error",
          timer: 1500,
          buttons: [false]
        });
      }
    })



    // $("#apply-wfh-modal").modal('hide');
    // $("#apply-wfh-date-wise").modal({ backdrop: 'static', keyboard: false, show: true });
  }

  // cancelDateWiseLeaveModal() {
  //   this.defaultWFHDataForm();
  //   this.WFHDataListFormArray.clear();
  //   $("#apply-wfh-modal").modal({ backdrop: 'static', keyboard: false, show: true });
  //   $("#apply-wfh-date-wise").modal('hide');
  // }


  // saveLeaveDateWise() {

  //   let leaveDateWiseObj = {
  //     employeeId: JSON.parse(localStorage.getItem("LoginUserData")).employeeId,
  //     fromDate: moment(this.wfhForm.controls.fromDate.value).format('DD/MM/yyyy'),
  //     toDate: moment(this.wfhForm.controls.toDate.value).format('DD/MM/yyyy'),
  //     leaveTypeId: this.wfhForm.controls.leaveTypeId.value._id,
  //     workFromHomeApprovedby: this.wfhForm.controls.workFromHomeApprovedby.value,
  //     reason: this.wfhForm.controls.reason.value,
  //   }

  //   this.frontLayoutService.saveLeaveDateWise(leaveDateWiseObj).subscribe((Response: any) => {
  //     if (Response.meta.code == 200) {
  //       this.defaultForm();
  //       this.defaultWFHDataForm();
  //       $("#apply-wfh-date-wise").modal('hide');
  //       swal({
  //         text: "Your Leave is apply successfully.",
  //         icon: "success",
  //         timer: 1500,
  //         buttons: [false]
  //       });
  //       this.getWFHListData();
  //     }
  //     else {
  //       swal({
  //         text: Response.meta.message,
  //         icon: "error",
  //         timer: 1500,
  //         buttons: [false]
  //       });
  //     }
  //   })

  // }

  yearArray: any[] = [];
  year = new Date().getFullYear();
  noData: boolean = false;
  noDataForLeave: boolean = false;

  getYear() {
    let CurrentYear = new Date().getFullYear()

    let startYear = 2019;

    while (startYear <= CurrentYear) {
      this.yearArray.push(startYear++)
    }

    return this.yearArray.reverse()
  }

  getWFHListData() {
    let loginUserData = JSON.parse(localStorage.getItem("LoginUserData") || '{}');
    let idObj = {
      employeeId: loginUserData?.employeeId
    };

    this.frontLayoutService.getWFhList(idObj).subscribe((Response: any) => {
      this.wfhListData = []
      if (Response.meta.code == 200) {
        this.wfhListData = Response.data.sort((a: any, b: any) => {
          let Adate = new Date(a.fromDate.split('/')[2] + '-' + a.fromDate.split('/')[1] + '-' + a.fromDate.split('/')[0]);
          let Bdate = new Date(b.fromDate.split('/')[2] + '-' + b.fromDate.split('/')[1] + '-' + b.fromDate.split('/')[0])
          return (Adate < Bdate ? -1 : 1) * (true ? 1 : -1)
        });
        this.noData = false;
      }
      else {
        this.noData = true;
      }
    })
  }

  cancleWFHID: any;
  remark = '';
  submittedWFHRemark: boolean = false

  cancleWFHRemarkModal() {
    this.remark = ''
    this.submittedWFHRemark = false;
    $("#cancel-WFH-modal").modal('hide');
  }

  cancelWFHRemarkModalOpen(id: any) {
    this.cancleWFHID = id
    this.remark = '';
    this.submittedWFHRemark = false;
    $("#cancel-WFH-modal").modal({ backdrop: 'static', keyboard: false});
    $("#cancel-WFH-modal").modal('show');

  }

  cancleWorkFromHome() {

    if (!this.remark) {
      this.submittedWFHRemark = true;
      return
    }

    swal({
      title: 'Cancle Work From Home',
      text: 'Are you sure want to cancle this Work From Home ?',
      icon: "warning",
      closeOnClickOutside: false,
      buttons: ['Cancel', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {

        let Obj = {
          workFromHomeId: this.cancleWFHID,
          workFromHomeStatus: 3,
          remark: this.remark
        }

        this.frontLayoutService.updateWFHStatus(Obj).subscribe((Response: any) => {
          if (Response.meta.code == 200) {
            this.getWFHListData();
            this.remark = ''
            this.submittedWFHRemark = false;
            $("#cancel-WFH-modal").modal('hide');
          }
        })
      }
    })




  }

}
