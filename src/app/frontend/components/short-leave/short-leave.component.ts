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
  selector: 'app-short-leave',
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
  templateUrl: './short-leave.component.html',
  styleUrl: './short-leave.component.scss'
})
export class ShortLeaveComponent implements OnInit {

  shortLeaveListData: any[] = [];
  shortLeaveForm!: FormGroup;

  submittedShortLeaveData: boolean = false;
  hourList: any[] = [];
  minitesList: any[] = [];
  get fShortLeaveData() { return this.shortLeaveForm.controls; }

  constructor(private fb: FormBuilder, public frontLayoutService: FrontLayoutService) { }

  ngOnInit(): void {
    this.defaultForm();
    this.getShortLeaveListData();
    this.getMinutesHours();
  }

  getMinutesHours() {
    let date = new Date();
    for (let i = 0; i < 24; i++) {
      date.setHours(i);
      date.setMinutes(0);
      let time = {
        value: moment(date).format('HH'),
        name: moment(date).format('HH')
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

  defaultForm() {
    this.shortLeaveForm = this.fb.group({
      dateObj: [null, [Validators.required]],
      hours: [null, [Validators.required]],
      minutes: [null, [Validators.required]],
      shortLeaveType: ['', [Validators.required]],
      disscussWith: ['', [Validators.required]],
      shortLeaveReason: ['', [Validators.required]],
    })
  }

  shortLeaveModalOpen() {
    this.defaultForm();
    this.submittedShortLeaveData = false;
    $("#apply-short-leave-modal").modal({ backdrop: 'static', keyboard: false });
    $("#apply-short-leave-modal").modal('show');

  }
  cancleShortLeaveModal() {
    this.defaultForm();
    this.submittedShortLeaveData = false;
    $("#apply-short-leave-modal").modal('hide');
  }

  saveShortLeaveData() {

    if (this.shortLeaveForm.invalid) {
      this.submittedShortLeaveData = true;
      return
    }

    let leaveDateWiseObj = {
      dateObj: moment(this.shortLeaveForm.value.dateObj).format('yyyy-MM-DDT00:00:00') + "Z",
      time: this.shortLeaveForm.value.hours + ":" + this.shortLeaveForm.value.minutes,
      shortLeaveType: this.shortLeaveForm.value.shortLeaveType,
      shortLeaveReason: this.shortLeaveForm.value.shortLeaveReason,
      disscussWith: this.shortLeaveForm.value.disscussWith,
    }

    this.frontLayoutService.saveShortLeave(leaveDateWiseObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.defaultForm();
        $("#apply-short-leave-modal").modal('hide');
        swal({
          text: "Your Short Leave apply successfully.",
          icon: "success",
          timer: 1500,
          buttons: [false]
        });
        this.getShortLeaveListData();
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
  }

  noData: boolean = false;

  getShortLeaveListData() {

    this.frontLayoutService.getShortLeaveList().subscribe((Response: any) => {
      this.shortLeaveListData = []
      if (Response.meta.code == 200) {
        this.shortLeaveListData = Response.data.sort((a: any, b: any) => {
          let Adate = new Date(a.dateObj);
          let Bdate = new Date(b.dateObj)
          return (Adate < Bdate ? -1 : 1) * (true ? 1 : -1)
        });
        this.noData = false;
      }
      else {
        this.noData = true;
      }
    })
  }

  cancleShortLeaveID: any;
  remark = '';

  cancleShortLeaveModalclose() {
    this.remark = ''
    $("#cancle-short-leave-modal").modal('hide');
  }

  cancleShortLeaveRemarkModalOpen(id: any) {
    this.cancleShortLeaveID = id
    this.remark = '';
    $("#cancle-short-leave-modal").modal({ backdrop: 'static', keyboard: false });
    $("#cancle-short-leave-modal").modal('show');

  }

  cancleShortLeaveSave() {

    swal({
      title: 'Cancle Short Leave',
      text: 'Are you sure want to cancle this Short Leave ?',
      icon: "warning",
      closeOnClickOutside: false,
      buttons: ['Cancel', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {

        let Obj = {
          _id: this.cancleShortLeaveID,
          shortLeavestatus: 4,
          remark: this.remark
        }

        this.frontLayoutService.updateShortLeaveStatus(Obj).subscribe((Response: any) => {
          if (Response.meta.code == 200) {
            this.getShortLeaveListData();
            this.remark = '';
            swal({
              text: "Your Short Leave cancled successfully.",
              icon: "success",
              timer: 1500,
              buttons: [false]
            });
            $("#cancle-short-leave-modal").modal('hide');
          }
        })
      }
    })




  }


}
