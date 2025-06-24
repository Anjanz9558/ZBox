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
import { CommonService } from '../../../shared/common.service';

@Component({
  selector: 'app-manual-attendance',
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
  templateUrl: './manual-attendance.component.html',
  styleUrl: './manual-attendance.component.scss'
})
export class ManualAttendanceComponent implements OnInit {
  maxDate!: Date;
  manualAttendanceList: any[] = [];
  allmanualAttendanceList: any[] = [];
  noData: boolean = false;
  applyManualAttendanceForm!: FormGroup;
  submittedManualAttendance: boolean = false;
  hourList: any[] = [];
  minitesList: any[] = [];
  get fManualAttendance() { return this.applyManualAttendanceForm.controls; }

  constructor(private fb: FormBuilder, private frontLayoutService: FrontLayoutService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.maxDate = new Date(); // Set the maximum date to today
    this.getMinutesHours();
    this.defaultFormat();
    this.getManualAttendanceList();

  }

  defaultFormat() {
    this.applyManualAttendanceForm = this.fb.group({
      _id: [''],
      date: ['', [Validators.required]],
      checkinhours: [null, [Validators.required]],
      checkinminutes: [null, [Validators.required]],
      checkouthours: [null, [Validators.required]],
      checkoutminutes: [null, [Validators.required]],
      dayReportType: [''],
      manualAttendanceReason: ['']
    })
  }

  getManualAttendanceList() {
    this.manualAttendanceList = [];
    let Obj = {
employeeId: JSON.parse(localStorage.getItem("LoginUserData") || '{}')?.employeeId
    }
    this.frontLayoutService.getManualAttendanceList(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.allmanualAttendanceList = Response.data;
        this.manualAttendanceList = this.allmanualAttendanceList;
        this.noData = false
      }
      else {
        this.noData = true
      }
    })
  }

  getMinutesHours() {
    let date = new Date();
  
    // Loop for generating hours from 7 AM to 12 PM
    for (let i = 7; i <= 24; i++) {
      date.setHours(i);
      date.setMinutes(0);
      let time = {
        value: moment(date).format('HH'), 
        name: moment(date).format('hh A') 
      };
      this.hourList.push(time);
    }
  
    // Loop for generating minutes from 00 to 59
    for (let minutes = 0; minutes < 60; minutes++) {
      date.setHours(6); // This sets the hour to 6 AM, but it's only used for formatting minutes
      date.setMinutes(minutes);
      let time = {
        value: moment(date).format('mm'), // Minutes in 2-digit format
        name: moment(date).format('mm')   // Display minutes in 2-digit format
      };
      this.minitesList.push(time);
    }
  }
  

  applyManualAttendance() {
    this.defaultFormat();
    this.submittedManualAttendance = false;

    let date = new Date();
    this.applyManualAttendanceForm.controls['date'].setValue(date)
    $("#apply-manual-attendance").modal({ backdrop: 'static', keyboard: false});
    $("#apply-manual-attendance").modal('show');

  }

  cancleManualAttendancePopup() {
    this.defaultFormat();
    this.submittedManualAttendance = false;
    $("#apply-manual-attendance").modal('hide');
  }

  setReasonValidators() {
    if (this.applyManualAttendanceForm.value.dayReportType == 1) {
      this.applyManualAttendanceForm.controls['manualAttendanceReason'].setValidators([Validators.required]);
    }
    else {
      this.applyManualAttendanceForm.controls['manualAttendanceReason'].clearValidators();
    }
  }

  applyManualAttendanceSave() {
    console.log('hhhhhhhhhhhhhhhhhhh');


    if (this.applyManualAttendanceForm.invalid) {
      this.submittedManualAttendance = true;
      console.log('Form is invalid. Values:', this.applyManualAttendanceForm.value);
      return;
    }

    console.log('Form is valid. Form Values:', this.applyManualAttendanceForm.value);

    let date = moment(this.applyManualAttendanceForm.value.date).format('yyyy-MM-DD');

    // Check In logic
    // if (this.applyManualAttendanceForm.value.checkinhours && this.applyManualAttendanceForm.value.checkinminutes) {
      let checkInTime = this.applyManualAttendanceForm.value.checkinhours + ":" + this.applyManualAttendanceForm.value.checkinminutes;
      console.log('checkInTime:', checkInTime);

      let checkInDateTime = moment(new Date(date + ' ' + checkInTime)).add(5, 'hour').add(30, 'minute').format("yyyy-MM-DDTHH:mm:ss") + "Z";
      console.log('checkInDateTime:', checkInDateTime);

      let checkInTimeobj = new Date(moment(checkInDateTime).subtract(5, 'hour').subtract(30, 'minute').toJSON());
      console.log('Check In Object:', checkInTimeobj);

      // let manualAttendanceReason1 = this.applyManualAttendanceForm.value.manualAttendanceReason;

      // Log the complete check-in object
      // console.log( 'manualAttendanceReason:', manualAttendanceReason1);
    // }

    // Check Out logic
    // if (this.applyManualAttendanceForm.value.checkouthours && this.applyManualAttendanceForm.value.checkoutminutes) {
      let checkOutTime = this.applyManualAttendanceForm.value.checkouthours + ":" + this.applyManualAttendanceForm.value.checkoutminutes;
      console.log('checkOutTime:', checkOutTime);

      let checkOutDateTime = moment(new Date(date + ' ' + checkOutTime)).add(5, 'hour').add(30, 'minute').format("yyyy-MM-DDTHH:mm:ss") + "Z";
      console.log('checkOutDateTime:', checkOutDateTime);


       let checkOutTimeobj= new Date(moment(checkOutDateTime).subtract(5, 'hour').subtract(30, 'minute').toJSON());
       console.log('Check out Object:', checkOutTimeobj);

      let manualAttendanceReason=this.applyManualAttendanceForm.value.manualAttendanceReason;
      console.log( 'manualAttendanceReason:', manualAttendanceReason);
    // }
    let Obj = {
      dayReportType:2,
      checkInTime: checkInTimeobj,
      checkOutTime: checkOutTimeobj,
      manualAttendanceReason: this.applyManualAttendanceForm.value.manualAttendanceReason
    }

    console.log( 'objjjjjjjjjj:', Obj);

      console.log('Sending Object to API:', Obj);
      this.frontLayoutService.SaveManualAttendance(Obj).subscribe((Response: any) => {

        console.log('API Responsessssssssssssss:', Response);

        if (Response.meta.code == 200) {
          if (Obj.dayReportType == 2) {
            swal({
              text: 'Your manually Attendance Successfully saved.',
              icon: "success",
              timer: 1500,
              buttons: [false]
            });
          }
          // else if (Obj.dayReportType == 2) {
          //   swal({
          //     text: 'Your manually Check Out Successfully saved.',
          //     icon: "success",
          //     timer: 1500,
          //     buttons: [false]
          //   });
          // }
          else if (this.applyManualAttendanceForm.value.dayReportType == 3) {
            swal({
              text: 'Your manually Break In Successfully saved.',
              icon: "success",
              timer: 1500,
              buttons: [false]
            });
          }
          else if (this.applyManualAttendanceForm.value.dayReportType == 4) {
            swal({
              text: 'Your manually Break Out Successfully saved.',
              icon: "success",
              timer: 1500,
              buttons: [false]
            });
          }
          this.defaultFormat();
          this.getManualAttendanceList()
          this.submittedManualAttendance = false;
          $("#apply-manual-attendance").modal('hide');

        }
        else {
          // this.commonService.notifier.notify('error', Response.meta.message)
        }
      });
  
  }

  cancleLeaveList(id:any) {

    swal({
      title: 'Cancle Leave',
      text: 'Are you sure want to cancle this leave ?',
      icon: "warning",
      closeOnClickOutside: false,
      buttons: ['Cancel', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let Obj = {
          _id: id,
          leaveStatus: 4
        }
        this.frontLayoutService.updateAttendanceStatus(Obj).subscribe((Response: any) => {
          if (Response.meta.code == 200) {
            this.manualAttendanceList = [];
            // this.leaveListByLeaveId = []
            // this.getLeaveCount()
            // this.getLeaveTypeList()
            // this.getLeaveListData();
          }
        })
      }
    })
  }


  cancleManualAttendance(manualAttendanceData: any, index: number): void {
    console.log(manualAttendanceData);
    // let manualAttendance = manualAttendanceData;
    swal({
      title: 'Cancle Attendance',
      text: 'Are you sure want to cancle this Manual Attendance ?',
      icon: "warning",
      closeOnClickOutside: false,
      buttons: ['Cancel', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const params = {
          approveType: '3', 
          penddingAttendanceId: manualAttendanceData._id,
          date: manualAttendanceData.date,
          month: manualAttendanceData.month,
          year: manualAttendanceData.year,
          employeeId: manualAttendanceData.employeeId,
        };
        console.log(params);

        this.frontLayoutService.updateAttendanceStatus(params).subscribe(
          (Response: any) => {
            if (Response.meta.code == 200) {
              this.manualAttendanceList.splice(index, 1);
              console.log("Attendance cancelled and removed from the list.");
              this.getManualAttendanceList()
              // this.manualAttendanceList = [];
              swal({
                text: "Your Attendance cancled successfully.",
                icon: "success",
                timer: 1500,
                buttons: [false]
              });
            }

            else {
              console.error("Failed to cancel attendance:", Response.message);
            }
          },
          (error) => {
            console.error("Error occurred while cancelling attendance:", error);
          }
        );
      }
    })
  }
}




// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AdminLayoutService } from 'app/layouts/admin-layout/admin-layout.service';
// import { CommonService } from 'app/shared/common.service';
// import { response } from 'express';
// import * as moment from 'moment';
// declare const $: any;
// import swal from 'sweetalert';

// @Component({
//   selector: 'app-manual-attendance',
//   templateUrl: './manual-attendance.component.html',
//   styleUrls: ['./manual-attendance.component.css']
// })
// export class ManualAttendanceComponent implements OnInit {

//   manualAttendanceList: any[] = [];
//   allmanualAttendanceList: any[] = [];
//   noData: boolean = false;
//   applyManualAttendanceForm: FormGroup;
//   submittedManualAttendance: boolean = false;
//   hourList: any[] = [];
//   minitesList: any[] = [];
//   get fManualAttendance() { return this.applyManualAttendanceForm.controls; }

//   constructor(private fb: FormBuilder, private frontLayoutService: AdminLayoutService, private commonService: CommonService) { }

//   ngOnInit(): void {
//     this.getMinutesHours();
//     this.defaultFormat();
//     this.getManualAttendanceList();

//   }

//   defaultFormat() {
//     this.applyManualAttendanceForm = this.fb.group({
//       _id: [''],
//       date: ['', [Validators.required]],
//       hours: [null, [Validators.required]],
//       minutes: [null, [Validators.required]],
//       // checkouthours: [null, [Validators.required]],
//       // checkoutminutes: [null, [Validators.required]],
//       dayReportType: [''],
//       manualAttendanceReason: ['']
//     })
//   }

//   getManualAttendanceList() {
//     this.manualAttendanceList = [];
//     let Obj = {
//       employeeId: JSON.parse(localStorage.getItem("LoginUserData")).employeeId
//     }
//     this.frontLayoutService.getManualAttendanceList(Obj).subscribe((Response: any) => {
//       if (Response.meta.code == 200) {
//         this.allmanualAttendanceList = Response.data;
//         this.manualAttendanceList = this.allmanualAttendanceList;
//         this.noData = false
//       }
//       else {
//         this.noData = true
//       }
//     })
//   }

//   getMinutesHours() {
//     let date = new Date();
//     for (let i = 10; i < 34; i++) {
//       date.setHours(i);
//       date.setMinutes(0);
//       let time = {
//         value: moment(date).format('HH'),
//         name: moment(date).format('hh A')
//       }
//       this.hourList.push(time);
//     }
//     for (let minutes = 0; minutes < 60; minutes = minutes + 1) {
//       date.setHours(6);
//       date.setMinutes(minutes);
//       let time = {
//         value: moment(date).format('mm'),
//         name: moment(date).format('mm')
//       }
//       this.minitesList.push(time);
//     }
//   }

//   applyManualAttendance() {
//     this.defaultFormat();
//     this.submittedManualAttendance = false;

//     let date = new Date();
//     this.applyManualAttendanceForm.controls.date.setValue(date)
//     $("#apply-manual-attendance").modal({ backdrop: 'static', keyboard: false, show: true });
//   }

//   cancleManualAttendancePopup() {
//     this.defaultFormat();
//     this.submittedManualAttendance = false;
//     $("#apply-manual-attendance").modal('hide');
//   }

//   setReasonValidators() {
//     if (this.applyManualAttendanceForm.value.dayReportType == 1) {
//       this.applyManualAttendanceForm.controls.manualAttendanceReason.setValidators([Validators.required]);
//     }
//     else {
//       this.applyManualAttendanceForm.controls.manualAttendanceReason.clearValidators();
//     }
//   }

//   applyManualAttendanceSave() {
//     console.log('hhhhhhhhhhhhhhhhhhh');

//     if (this.applyManualAttendanceForm.invalid) {
//       this.submittedManualAttendance = true;
//       console.log('Values:', this.applyManualAttendanceForm.value);
//       return;
//     }

//     console.log('Form Values:', this.applyManualAttendanceForm.value);

//     let dateTime;
//     let date = moment(this.applyManualAttendanceForm.value.date).format('yyyy-MM-DD');
//     let time = this.applyManualAttendanceForm.value.hours + ":" + this.applyManualAttendanceForm.value.minutes;

//     let tempdateTime = moment(new Date(date + ' ' + time)).add(5, 'hour').add(30, 'minute').format("yyyy-MM-DDTHH:mm:ss") + "Z";
//     dateTime = new Date(moment(tempdateTime).subtract(5, 'hour').subtract(30, 'minute').toJSON())

//     let Obj = {
//       time: dateTime,
//       dayReportType: this.applyManualAttendanceForm.value.dayReportType,
//       manualAttendanceReason: this.applyManualAttendanceForm.value.manualAttendanceReason
//     }
//     this.frontLayoutService.SaveManualAttendance(Obj).subscribe((Response: any) => {
//       if (Response.meta.code == 200) {
//         if (this.applyManualAttendanceForm.value.dayReportType == 1) {
//           swal({
//             text: 'Your manually Check In Successfully saved.',
//             icon: "success",
//             timer: 1500,
//             buttons: [false]
//           });
//         }
//         else if (this.applyManualAttendanceForm.value.dayReportType == 2) {
//           swal({
//             text: 'Your manually Check Out Successfully saved.',
//             icon: "success",
//             timer: 1500,
//             buttons: [false]
//           });
//         }
//         else if (this.applyManualAttendanceForm.value.dayReportType == 3) {
//           swal({
//             text: 'Your manually Break In Successfully saved.',
//             icon: "success",
//             timer: 1500,
//             buttons: [false]
//           });
//         }
//         else if (this.applyManualAttendanceForm.value.dayReportType == 4) {
//           swal({
//             text: 'Your manually Break Out Successfully saved.',
//             icon: "success",
//             timer: 1500,
//             buttons: [false]
//           });
//         }
//         this.defaultFormat();
//         this.getManualAttendanceList()
//         this.submittedManualAttendance = false;
//         $("#apply-manual-attendance").modal('hide');

//       }
//       else {
//         this.commonService.notifier.notify('error', Response.meta.message)
//       }
//     })
//   }

//   cancleLeaveList(id) {

//     swal({
//       title: 'Cancle Leave',
//       text: 'Are you sure want to cancle this leave ?',
//       icon: "warning",
//       closeOnClickOutside: false,
//       buttons: ['Cancel', true],
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         let Obj = {
//           _id: id,
//           leaveStatus: 4
//         }
//         this.frontLayoutService.updateAttendanceStatus(Obj).subscribe((Response: any) => {
//           if (Response.meta.code == 200) {
//             this.manualAttendanceList = [];
//             // this.leaveListByLeaveId = []
//             // this.getLeaveCount()
//             // this.getLeaveTypeList()
//             // this.getLeaveListData();
//           }
//         })
//       }
//     })
//   }


//   cancleManualAttendance(manualAttendanceId: string, index: number): void {
//     swal({
//       title: 'Cancle Attendance',
//       text: 'Are you sure want to cancle this Manual Attendance ?',
//       icon: "warning",
//       closeOnClickOutside: false,
//       buttons: ['Cancel', true],
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         const params = {
//           approveType: '3', // Set the appropriate approveType for cancel
//           penddingAttendanceId: manualAttendanceId, // Pass the manual attendance ID
//         };

//         this.frontLayoutService.updateAttendanceStatus(params).subscribe(
//           (Response: any) => {
//             if (Response.meta.code == 200) {
//               this.manualAttendanceList.splice(index, 1);
//               console.log("Attendance cancelled and removed from the list.");
//               this.getManualAttendanceList()
//               // this.manualAttendanceList = [];
//               swal({
//                 text: "Your Attendance cancled successfully.",
//                 icon: "success",
//                 timer: 1500,
//                 buttons: [false]
//               });
//             }

//             else {
//               console.error("Failed to cancel attendance:", Response.message);
//             }
//           },
//           (error) => {
//             console.error("Error occurred while cancelling attendance:", error);
//           }
//         );
//       }
//     })
//   }
// }