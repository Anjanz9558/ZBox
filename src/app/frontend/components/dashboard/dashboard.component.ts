import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { SocketIOService } from '../../../layout/front-layout/socket-io.service';
import { CommonService } from '../../../shared/common.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FrontLayoutService } from '../../../layout/front-layout/front-layout.service';
declare const $: any;
import moment from 'moment';
import { ConfirmDirective } from '../../../shared/directives/common.directive';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, GroupByPipe, NiceTimePipe } from '../../../shared/pipe/common.pipe';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ConfirmDirective,
    NgSelectModule,
    // BrowserAnimationsModule,
    RouterModule,
    NiceTimePipe,
    GroupByPipe,
    ArraySortPipeDesc,
    ArraySortPipeAsc,
    ArraySortPipeSimple,
    FilterPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  initTimer: boolean = true;
  distance_minutes: number = 498; // Total timer duration in minutes
  animation_id: number | null = null;
  elapsed_time_minutes: number = 0; // Minutes completed based on production time
  time_left: number = 0;
  remaining_time: number = 0;
  ip: any;
  statusList: any = [];
  allPendingAttendanceList: any[] = [];
  dayreportForm!: FormGroup;
  leaveOrWFHForm!: FormGroup;
  actionList = [
    { value: 1, name: 'Punch In at' },
    { value: 2, name: 'Punch Out at' },
    { value: 3, name: 'Break Start at' },
    { value: 4, name: 'Break End at' },
  ];

  noData: boolean = false;
  dailyReportList: any[] = [];
  breakTime: string = "00:00:00";
  Production: string = "00:00:00";
  productionTime: string = "00:00:00";
  totalTime: string = "00:00:00";
  totalTimeSW: any;
  breakTimeSW: any;

  counter: number = 0;
  timerRef: any = null;
  clock: any;
  minutes: any = '00';
  seconds: any = '00';
  milliseconds: any = '00';
  hours: any = '00';
  oldBreakCount: any = 0;
  breakTimeInterval: any = null;
  productionInterval: any = null;
  totalTimeAfterCheckOut: string = "00:00:00";
  date: any = new Date();
  currentDate: any;
  currentTime: any;
  get fData(): { [key: string]: AbstractControl } {
    return this.dayreportForm.controls;
  }
  submitData: boolean = false;

  checkInTimeInDate: any = "-";
  isCheckIn: boolean = false;
  checkOutTimeInDate: any = "-";
  isCheckOut: boolean = false;
  isBreak: boolean = false;
  isBreakStart: boolean = false;
  ipAddress: any = '';
  ipAddressList: any = [];
  count = 0;
  deviceInfo: any;
  os: any;
  deviceType: any;
  todayDate = new Date()
  loginUserData = localStorage.getItem('LoginUserData');

  constructor(
    private socketIOService: SocketIOService,
    private deviceService: DeviceDetectorService,
    private datePipe: DatePipe,
    public commonService: CommonService,
    private fb: FormBuilder,
    private frontLayoutService: FrontLayoutService
  ) {

    this.deviceInfo = this.deviceService.getDeviceInfo();


    this.os = this.deviceService.getDeviceInfo().os;
    this.deviceType = this.deviceService.getDeviceInfo().deviceType;

    this.socketIOService.getBreakListner().subscribe((response: any) => {
      console.log("breakListner");
      this.getDailyReportList()
      let audio: HTMLAudioElement = new Audio('assets/audio/MessageTone.mp3');
      audio.play();

    })

  }

  ngOnInit() {
    this.currentDate = this.datePipe.transform(new Date(), "dd/MM/yyyy");
    this.currentTime = this.datePipe.transform(new Date(), "hh:mm:ss a");
    this.activeIpAddressList();
    this.defaultForm();
    this.defaultLeaveWFHForm();
    this.defaultManualBreakForm();
    setInterval((x: any) => {
      this.refreshTime()
    },
      1000)
    this.getDailyReportList();
    this.getMinutesHours();
    this.getHolidayList();
    this.getLeaveList();
    this.getAssignPersonList();
    this.getLeaveAndWFHList();
    this.getBirthdayList();
  }


  // get holiday list
  holidayList: any[] = [];
  leaveList: any[] = [];
  leaveListCount: number = 0;
  birthdayList: any[] = [];
  assignPersonUserStatusList: any[] = [];
  assignPersonWFHList: any[] = [];
  assignPersonLeaveList: any[] = [];
  allPersonWFHList: any[] = [];
  allPersonLeaveList: any[] = [];


  noHolidaydata = false;
  noBirthdaydata = false;
  noLeavedata = false;
  holidayUpcomingData: any
  birthdayUpcomingData: any
  currentYear: number = 0;

  getHolidayList() {
    this.holidayList = [];
    let Obj = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1
    }
    this.frontLayoutService.getHolidayListDataEmp(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.holidayList = Response.data;
        let upcomingHolidayData = Response.data.filter((x: any) => new Date(x.date) > new Date()).sort((a: any, b: any) => a.date - b.date);
        this.holidayUpcomingData = upcomingHolidayData[0];
        // this.holidayUpcomingData1 = upcomingHolidayData[1];

        this.noHolidaydata = false;
      }
      else {
        this.noHolidaydata = true;
      }
    })
  }

  getBirthdayList() {
    this.birthdayList = [];

    // this.frontLayoutService.getBirthdayListDataEmp().subscribe((Response: any) => {
    //   this.birthdayList = Response.data;
    //   console.log(this.birthdayList);
    // console.log("done");

    this.frontLayoutService.getBirthdayListDataEmp().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.birthdayList = Response.data;
        console.log("print :", this.birthdayList);
        console.log("done");

        this.birthdayList = this.birthdayList.map((employee: any) => {
          const dobParts = employee.dob.split('-');
          const dobDayMonth = `${dobParts[0]}-${dobParts[1]}`;
          return { ...employee, dob: dobDayMonth };
        });

        let upcomingBirthdayData = this.birthdayList.filter((employee: any) => {
          // Extract month and day from the dob field
          const dobMonth = Number(employee.dob.split('-')[1]);
          const dobDay = Number(employee.dob.split('-')[0]);

          // Get current month and day
          const currentMonth = new Date().getMonth() + 1;
          const currentDay = new Date().getDate();

          // Check if the birthday month and day are greater than or equal to the current month and day
          return (dobMonth > currentMonth) || (dobMonth === currentMonth && dobDay >= currentDay);
        });

        this.birthdayList.sort((a: any, b: any) => {
          const [dayA, monthA] = a.dob.split('-').map(Number);
          const [dayB, monthB] = b.dob.split('-').map(Number);

          if (monthA === monthB) {
            return dayA - dayB; // Sort by day if the months are the same
          }
          return monthA - monthB; // Otherwise, sort by month
        });

        // Sort the upcoming birthdays by month and day
        upcomingBirthdayData.sort((a: any, b: any) => {
          const dobMonthA = Number(a.dob.split('-')[1]);
          const dobDayA = Number(a.dob.split('-')[0]);
          const dobMonthB = Number(b.dob.split('-')[1]);
          const dobDayB = Number(b.dob.split('-')[0]);

          if (dobMonthA === dobMonthB) {
            return dobDayA - dobDayB;
          }
          return dobMonthA - dobMonthB;
        });

        upcomingBirthdayData = upcomingBirthdayData.map((employee: any) => {
          const dobParts = employee.dob.split('-');
          const dobDayMonth = `${dobParts[0]}-${dobParts[1]}`;
          return { ...employee, dob: dobDayMonth };
        });

        this.currentYear = new Date().getFullYear();
        // Set the first upcoming birthday data
        // this.upcomingBirthdayData = upcomingBirthdayData[0];
        this.birthdayUpcomingData = upcomingBirthdayData[0];

        this.noBirthdaydata = false;
      }
      else {
        this.noBirthdaydata = true;
      }
    })
  }



  getLeaveList() {
    this.leaveList = [];

    let Obj = {
      _id: this.loginUserData ? JSON.parse(this.loginUserData).employeeId : '',
    }
    this.frontLayoutService.getLeaveListDataEmp(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        let date = Response.data.filter((x: any) => {
          let dateData = x.date.split('/')[2] + '-' + x.date.split('/')[1] + '-' + x.date.split('/')[0]
          x.date = new Date(dateData);
          return x.date
        });
        this.leaveList = date.filter((x: any) => x.leaveStatus == 2).sort((a: any, b: any) => a.date - b.date)

        let leaveCount = 0;
        this.leaveList.filter((x: any) => {
          if (x.leaveIs == "firstHalfDay" || x.leaveIs == "secondHalfDay") {
            leaveCount = leaveCount + 0.5;
          }
          else if (x.leaveIs == 'fullDay') {
            leaveCount++;
          }

        })
        this.leaveListCount = leaveCount
        this.noLeavedata = false;
      }
      else {
        this.noLeavedata = true;
      }
    })
  }

  dayNotStartList: any[] = [];
  inWorkingList: any[] = [];
  inBreakList: any[] = [];
  dayEndList: any[] = [];
  // dayNotStartList: any[] = [];

  getAssignPersonList() {

    this.assignPersonUserStatusList = [];
    this.assignPersonWFHList = [];
    this.assignPersonLeaveList = [];

    this.frontLayoutService.getAssignListDataEmp().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.assignPersonUserStatusList = Response.data.userStatus;

        this.dayNotStartList = this.assignPersonUserStatusList.filter((x: any) => x.userStatus == 'Day Not Start');
        this.inWorkingList = this.assignPersonUserStatusList.filter((x: any) => x.userStatus == 'In Working');
        this.inBreakList = this.assignPersonUserStatusList.filter((x: any) => x.userStatus == 'In Break');
        this.dayEndList = this.assignPersonUserStatusList.filter((x: any) => x.userStatus == 'Day End');
        // this.dayNotStartList = this.assignPersonUserStatusList.filter((x: any) => x.userStatus == 'Day Not Start');

        this.assignPersonWFHList = Response.data.WorkFromHome;
        this.assignPersonLeaveList = Response.data.LeaveData;
      }
    })
  }


  getLeaveAndWFHList() {

    this.allPersonWFHList = [];
    this.allPersonLeaveList = [];

    this.frontLayoutService.getAllEmpLeaveWFH().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.allPersonWFHList = Response.data.WorkFromHome;
        this.allPersonLeaveList = Response.data.LeaveData;
      }
    })
  }

  stopWatch(count: any) {

    // let counter = Math.abs(new Date(startTime).getTime() - new Date(endTime).getTime());
    let counter = count;
    let hours: any = Math.floor((counter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes: any = Math.floor((counter % (1000 * 60 * 60)) / (1000 * 60));
    let seconds: any = Math.floor((counter % (1000 * 60)) / 1000);
    if (counter < 0) {
    }
    if (Number(hours) < 10) {
      hours = '0' + hours;
    } else {
      hours = '' + hours;
    }
    if (Number(minutes) < 10) {
      minutes = '0' + minutes;
    } else {
      minutes = '' + minutes;
    }
    if (Number(seconds) < 10) {
      seconds = '0' + seconds;
    } else {
      seconds = '' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds
  }


  defaultForm() {
    this.dayreportForm = this.fb.group({
      action: [null, [Validators.required]],
    });
  }
  defaultLeaveWFHForm() {
    this.leaveOrWFHForm = this.fb.group({
      searchBy: ['1'],
    })
  }
  refreshTime() {
    this.currentDate = this.datePipe.transform(new Date(), "dd/MM/yyyy");
    this.currentTime = this.datePipe.transform(new Date(), "hh:mm:ss a");
  }
  getIPAddress(x: any) {
    this.frontLayoutService.getIPAddress().subscribe((res: any) => {
      this.ipAddress = res.ipString;

      let title = '';
      let text = '';
      if (x == 2) {
        title = 'Checkout'
        text = 'Are you sure want to checkout ?'
      }
      else if (x == 3) {
        this.pause_timer();
        title = 'Break Start'
        text = 'Are you sure want to start Break ?'
      }
      else if (x == 4) {
        this.start_timer();
        title = 'Break Out'
        text = 'Are you sure want to end Break ?'
      }


      if (x == 2 || x == 3 || x == 4) {
        swal({
          title: title,
          text: text,
          icon: "warning",
          closeOnClickOutside: false,
          buttons: ['Cancel', true],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            this.saveDayreport(x);
          }
        })
      }
      else if (x == 1) {
        if (this.count == 0) {
          this.saveDayreport(x);
          this.count++
        }
      }

    })
  }

  activeIpAddressList() {
    this.frontLayoutService.activeIpAddressList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.ipAddressList = Response.data;

      }
    })
  }
  saveDayreport(x: any) {

    this.oldBreakCount = 0;
    //current ist date in utc format
    // let dateTime = moment().format("yyyy-MM-DDTH:mm:ss") + "Z";


    // let ipCheck = false;
    // for (let i = 0; i < this.ipAddressList.length; i++) {
    //   if (this.ipAddressList[i].ipAddress == this.ipAddress) {
    //     ipCheck = true;
    //     break;
    //   }
    // }
    // if (ipCheck === true) {
    let obj = {
      "ipAddress": this.ipAddress,
      "dayReportType": x,
      // "dateTime": dateTime
    }

    this.frontLayoutService.SaveDayReportMaster(obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.submitData = false;
        // window.location.reload();
        this.getDailyReportList();
        this.defaultForm();
        if (x == 1) {
          swal({
            // title: "Check In",
            text: "Your Check In Successfully.",
            icon: "success",
            timer: 1500,
            buttons: [false]
          });
        }
        else if (x == 2) {
          swal({
            // title: "Check Out",
            text: "Your Check Out Successfully.",
            icon: "success",
            timer: 1500,
            buttons: [false]
          });
        }
        else if (x == 3) {
          swal({
            // title: "Break Start",
            text: "Your Break Start Successfully.",
            icon: "success",
            timer: 1500,
            buttons: [false]
          });
        }
        else if (x == 4) {
          swal({
            // title: "Your Break Out Successfully.",
            text: "Your Break Out Successfully.",
            icon: "success",
            timer: 1500,
            buttons: [false]
          });
        }
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
      else if (Response.meta.code == 420) {
        swal({
          title: "Are you sure to checkout Previous Day ?",
          text: "Please yesterday check out, After you can Check In !",
          icon: "warning",
          closeOnClickOutside: false,
          buttons: ['Cancel', true],
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {

            let ipObj = {
              ipAddress: this.ipAddress
            }
            this.frontLayoutService.previousDayCheckout(ipObj).subscribe((Response: any) => {
              if (Response.meta.code == 200) {
                this.count--;
                swal({
                  // title: "Check In",
                  text: "Your Previous Day Checkout Successfully !",
                  icon: "success",
                  timer: 1500,
                  buttons: [false]
                });
                // swal("Your Previous Day Checkout Successfully !", {
                //   icon: "success",
                // });
              }
            })


          } else {
            this.count--;
            swal("Your are not checkout previous day, Please checkout previous day !");
          }
        });
      }
      else if (Response.meta.code == 1010) {
        this.count--
        swal({
          // title: "Break Start",
          text: Response.meta.message,
          icon: "error",
          timer: 1500,
          buttons: [false]
        });
      }
      else {
        this.count--;
        swal({
          // title: "Break Start",
          text: Response.meta.message,
          icon: "error",
          timer: 1500,
          buttons: [false]

        });
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error: any) => {
      swal({
        // title: "Break Start",
        text: error.message,
        icon: "error",
        timer: 1500,
        buttons: [false]
      });

      // this.commonService.notifier.notify('error', error.error.error);

    })
    // }
    // else {
    //   swal({
    //     // title: "Break Start",
    //     text: "Please Connect Diyan Wifi.",
    //     icon: "error",
    //     timer: 1500,
    //     buttons: [false]
    //   });
    //   // this.commonService.notifier.notify('error', "Please Connect Diyan Wifi.");
    // }
  }

  breakButtonDisabled: boolean = false;

  getDailyReportList() {
    let LoginUserData = JSON.parse(this.loginUserData ? this.loginUserData : '')
    let params = {
      employeeId: LoginUserData.employeeId,
      fromDate: this.datePipe.transform(new Date(), "d-M-yyyy")
    }
    this.frontLayoutService.getDailyReportList(params).subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        let data = Response.data

        // chechin time and check out time
        data.checkInTimeInDate = moment(data.checkInTimeInDate).subtract(5, 'hour').subtract(30, 'minute').toJSON();
        data.checkOutTimeInDate = moment(data.checkOutTimeInDate).subtract(5, 'hour').subtract(30, 'minute').toJSON();

        let listData: any = [];

        if (data.isCheckIn === true) {

          // jo checkout na karyu hoy to 
          if (data.isCheckOut === false) {
            this.timerRef = setInterval(() => {
              let count = Math.abs(new Date(data.checkInTimeInDate).getTime() - new Date().getTime());
              this.totalTime = this.stopWatch(count);
            }, 1000);
          }
          // jo checkout hoy to
          else if (data.isCheckOut === true) {
            clearInterval(this.timerRef)
          }

          let checkInObj = {
            dayReportType: 1,
            dateTime: data.checkInTimeInDate
          }
          this.date = data.checkInTimeInDate
          this.checkInTimeInDate = this.datePipe.transform(data.checkInTimeInDate, 'dd MMM, yyyy hh:mm:ss a')
          this.isCheckIn = true
          listData.push(checkInObj);
        }
        else {
          this.checkInTimeInDate = "-";
          this.isCheckIn = false;
        }

        // for break calculate
        if (data?.breakManagementData.length > 0) {

          let breakTime: any = 0
          let breakStartTime: any = 0;
          let breakStartingsTime: any = 0;
          let breakStartCount = 0;

          let isLunchBreak = false;

          data.breakManagementData.forEach((x: any) => {

            x.breakStartTime = moment(x.breakStartTime).subtract(5, 'hour').subtract(30, 'minute').toJSON();

            let breakStartObj = {
              dayReportType: 3,
              dateTime: x.breakStartTime,
              isLunchBreak: ''
            }

            if (x.isLunchBreak === true) {
              breakStartObj.isLunchBreak = '(Lunch Break Start)'
            }
            listData.push(breakStartObj);

            this.isBreak = true;

            if (x.isOnBreak === false) {
              x.breakEndTime = moment(x.breakEndTime).subtract(5, 'hour').subtract(30, 'minute').toJSON();

              let breakEndObj = {
                dayReportType: 4,
                dateTime: x.breakEndTime,
                isLunchBreak: ''
              }

              if (x.isLunchBreak === true) {
                breakEndObj.isLunchBreak = '(Lunch Break End)'
              }
              listData.push(breakEndObj);

              this.isBreak = false;

              // let stopCount = this.stopWatch(x.breakStartTime, x.breakEndTime)
              let stopCount = Math.abs(new Date(x.breakStartTime).getTime() - new Date(x.breakEndTime).getTime());
              breakTime = breakTime + stopCount
            }

            if (x.isOnBreak === true) {

              isLunchBreak = x.isLunchBreak;

              breakStartCount = breakStartCount + 1;
              breakStartTime = x.breakStartTime;
              breakStartingsTime = x.breakStartTime;

              if (isLunchBreak === true) {
                let breakStartingTime = new Date(breakStartingsTime);
                let breakCurrentTime = new Date();
                let getMinutes = this.diff_minutes(breakCurrentTime, breakStartingTime);

                if (getMinutes > 50) {

                  isLunchBreak = false;
                  this.breakButtonDisabled = false;
                }
                else {
                  this.breakButtonDisabled = true;
                }

              }
            }
          });

          this.oldBreakCount = breakTime;
          // setTimeout(() => {
          if (breakStartCount == 0) {
            this.breakTime = this.stopWatch(breakTime);
            clearInterval(this.breakTimeInterval);
          }
          else {
            this.breakTimeInterval = setInterval((x: any) => {
              clearInterval(this.productionInterval);

              if (isLunchBreak === true) {
                let breakStartingTime = new Date(breakStartingsTime);
                let breakCurrentTime = new Date();
                let getMinutes = this.diff_minutes(breakCurrentTime, breakStartingTime);
                console.log("get Minutes diff ", getMinutes);

                if (getMinutes >= 50) {

                  isLunchBreak = false;
                  this.breakButtonDisabled = false;
                }
                else {
                  this.breakButtonDisabled = true;
                }

              }

              let transformedStartTime = this.datePipe.transform(new Date(breakStartTime), 'HH:mm:ss');
              let startTime = transformedStartTime ? transformedStartTime.split(":") : ['00', '00', '00'];
              let startDate = new Date(0, 0, 0, +startTime[0], +startTime[1], +startTime[2]);

              let transformedEndTime = this.datePipe.transform(new Date(), 'HH:mm:ss');
              let endTime = transformedEndTime ? transformedEndTime.split(":") : ['00', '00', '00'];
              let endDate = new Date(0, 0, 0, +endTime[0], +endTime[1], +endTime[2]);


              breakStartTime = new Date(startDate).getTime();



              let breakTimeAll = Math.abs(breakStartTime - new Date(endDate).getTime());
              this.getBreakTime(breakTimeAll);
            }, 1000);



          }
          // }, 50);
          if (data.isCheckIn === true && data.isCheckOut === false) {
            this.productionInterval = setInterval((x: any) => {
              this.getProductionTime()
            },
              1000)
          }

        } else if (data.isCheckOut === false) {
          this.productionInterval = setInterval((x: any) => {
            this.getProductionTime()
          },
            1000)
        }

        if (data.isCheckOut === true) {
          let checkOutObj = {
            dayReportType: 2,
            dateTime: data.checkOutTimeInDate
          }
          this.checkOutTimeInDate = this.datePipe.transform(data.checkOutTimeInDate, 'dd MMM, yyyy hh:mm:ss a')
          this.isCheckOut = true
          listData.push(checkOutObj);
          //this.getTotalTime(this.datePipe.transform(new Date(data.checkInTimeInDate), 'hh:mm:ss'), this.datePipe.transform(new Date(data.checkOutTimeInDate), 'hh:mm:ss'))
          //let total = this.diff_minutes(data.checkOutTimeInDate, data.checkInTimeInDate)
          //this.totalTime = this.minutesTohhmm(total)
          clearInterval(this.timerRef)
          clearInterval(this.productionInterval)
          let count = Math.abs(new Date(data.checkInTimeInDate).getTime() - new Date(data.checkOutTimeInDate).getTime());
          this.totalTimeAfterCheckOut = this.stopWatch(count);
          this.getProductionTime();
        } else {
          this.checkOutTimeInDate = "-";
          this.isCheckOut = false;
        }

        this.dailyReportList = listData;

        if (this.dailyReportList.length == 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      } else {
        this.noData = true;
      }
      //for select sub industry step
    }, (error) => {
    });
  }

  getBreakTime(count: any) {
    this.breakTime = this.stopWatch(count + this.oldBreakCount);

    let startTime: any = this.breakTime.split(":");
    let endTime: any = this.totalTime.split(":");
    let startDate = new Date(0, 0, 0, startTime[0], startTime[1], startTime[2]);
    let endDate = new Date(0, 0, 0, endTime[0], endTime[1], endTime[2]);
    let Count = Math.abs(new Date(startDate).getTime() - new Date(endDate).getTime());
    this.productionTime = this.stopWatch(Count);
  }

  diff_minutes(dt2: any, dt1: any) {

    var diff = (new Date(dt2).getTime() - new Date(dt1).getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));

  }
  minutesTohhmm(x: any) {
    var MINUTES = x; //some integer
    var m = MINUTES % 60;
    var h = (MINUTES - m) / 60;
    var HHMM = (h < 10 ? "0" : "") + h.toString() + ":" + (m < 10 ? "0" : "") + m.toString() + ':00';
    return HHMM;
  };

  getProductionTime() {

    let breakTimes;
    if (this.breakTime == "00:00") {
      breakTimes = "00:00:00"
    }
    else {
      breakTimes = this.breakTime
    }
    let startTime: any = breakTimes.split(":");
    let endTime: any
    if (this.isCheckOut === false) {
      endTime = this.totalTime.split(":");
    } else if (this.isCheckOut === true) {
      endTime = this.totalTimeAfterCheckOut.split(":");
    }
    let startDate = new Date(0, 0, 0, startTime[0], startTime[1], startTime[2]);
    let endDate = new Date(0, 0, 0, endTime[0], endTime[1], endTime[2]);
    let Count = Math.abs(new Date(startDate).getTime() - new Date(endDate).getTime());
    this.productionTime = this.stopWatch(Count);
    console.log(this.productionTime)

    if (this.initTimer == true) {
      this.initialize_timer(this.productionTime);
      this.initTimer = false;
    }
  }


  manualBreakForm!: FormGroup;
  get fManualBreakData() { return this.manualBreakForm.controls; }
  hourList: any[] = [];
  minitesList: any[] = [];
  submittedManualBreak: boolean = false;

  getMinutesHours() {
    let date = new Date();
    for (let i = 10; i < 34; i++) {
      date.setHours(i);
      date.setMinutes(0);

      let time = {
        value: moment(date).format('HH'),
        name: moment(date).format('hh A')
      }
      this.hourList.push(time);
    }

    for (let minutes = 0; minutes < 60; minutes = minutes + 1) {
      date.setHours(6);
      date.setMinutes(minutes);
      let time = {
        value: moment(date).format('mm'),
        name: moment(date).format('mm')
      }
      this.minitesList.push(time);
    }

  }


  defaultManualBreakForm() {
    this.manualBreakForm = this.fb.group({
      breakStartHours: [null, [Validators.required]],
      breakStartMinutes: [null, [Validators.required]],
      breakEndHours: [null, [Validators.required]],
      breakEndMinutes: [null, [Validators.required]],
    })
  }

  openViewActivityModal() {
    // this.defaultManualBreakForm();
    // this.submittedManualBreak = false;
    $("#todayActivityModal").modal('show');
  }
  cancleViewActivityModal() {
    $("#todayActivityModal").modal('hide');
  }
  addManualBreakPopup() {
    this.defaultManualBreakForm();
    this.submittedManualBreak = false;
    $("#break-add-manually").modal({ backdrop: 'static', keyboard: false, show: true });
  }
  listShowType: any;
  showList(type: any) {
    this.listShowType = type
    $("#current-status-modal").modal({ backdrop: 'static', keyboard: false, show: true });
  }
  cancleCurrentStatusModal() {
    $("#current-status-modal").modal('hide');
  }

  cancleManualBreakModal() {
    $("#break-add-manually").modal('hide');
  }

  addManualBreak() {
    if (this.manualBreakForm.invalid) {
      this.submittedManualBreak = true;
      return;
    }

    let todayDate = moment().format('yyyy-MM-DD');
    let starttime = this.manualBreakForm.value.breakStartHours + ":" + this.manualBreakForm.value.breakStartMinutes;
    let endtime = this.manualBreakForm.value.breakEndHours + ":" + this.manualBreakForm.value.breakEndMinutes;

    let Obj = {
      breakStartTime: moment(new Date(todayDate + ' ' + starttime)).format('yyyy-MM-DDTHH:mm:ss') + "Z",
      breakEndTime: moment(new Date(todayDate + ' ' + endtime)).format('yyyy-MM-DDTHH:mm:ss') + "Z"
    }

    this.frontLayoutService.manuallyBreakAdd(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.submittedManualBreak = false;
        this.defaultManualBreakForm();
        this.getDailyReportList();
        $("#break-add-manually").modal('hide');
      }
      else {
        swal({
          // title: "Check In",
          text: Response.meta.message,
          icon: "success",
          timer: 1500,
          buttons: [false]
        });
      }
    })
  }


  startBreak() {
    // this.frontLayoutService.startAllEmpBreak().subscribe((Response: any) => {
    //   if (Response.meta.code == 200) {
    //     this.getAssignPersonList();
    //     $("#current-status-modal").modal('hide');
    //     this.commonService.notifier.notify('success', "All Employee Break Start Successfully.");
    //   }
    //   else {
    //     this.commonService.notifier.notify('error', Response.meta.message);
    //   }
    // })
  }
  // Initialize the timer with production time and start it
  initialize_timer(productionTime: string): void {
    const [hours, minutes, seconds] = productionTime.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      console.error("Invalid production time format.");
      return;
    }

    // Convert production time to total minutes
    this.elapsed_time_minutes = hours * 60 + minutes;
    console.log(this.elapsed_time_minutes);

    // Calculate initial progress percentage based on production time
    let initial_progress = this.elapsed_time_minutes / this.distance_minutes;
    this.update_progress_display(initial_progress);

    // Set remaining time and start the timer
    this.remaining_time = (this.distance_minutes - this.elapsed_time_minutes) * 60 * 1000;
    console.log(this.remaining_time / 60000)
    this.start_timer();
  }

  // Pause the timer
  pause_timer(): void {
    if (this.animation_id !== null) {
      // Calculate remaining time left on pause
      this.remaining_time = this.time_left;
      window.cancelAnimationFrame(this.animation_id);
      this.animation_id = null; // Mark timer as not running
      console.log("paused timer");
    }
  }

  // Modified start_timer function to resume timer from pause
  start_timer(): void {
    if (this.animation_id != null) return; // If timer is already running, ignore
    console.log(this.animation_id)
    let target_time = new Date().getTime() + this.remaining_time;
    this.process_timer(target_time);
    console.log("resume timer");
  }

  // Stop the timer completely
  stop_timer(): void {
    console.log("stop timer")
    if (this.animation_id !== null) {
      window.cancelAnimationFrame(this.animation_id);
      this.animation_id = null;
      console.log("stop timer")
    }
  }

  // Process the timer and update the animation
  process_timer(target_time: number): void {
    console.log("process timer")
    this.time_left = target_time - new Date().getTime();
    if (this.initTimer == false) {
      const [hours, minutes, seconds] = this.productionTime.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        console.error("Invalid production time format.");
        return;
      }

      // Convert production time to total minutes
      this.elapsed_time_minutes = hours * 60 + minutes;
    }

    if (this.time_left > 0) {
      console.log("process timer1")

      let minutes_left: number = Math.floor(this.time_left / (1000 * 60));
      let seconds_left: number = Math.floor((this.time_left % (1000 * 60)) / 1000);

      // Calculate the current progress percentage
      let total_time_ms = this.distance_minutes * 60 * 1000;
      let progress = (this.elapsed_time_minutes * 60 * 1000 / total_time_ms);

      let timer_str: string = this.timer_string(minutes_left, seconds_left);
      document.documentElement.style.setProperty('--timer-minutes-seconds', `'${timer_str}'`);
      this.update_progress_display(progress);

      this.animation_id = window.requestAnimationFrame(() => this.process_timer(target_time));
      console.log(this.animation_id)
    } else {
      console.log("process timer2")

      this.stop_timer();
    }
  }

  // Update the CSS progress display
  update_progress_display(progress: number): void {
    // Set CSS properties for current progress
    document.documentElement.style.setProperty('--inner_percent_deg', `${Math.round(100 * 100 * progress) / 100}%`);
    document.documentElement.style.setProperty('--outer_percent_deg', `${Math.round(100 * 100 * (1 - progress)) / 100}%`);
    document.documentElement.style.setProperty('--local_percent_val', `'${Math.round(100 * progress)}%'`);
    document.documentElement.style.setProperty('--global_percent_val', `'${Math.round(100 * (1 - progress))}%'`);
  }

  // Convert minutes and seconds to a timer string
  timer_string(minutes: number, seconds: number): string {
    let str_minutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    let str_seconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${str_minutes}:${str_seconds}`;
  }
}
