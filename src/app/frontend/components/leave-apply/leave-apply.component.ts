import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-leave-apply',
  imports: [CommonModule,
    ReactiveFormsModule,
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
  templateUrl: './leave-apply.component.html',
  styleUrl: './leave-apply.component.scss'
})
export class LeaveApplyComponent implements OnInit {

  month: string | null = null;
  monthArray: any[] = [];
  leaveDataListFormArray: any;
  leaveTypeList: any[] = [];
  leaveTypeListWithoutLOP: any[] = [];
  leaveCountList: any[] = [];
  holidayList: any[] = [];
  monthWiseLeaveList: any[] = [];
  leaveListByLeaveId: any[] = [];
  leaveCountShowList: any[] = [];
  leaveTypeForm!: FormGroup;
  leaveDataForm!: FormGroup;
  submittedLeaveTypeData: boolean = false;
  todayDate = new Date();
  minDate = new Date();
  maxDate = new Date()
  get fLeaveTypeData() { return this.leaveTypeForm.controls; }

  name: string = '';
  empNo: string = '';


  get leaveDataArray() {
    return this.leaveDataForm.get('leaveData') as FormArray;
  }




  constructor(private fb: FormBuilder, public frontLayoutService: FrontLayoutService) {
    const storedData = localStorage.getItem("LoginUserData");

    if (storedData) {
      const LoginUserData = JSON.parse(storedData);
      this.name = `${LoginUserData.firstName ?? ''} ${LoginUserData.middleName ?? ''} ${LoginUserData.lastName ?? ''}`.trim();
      this.empNo = LoginUserData.empNumber ?? '';
    }


  }

  ngOnInit(): void {
    this.getLeaveTypeList();
    this.getHolidayList();
    this.defaultForm();
    this.defaultLeaveDataForm();
    this.leaveDataListFormArray = this.leaveDataForm.get('leaveData') as FormArray;
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

    this.month = (new Date().getMonth() + 1).toString();
    this.getLeaveListData();
  }

  defaultForm() {
    this.leaveTypeForm = this.fb.group({
      leaveTypeId: [null, [Validators.required]],
      reason: ['', [Validators.required]],
      fromDate: [null, [Validators.required]],
      toDate: [null, [Validators.required]],
      leaveapprovedby: [''],
    })
  }
  defaultLeaveDataForm() {
    this.leaveDataForm = this.fb.group({
      leaveData: this.fb.array([])
    })
  }

  createLeaveData(oItem: any): FormGroup {
    return this.fb.group({
      leaveTypeId: [(oItem['leaveTypeId'] ? oItem['leaveTypeId'] : null),],
      leaveTypeName: [(oItem['leaveTypeName'] ? oItem['leaveTypeName'] : null),],
      leaveIs: [(oItem['leaveIs'] ? oItem['leaveIs'] : ''), [Validators.required]],
      date: [(oItem['date'] ? oItem['date'] : null),],
      month: [(oItem['month'] ? oItem['month'] : null),],
      dayName: [(oItem['dayName'] ? oItem['dayName'] : ''),],
    });
  }

  casualLeaveCount: any;
  sickLeaveCount: any;
  emergencyLeaveCount: any;

  getLeaveCount() {
    const loginUserStr = localStorage.getItem("LoginUserData");

    if (!loginUserStr) {
      console.error("LoginUserData not found in localStorage.");
      return; // Or handle accordingly (e.g. redirect to login)
    }

    const LoginUserData = JSON.parse(loginUserStr);

    const Obj = {
      year: new Date().getFullYear(),
      employeeId: LoginUserData.employeeId
    };
    this.frontLayoutService.getLeaveCount(Obj).subscribe((Response: any) => {
      this.leaveCountShowList = []
      if (Response.meta.code == 200) {



        let img: any;
        let Obj: { leaveType: any; remainLeave: any; _id: any; img: any; leaveCountForThisMonth: any; order: number; } | null = null
        Response.data.forEach((x: any) => {
          if (x.leaveType == 'Emergency') {
            img = '../../../assets/img/emergencyLeave.png';
            Obj = {
              leaveType: x.leaveType,
              remainLeave: x.leaveCount,
              _id: x._id,
              img: img,
              leaveCountForThisMonth: x.leaveCountForThisMonth,
              order: 3
            }
          }
          else if (x.leaveType == 'Sick') {
            img = '../../../assets/img/sickLeave.png'
            Obj = {
              leaveType: x.leaveType,
              remainLeave: x.leaveCount,
              _id: x._id,
              img: img,
              leaveCountForThisMonth: x.leaveCountForThisMonth,
              order: 2
            }
          }
          else if (x.leaveType == 'Casual') {
            img = '../../../assets/img/casualLeave.png'
            Obj = {
              leaveType: x.leaveType,
              remainLeave: x.leaveCount,
              _id: x._id,
              img: img,
              leaveCountForThisMonth: x.leaveCountForThisMonth,
              order: 1
            }
          }


          this.leaveCountShowList.push(Obj);
        })

        this.leaveCountShowList = this.leaveCountShowList.sort((a, b) => a.order - b.order)


        // this.leaveCountList = Response.data;


        // this.leaveCountShowList = [];

        // this.leaveCountList[0].LeaveTypeData.filter((x: any) => {
        //   let img: any;
        //   let Obj = {}

        //   if (x.leaveType == 'Emergency') {
        //     img = '../../../assets/img/emergencyLeave.png'
        //   }
        //   else if (x.leaveType == 'Sick') {
        //     img = '../../../assets/img/sickLeave.png'
        //   }
        //   else if (x.leaveType == 'Casual') {
        //     img = '../../../assets/img/casualLeave.png'
        //   }

        //   let obj = {
        //     leaveType: x.leaveType,
        //     remainLeave: x.remainLeave,
        //     totalAssignLeave: x.totalAssignLeave,
        //     totalUsedLeave: x.totalUsedLeave,
        //     img: img
        //   }

        //   this.leaveCountShowList.push(obj);
        // })

        // this.getLeaveTypeList();
      }
    })
  }

  getLeaveTypeList() {
    this.frontLayoutService.getLeaveTypeList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        let leaveTypeListData = Response.data
        this.getLeaveCount();

        // for (let i = 0; i < leaveTypeListData.length; i++) {
        //   for (let j = 0; j < leaveTypeListCount.length; j++) {
        //     if (leaveTypeListData[i]._id === leaveTypeListCount[j]._id && leaveTypeListCount[j].remainLeave == 0) {
        //       leaveTypeListData.splice(i, 1);
        //     }
        //   }
        // }
        this.leaveTypeList = leaveTypeListData;
        this.leaveTypeListWithoutLOP = this.leaveTypeList.filter((x: any) => x.leaveType.toLowerCase().replace(/\s/g, '') != 'lossofpay');
      }
    })
  }

  DateWiseLeaveCount: any[] = [];
  fromDateCount = 0;
  toDateCount = 0;

  // fromDateWiseLeaveCount: any[] = [];
  // toDateWiseLeaveCount: any[] = [];

  getLeaveTypeWiseCountData() {
    if (this.leaveTypeForm.value.leaveTypeId && this.leaveTypeForm.value.fromDate && this.leaveTypeForm.value.toDate) {
      let Obj = {
        leaveTypeId: this.leaveTypeForm.value.leaveTypeId._id,
        fromDate: moment(this.leaveTypeForm.value.fromDate).format('yyyy-MM-DDT00:00:00') + 'Z',
        toDate: moment(this.leaveTypeForm.value.toDate).format('yyyy-MM-DDT00:00:00') + 'Z',
      }
      this.frontLayoutService.getLeaveTypeFromDateToDateWiseLeaveCount(Obj).subscribe((Response: any) => {
        if (Response.meta.code == 200) {

          this.DateWiseLeaveCount = Response.data;




        }

      })
    }
  }

  getHolidayList() {
    this.frontLayoutService.getHolidayList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.holidayList = Response.data;
      }
    })
  }

  leaveFromDateChange() {
    this.leaveTypeForm.controls['toDate'].setValue(null);
    this.getLeaveTypeWiseCountData();
  }
  leaveModalOpen() {
    this.defaultForm();
    this.defaultLeaveDataForm();
    this.submittedLeaveTypeData = false;
    this.leaveDataListFormArray.clear();
    $("#apply-leave-modal").modal({ backdrop: 'static', keyboard: false });
    $("#apply-leave-modal").modal('show');

  }
  cancelLeaveModal() {
    this.defaultForm();
    this.submittedLeaveTypeData = false;
    this.defaultLeaveDataForm();
    this.leaveDataListFormArray.clear();
    $("#apply-leave-modal").modal('hide');
  }

  setDateWiseLeaveData() {

    this.leaveDataListFormArray = this.leaveDataForm.get('leaveData') as FormArray;

    if (this.leaveTypeForm.invalid) {
      this.submittedLeaveTypeData = true;
      return
    }

    let fromDate = this.leaveTypeForm.value.fromDate

    let dateArray = [];
    let holidayArray: any = [];



    while (fromDate <= this.leaveTypeForm.value.toDate) {

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





    for (let dateCount = 0; dateCount < dateArray.length; dateCount++) {
      let obj = {
        leaveTypeId: '',
        leaveTypeName: '',
        leaveIs: 'fullDay',
        date: new Date(dateArray[dateCount]),
        month: parseInt(moment(dateArray[dateCount]).format('MM')),
        dayName: moment(dateArray[dateCount]).format('dddd')
      }
      this.leaveDataListFormArray.push(this.createLeaveData(obj))


      // if (dateCount < remainSelectedLeaveCount) {
      //   let obj = {
      //     leaveTypeId: this.leaveTypeForm.value.leaveTypeId._id,
      //     leaveTypeName: this.leaveTypeForm.value.leaveTypeId.leaveType,
      //     leaveIs: 'fullDay',
      //     date: new Date(dateArray[dateCount]),
      //     dayName: moment(dateArray[dateCount]).format('dddd')
      //   }
      //   this.leaveDataListFormArray.push(this.createLeaveData(obj))
      // }
      // else {

      //   this.leaveTypeList.forEach((x: any) => {
      //     let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
      //     if (leaveTypeName == 'lossofpay') {
      //       let obj = {
      //         leaveTypeId: x._id,
      //         leaveTypeName: x.leaveType,
      //         leaveIs: 'fullDay',
      //         date: new Date(dateArray[dateCount]),
      //         dayName: moment(dateArray[dateCount]).format('dddd')
      //       }
      //       this.leaveDataListFormArray.push(this.createLeaveData(obj))
      //     }
      //   })
      // }
    }


    $("#apply-leave-modal").modal('hide');
    $("#apply-leave-datewise-modal").modal({ backdrop: 'static', keyboard: false });
    $("#apply-leave-datewise-modal").modal('show');

  }

  transform(collection: any[], property: string): any {
    if (!collection) {
      return null;
    }
    const groupedCollection = collection.reduce((previous, current) => {
      if (!previous[current[property]]) {
        previous[current[property]] = [current];
      }
      else {
        previous[current[property]].push(current);
      }
      return previous;
    }, {});
    return Object.keys(groupedCollection).map(key => ({ key, value: groupedCollection[key] }));
  }

  cancelDateWiseLeaveModal() {
    this.defaultLeaveDataForm();
    this.leaveDataListFormArray.clear();
    $("#apply-leave-modal").modal({ backdrop: 'static', keyboard: false});
    $("#apply-leave-modal").modal('show');

    $("#apply-leave-datewise-modal").modal('hide');
  }
  canclePreviewModal() {
    this.showPreviewList = [];
    this.totalFullDayLeaveCount = 0;
    this.totalHalfDayLeaveCount = 0;
    this.totalLeaveCount = 0;
    this.isLossOfPay = false;
    $("#apply-leave-preview-modal").modal('hide');
    $("#apply-leave-modal").modal('hide');
    $("#apply-leave-datewise-modal").modal({ backdrop: 'static', keyboard: false});
    $("#apply-leave-datewise-modal").modal('show');

  }

  showPreviewList: any[] = []
  totalFullDayLeaveCount = 0;
  totalHalfDayLeaveCount = 0;
  totalLeaveCount = 0;
  isLossOfPay: boolean = false;

  selectedLeaveCountId: any[] = [];

  showPreviewListModal() {
    this.totalFullDayLeaveCount = 0;
    this.totalHalfDayLeaveCount = 0;
    this.totalLeaveCount = 0;
    const allCountData = JSON.parse(JSON.stringify(this.DateWiseLeaveCount));
    let countArray = allCountData

    this.showPreviewList = [];
    let dateWiseArray = this.transform(this.leaveDataForm.controls['leaveData'].value, 'month');


    let leaveCalculationArrayData = [];
    let fromMonth = parseInt(moment(this.leaveTypeForm.value.fromDate).format('M'))
    let toMonth = parseInt(moment(this.leaveTypeForm.value.toDate).format('M'))
    let month = fromMonth

    for (let i = 0; i < dateWiseArray.length; i++) {
      let leaveCount = 0;
      if (parseInt(dateWiseArray[i].key) == month) {
        allCountData.forEach((x: any) => {
          if (x.month <= fromMonth) {
            leaveCount = x.leaveCount + leaveCount;
          }
        })
        let Obj = {
          month: fromMonth,
          leaveCount: leaveCount
        }
        leaveCalculationArrayData.push(Obj);
      }
      else if (fromMonth != toMonth) {
        allCountData.forEach((x: any) => {
          if (x.month == fromMonth) {
            let Obj = {
              month: fromMonth,
              leaveCount: x.leaveCount
            }
            leaveCalculationArrayData.push(Obj);
          }
        })

      }
      else if (fromMonth == toMonth) {
        allCountData.forEach((x: any) => {
          if (x.month == fromMonth) {
            let Obj = {
              month: fromMonth,
              leaveCount: x.leaveCount
            }
            leaveCalculationArrayData.push(Obj);
          }
        })

      }
      fromMonth++;
    }

    for (let i = 0; i < dateWiseArray.length; i++) {
      for (let k = 0; k < dateWiseArray[i].value?.length; k++) {

        const res = dateWiseArray[i].value[k];
        let leaveIs = res.leaveIs.toLowerCase().replace(/\s/g, '');

        if (!!leaveCalculationArrayData && leaveCalculationArrayData?.length > 0) {

          for (let j = 0; j < leaveCalculationArrayData.length; j++) {
            const countData = leaveCalculationArrayData[j];

            if (countData.month == parseInt(dateWiseArray[i].key)) {
              if (leaveIs == 'fullday') {
                if (countData.leaveCount >= 1) {
                  let obj = {
                    leaveTypeId: this.leaveTypeForm.value.leaveTypeId._id,
                    leaveTypeName: this.leaveTypeForm.value.leaveTypeId.leaveType,
                    leaveIs: 'fullDay',
                    date: new Date(res.date),
                    dayName: res.dayName
                  }
                  this.showPreviewList.push(obj);
                  countData.leaveCount--;
                  this.totalFullDayLeaveCount++;
                  this.totalLeaveCount++
                }
                else if (countData.leaveCount > 0 && countData.leaveCount < 1) {
                  let obj = {
                    leaveTypeId: this.leaveTypeForm.value.leaveTypeId._id,
                    leaveTypeName: this.leaveTypeForm.value.leaveTypeId.leaveType,
                    leaveIs: 'firstHalfDay',
                    date: new Date(res.date),
                    dayName: res.dayName
                  }
                  this.showPreviewList.push(obj);
                  countData.leaveCount = countData.leaveCount - 0.5;
                  this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
                  this.totalLeaveCount = 0.5 + this.totalLeaveCount

                  this.leaveTypeList.forEach((x: any) => {
                    let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
                    if (leaveTypeName == 'lossofpay') {
                      let obj = {
                        leaveTypeId: x._id,
                        leaveTypeName: x.leaveType,
                        leaveIs: 'secondHalfDay',
                        date: new Date(res.date),
                        dayName: res.dayName
                      }
                      this.showPreviewList.push(obj);
                      this.isLossOfPay = true
                    }
                  })

                }
                else {
                  this.leaveTypeList.forEach((x: any) => {
                    let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
                    if (leaveTypeName == 'lossofpay') {
                      let obj = {
                        leaveTypeId: x._id,
                        leaveTypeName: x.leaveType,
                        leaveIs: 'fullDay',
                        date: new Date(res.date),
                        dayName: res.dayName
                      }
                      this.showPreviewList.push(obj);
                      this.totalFullDayLeaveCount++;
                      this.isLossOfPay = true
                    }
                  })
                }
              }
              else if (leaveIs == 'firsthalfday') {
                if (countData.leaveCount >= 0.5) {
                  let obj = {
                    leaveTypeId: this.leaveTypeForm.value.leaveTypeId._id,
                    leaveTypeName: this.leaveTypeForm.value.leaveTypeId.leaveType,
                    leaveIs: 'firstHalfDay',
                    date: new Date(res.date),
                    dayName: res.dayName
                  }
                  this.showPreviewList.push(obj);
                  countData.leaveCount = countData.leaveCount - 0.5;
                  this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
                  this.totalLeaveCount = 0.5 + this.totalLeaveCount
                }
                else {
                  this.leaveTypeList.forEach((x: any) => {
                    let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
                    if (leaveTypeName == 'lossofpay') {
                      let obj = {
                        leaveTypeId: x._id,
                        leaveTypeName: x.leaveType,
                        leaveIs: 'firstHalfDay',
                        date: new Date(res.date),
                        dayName: res.dayName
                      }
                      this.showPreviewList.push(obj);
                      this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
                      this.isLossOfPay = true
                    }
                  })
                }
              }
              else if (leaveIs == 'secondhalfday') {
                if (countData.leaveCount >= 0.5) {
                  let obj = {
                    leaveTypeId: this.leaveTypeForm.value.leaveTypeId._id,
                    leaveTypeName: this.leaveTypeForm.value.leaveTypeId.leaveType,
                    leaveIs: 'secondHalfDay',
                    date: new Date(res.date),
                    dayName: res.dayName
                  }
                  this.showPreviewList.push(obj);
                  countData.leaveCount = countData.leaveCount - 0.5;
                  this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
                  this.totalLeaveCount = 0.5 + this.totalLeaveCount
                }
                else {
                  this.leaveTypeList.forEach((x: any) => {
                    let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
                    if (leaveTypeName == 'lossofpay') {
                      let obj = {
                        leaveTypeId: x._id,
                        leaveTypeName: x.leaveType,
                        leaveIs: 'secondHalfDay',
                        date: new Date(res.date),
                        dayName: res.dayName
                      }
                      this.showPreviewList.push(obj);
                      this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
                      this.isLossOfPay = true
                    }
                  })
                }
              }

              if (k + 1 == dateWiseArray[i].value?.length) {
                if (leaveCalculationArrayData.length > 1) {
                  leaveCalculationArrayData.forEach((data, index) => {
                    if (countData.month == data.month && data.leaveCount != 0) {
                      let newCount = data.leaveCount;
                      leaveCalculationArrayData.forEach((data1) => {
                        if (countData.month + 1 == data1.month) {
                          data1.leaveCount = newCount + data1.leaveCount;
                        }
                      })
                      data.leaveCount = 0
                    }
                    if (data.leaveCount == 0) {
                      leaveCalculationArrayData.splice(index, 1)
                    }
                  })
                }
              }
              break;
            }
            else {
              if (leaveIs == 'fullday') {
                this.leaveTypeList.forEach((x: any) => {
                  let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
                  if (leaveTypeName == 'lossofpay') {
                    let obj = {
                      leaveTypeId: x._id,
                      leaveTypeName: x.leaveType,
                      leaveIs: 'fullDay',
                      date: new Date(res.date),
                      dayName: res.dayName
                    }
                    this.showPreviewList.push(obj);
                    this.totalFullDayLeaveCount++;
                    this.isLossOfPay = true
                  }
                })
                // break;
              }
              else if (leaveIs == 'firsthalfday') {
                this.leaveTypeList.forEach((x: any) => {
                  let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
                  if (leaveTypeName == 'lossofpay') {
                    let obj = {
                      leaveTypeId: x._id,
                      leaveTypeName: x.leaveType,
                      leaveIs: 'firstHalfDay',
                      date: new Date(res.date),
                      dayName: res.dayName
                    }
                    this.showPreviewList.push(obj);
                    this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
                    this.isLossOfPay = true
                  }
                })
                // break;
              }
              else if (leaveIs == 'secondhalfday') {
                this.leaveTypeList.forEach((x: any) => {
                  let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
                  if (leaveTypeName == 'lossofpay') {
                    let obj = {
                      leaveTypeId: x._id,
                      leaveTypeName: x.leaveType,
                      leaveIs: 'secondHalfDay',
                      date: new Date(res.date),
                      dayName: res.dayName
                    }
                    this.showPreviewList.push(obj);
                    this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
                    this.isLossOfPay = true
                  }
                })
                // break;
              }
            }
          }
        }
        else {
          if (leaveIs == 'fullday') {
            this.leaveTypeList.forEach((x: any) => {
              let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
              if (leaveTypeName == 'lossofpay') {
                let obj = {
                  leaveTypeId: x._id,
                  leaveTypeName: x.leaveType,
                  leaveIs: 'fullDay',
                  date: new Date(res.date),
                  dayName: res.dayName
                }
                this.showPreviewList.push(obj);
                this.totalFullDayLeaveCount++;
                this.isLossOfPay = true
              }
            })
            // break;
          }
          else if (leaveIs == 'firsthalfday') {
            this.leaveTypeList.forEach((x: any) => {
              let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
              if (leaveTypeName == 'lossofpay') {
                let obj = {
                  leaveTypeId: x._id,
                  leaveTypeName: x.leaveType,
                  leaveIs: 'firstHalfDay',
                  date: new Date(res.date),
                  dayName: res.dayName
                }
                this.showPreviewList.push(obj);
                this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
                this.isLossOfPay = true
              }
            })
            // break;
          }
          else if (leaveIs == 'secondhalfday') {
            this.leaveTypeList.forEach((x: any) => {
              let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
              if (leaveTypeName == 'lossofpay') {
                let obj = {
                  leaveTypeId: x._id,
                  leaveTypeName: x.leaveType,
                  leaveIs: 'secondHalfDay',
                  date: new Date(res.date),
                  dayName: res.dayName
                }
                this.showPreviewList.push(obj);
                this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
                this.isLossOfPay = true
              }
            })
            // break;
          }
        }

      }


    }


    let appliedLeaveCount = 0;
    this.showPreviewList.forEach((x: any) => {
      let leaveTypeName = x.leaveTypeName.toLowerCase().replace(/\s/g, '');
      if (leaveTypeName != 'lossofpay') {
        let xyz = x.leaveIs == 'fullDay' ? 1 : 0.5;
        appliedLeaveCount = xyz + appliedLeaveCount
      }
    })

    this.selectedLeaveCountId = []

    for (let h = 0; h < allCountData.length; h++) {
      const getCount = allCountData[h];
      if (appliedLeaveCount > 0) {
        if (getCount.leaveCount <= appliedLeaveCount) {
          let remainingCount = appliedLeaveCount;
          appliedLeaveCount = appliedLeaveCount - getCount.leaveCount;
          remainingCount = remainingCount - appliedLeaveCount
          this.selectedLeaveCountId.push({ _id: getCount._id, leaveCount: getCount.leaveCount - remainingCount });
        }
        else if (getCount.leaveCount > appliedLeaveCount) {
          this.selectedLeaveCountId.push({ _id: getCount._id, leaveCount: appliedLeaveCount })
          appliedLeaveCount = appliedLeaveCount - appliedLeaveCount
        }
      }
      else {
        break
      }
    }



    $("#apply-leave-datewise-modal").modal('hide');
    $("#apply-leave-preview-modal").modal({ backdrop: 'static', keyboard: false});
    $("#apply-leave-preview-modal").modal('show');

  }

  // showPreviewListModal() {
  //   this.totalFullDayLeaveCount = 0;
  //   this.totalHalfDayLeaveCount = 0;
  //   this.totalLeaveCount = 0;
  //   this.showPreviewList = [];

  //   let leaveTypeListCount = this.fromDateWiseLeaveCount[0].LeaveTypeData;
  //   let remainSelectedLeaveCount;
  //   let remainSelectedLeaveCountForCalculation;
  //   for (let j = 0; j < leaveTypeListCount.length; j++) {
  //     if (this.leaveTypeForm.value.leaveTypeId._id === leaveTypeListCount[j]._id) {
  //       remainSelectedLeaveCountForCalculation = leaveTypeListCount[j].remainLeave
  //       remainSelectedLeaveCount = remainSelectedLeaveCountForCalculation
  //     }
  //   }

  //   for (let i = 0; i < this.leaveDataForm.controls.leaveData.value.length;) {
  //     let res = this.leaveDataForm.controls.leaveData.value[i];
  //     let leaveIs = res.leaveIs.toLowerCase().replace(/\s/g, '');

  //     if (leaveIs == 'fullday') {
  //       if (remainSelectedLeaveCount >= 1) {
  //         let obj = {
  //           leaveTypeId: this.leaveTypeForm.value.leaveTypeId._id,
  //           leaveTypeName: this.leaveTypeForm.value.leaveTypeId.leaveType,
  //           leaveIs: 'fullDay',
  //           date: new Date(res.date),
  //           dayName: res.dayName
  //         }
  //         this.showPreviewList.push(obj);
  //         remainSelectedLeaveCount--;
  //         this.totalFullDayLeaveCount++;
  //         this.totalLeaveCount++
  //       }
  //       else if (remainSelectedLeaveCount > 0 && remainSelectedLeaveCount < 1) {
  //         let obj = {
  //           leaveTypeId: this.leaveTypeForm.value.leaveTypeId._id,
  //           leaveTypeName: this.leaveTypeForm.value.leaveTypeId.leaveType,
  //           leaveIs: 'firstHalfDay',
  //           date: new Date(res.date),
  //           dayName: res.dayName
  //         }
  //         this.showPreviewList.push(obj);
  //         remainSelectedLeaveCount = remainSelectedLeaveCount - 0.5;
  //         this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
  //         this.totalLeaveCount = 0.5 + this.totalLeaveCount

  //         this.leaveTypeList.forEach((x: any) => {
  //           let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
  //           if (leaveTypeName == 'lossofpay') {
  //             let obj = {
  //               leaveTypeId: x._id,
  //               leaveTypeName: x.leaveType,
  //               leaveIs: 'secondHalfDay',
  //               date: new Date(res.date),
  //               dayName: res.dayName
  //             }
  //             this.showPreviewList.push(obj);
  //             this.isLossOfPay = true
  //           }
  //         })
  //       }
  //       else {
  //         this.leaveTypeList.forEach((x: any) => {
  //           let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
  //           if (leaveTypeName == 'lossofpay') {
  //             let obj = {
  //               leaveTypeId: x._id,
  //               leaveTypeName: x.leaveType,
  //               leaveIs: 'fullDay',
  //               date: new Date(res.date),
  //               dayName: res.dayName
  //             }
  //             this.showPreviewList.push(obj);
  //             this.totalFullDayLeaveCount++;
  //             this.isLossOfPay = true
  //           }
  //         })
  //       }
  //     }
  //     else if (leaveIs == 'firsthalfday') {
  //       if (remainSelectedLeaveCount >= 0.5) {
  //         let obj = {
  //           leaveTypeId: this.leaveTypeForm.value.leaveTypeId._id,
  //           leaveTypeName: this.leaveTypeForm.value.leaveTypeId.leaveType,
  //           leaveIs: 'firstHalfDay',
  //           date: new Date(res.date),
  //           dayName: res.dayName
  //         }
  //         this.showPreviewList.push(obj);
  //         remainSelectedLeaveCount = remainSelectedLeaveCount - 0.5;
  //         this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
  //         this.totalLeaveCount = 0.5 + this.totalLeaveCount
  //       }
  //       else {
  //         this.leaveTypeList.forEach((x: any) => {
  //           let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
  //           if (leaveTypeName == 'lossofpay') {
  //             let obj = {
  //               leaveTypeId: x._id,
  //               leaveTypeName: x.leaveType,
  //               leaveIs: 'firstHalfDay',
  //               date: new Date(res.date),
  //               dayName: res.dayName
  //             }
  //             this.showPreviewList.push(obj);
  //             this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
  //             this.isLossOfPay = true
  //           }
  //         })
  //       }
  //     }
  //     else if (leaveIs == 'secondhalfday') {
  //       if (remainSelectedLeaveCount >= 0.5) {
  //         let obj = {
  //           leaveTypeId: this.leaveTypeForm.value.leaveTypeId._id,
  //           leaveTypeName: this.leaveTypeForm.value.leaveTypeId.leaveType,
  //           leaveIs: 'secondHalfDay',
  //           date: new Date(res.date),
  //           dayName: res.dayName
  //         }
  //         this.showPreviewList.push(obj);
  //         remainSelectedLeaveCount = remainSelectedLeaveCount - 0.5;
  //         this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
  //         this.totalLeaveCount = 0.5 + this.totalLeaveCount
  //       }
  //       else {
  //         this.leaveTypeList.forEach((x: any) => {
  //           let leaveTypeName = x.leaveType.toLowerCase().replace(/\s/g, '');
  //           if (leaveTypeName == 'lossofpay') {
  //             let obj = {
  //               leaveTypeId: x._id,
  //               leaveTypeName: x.leaveType,
  //               leaveIs: 'secondHalfDay',
  //               date: new Date(res.date),
  //               dayName: res.dayName
  //             }
  //             this.showPreviewList.push(obj);
  //             this.totalHalfDayLeaveCount = 0.5 + this.totalHalfDayLeaveCount;
  //             this.isLossOfPay = true
  //           }
  //         })
  //       }
  //     }
  //     i++;
  //   }

  //   // this.leaveDataForm.controls.leaveData.value.forEach((res: any) => {

  //   // })
  //   $("#apply-leave-datewise-modal").modal('hide');
  //   $("#apply-leave-preview-modal").modal({ backdrop: 'static', keyboard: false, show: true });
  // }

  saveLeaveDateWise() {
    let leaveDataArray: any = [];
    this.showPreviewList.forEach((res: any) => {
      let Obj = {
        leaveTypeId: res.leaveTypeId,
        leaveIs: res.leaveIs,
        date: moment(res.date).format('D/M/yyyy'),
      }
      leaveDataArray.push(Obj);
    })

    const loginUserStr = localStorage.getItem("LoginUserData");

    if (!loginUserStr) {
      console.error("LoginUserData not found in localStorage.");
      return; // or handle accordingly
    }

    const loginUser = JSON.parse(loginUserStr);
    let leaveDateWiseObj = {
      employeeId: loginUser.employeeId,
      fromDate: moment(this.leaveTypeForm.controls['fromDate'].value).format('D/M/yyyy'),
      toDate: moment(this.leaveTypeForm.controls['toDate'].value).format('D/M/yyyy'),
      leaveTypeId: this.leaveTypeForm.controls['leaveTypeId'].value._id,
      leaveapprovedby: this.leaveTypeForm.controls['leaveapprovedby'].value,
      reason: this.leaveTypeForm.controls['reason'].value,
      totalFullDayLeave: this.totalFullDayLeaveCount,
      totalHalfDayLeave: this.totalHalfDayLeaveCount,
      leaveCount: this.totalLeaveCount,
      leaveData: leaveDataArray,
      isLossOfPay: this.isLossOfPay
    }

    this.frontLayoutService.saveLeaveDateWise(leaveDateWiseObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        if (this.totalLeaveCount > 0) {
          let Obj = {
            updateArray: this.selectedLeaveCountId
          }
          this.frontLayoutService.updateLeaveCountData(Obj).subscribe((response: any) => {
            if (response.meta.code == 200) {
              this.defaultForm();
              this.defaultLeaveDataForm();
              $("#apply-leave-preview-modal").modal('hide');
              swal({
                // title: "Check In",
                text: "Your Leave is apply successfully.",
                icon: "success",
                timer: 1500,
                buttons: [false]
              });
              this.getLeaveTypeList()
              this.getLeaveListData();
            }
            else {
              swal({
                // title: "Check In",
                text: response.meta.message,
                icon: "error",
                timer: 1500,
                buttons: [false]
              });
            }
          })
        }
        else {
          this.defaultForm();
          this.defaultLeaveDataForm();
          $("#apply-leave-preview-modal").modal('hide');
          swal({
            // title: "Check In",
            text: "Your Leave is apply successfully.",
            icon: "success",
            timer: 1500,
            buttons: [false]
          });
          this.getLeaveTypeList()
          this.getLeaveListData();
        }
      }
      else {
        swal({
          // title: "Check In",
          text: Response.meta.message,
          icon: "error",
          timer: 1500,
          buttons: [false]
        });
      }
    })

  }

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

  getLeaveListData() {
    this.frontLayoutService.getLeaveListByUserWise().subscribe((Response: any) => {
      this.monthWiseLeaveList = []
      if (Response.meta.code == 200) {
        this.monthWiseLeaveList = Response.data.sort((a: any, b: any) => {
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

  getLeaveListByEmpLeaveID(leaveId: any) {
    const userDataStr = localStorage.getItem("LoginUserData");

    if (!userDataStr) {
      console.error("LoginUserData not found in localStorage.");
      return;
    }

    const loginUserData = JSON.parse(userDataStr);

    let Obj = {
      leaveID: leaveId,
      employeeId: loginUserData?.employeeId
    };
    this.frontLayoutService.getLeaveListByLeaveID(Obj).subscribe((Response: any) => {
      this.leaveListByLeaveId = []
      if (Response.meta.code == 200) {
        this.leaveListByLeaveId = Response.data.sort((a: any, b: any) => {
          let Adate = new Date(a.date.split('/')[2] + '-' + a.date.split('/')[1] + '-' + a.date.split('/')[0]);
          let Bdate = new Date(b.date.split('/')[2] + '-' + b.date.split('/')[1] + '-' + b.date.split('/')[0])
          return (Adate < Bdate ? -1 : 1) * (true ? 1 : -1)
        });
        $("#leave-List-LeaveID-modal").modal({ backdrop: 'static', keyboard: false});
        $("#leave-List-LeaveID-modal").modal('show');

        this.noDataForLeave = false;
      }
      else {
        this.noDataForLeave = true;
      }
    })
  }
  cancelLeaveListLeaveIdModal() {
    this.leaveListByLeaveId = []
    $("#leave-List-LeaveID-modal").modal('hide');
  }


  cancleLeaveList(id: any) {

    swal({
      title: 'Cancle Leave',
      text: 'Are you sure want to cancle this leave ?',
      icon: "warning",
      closeOnClickOutside: false,
      buttons: ['Cancel', true],
      dangerMode: true,
    }).then((willDelete: any) => {
      if (willDelete) {
        let Obj = {
          _id: id,
          leaveStatus: 4
        }
        this.frontLayoutService.updateLeaveStatus(Obj).subscribe((Response: any) => {
          if (Response.meta.code == 200) {
            this.leaveListByLeaveId = []
            this.getLeaveCount()
            this.getLeaveTypeList()
            this.getLeaveListData();
          }
        })
      }
    })




  }

}
