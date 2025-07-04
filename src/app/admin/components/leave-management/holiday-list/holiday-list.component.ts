import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { CommonService } from '../../../../shared/common.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import moment from 'moment';
import { CalendarOptions } from '@fullcalendar/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-holiday-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ConfirmDirective,
    RouterModule,
    MatSortModule,
    NgSelectModule,
  ],
  templateUrl: './holiday-list.component.html',
  styleUrl: './holiday-list.component.scss'
})
export class HolidayListComponent implements OnInit {

  newsEvent: any[] = [];
  calendarOptions: CalendarOptions = {};
  uploadedDocumentsName: any;
  uploadedDocuments: any;
  @ViewChild('file') myInputVariable!: ElementRef;
  resultofDocument: any;
  holidayTableWiseData: any[] = [];
  allholidayTableWiseData: any[] = [];
  l: number = 0;
  p: number = 1;
  itemsPage: any;
  mySelect: any;
  noData: any;
  isView: boolean = false;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;

  constructor(public commonService: CommonService, private fb: FormBuilder, private el: ElementRef, public adminLayoutService: AdminLayoutService, public router: Router) {
    let pagePermission = { module: "holidaylist" }
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
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  ngOnInit(): void {
    this.defaultHolidayForm();
    this.getHolidayList();
    this.tableViewFlag = true;
    setTimeout(() => {
      this.evoCalender();
    }, 500);
    this.mySelect = 5;
    this.l = 10;
  }

  itemsPerPage(): void {
    this.l = this.mySelect;
    this.p = 1;
  }

  myEvents = [
    {
      id: "required-id-2",
      name: "Valentine's Day",
      date: "Fri Feb 14 2022 00:00:00 GMT-0800 (Pacific Standard Time)",
      type: "holiday",
      everyYear: true,
      color: "#222"
    },
  ]

  // ========== calander-demo-start==========
  evoCalender() {
    $('#calendar').evoCalendar({
      titleFormat: 'MM',
      firstDayOfWeek: 1,  // Set Monday as the first day of the week (0 = Sunday, 1 = Monday)
      calendarEvents: this.newsEvent,
    })
    $('#calendar').evoCalendar({
      theme: 'Royal Navy'
    })
  }


  getHolidayList() {
    this.newsEvent = [];
    this.calendarOptions = {};
    this.holidayTableWiseData = [];
    this.adminLayoutService.getActiveHolidayList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        let holidayListData = Response.data;
        let holidaylistData = holidayListData.filter((v: any, i: any) => holidayListData.findIndex((item: any) => item.holidayDate == v.holidayDate) === i);
        this.allholidayTableWiseData = holidaylistData;
        this.holidayTableWiseData = this.allholidayTableWiseData;
        this.sortingList({ active: 'date', direction: 'asc' })

        holidaylistData.forEach((data: any) => {
          let holidayDateObj = data.holidayDate.split('/')[1] + '/' + data.holidayDate.split('/')[0] + '/' + data.holidayDate.split('/')[2]
          let news = {
            id: data._id,
            date: new Date(holidayDateObj),
            name: data.Holiday,
            type: "holiday",
            everyYear: true,
            color: "#05334d"
          }
          // let news = {
          //   id: "required-id-2",
          //   name: "Valentine's Day",
          //   date: "Fri Feb 14 2022 00:00:00 GMT-0800 (Pacific Standard Time)",
          //   type: "holiday",
          //   everyYear: true,
          //   color: "#222"
          // }

          this.newsEvent.push(news);
        })


        this.calendarOptions = {
          initialView: 'dayGridMonth',
          events: this.newsEvent,
          // events:  [{ title: 'Event Now', start: new Date() }],
          headerToolbar: {
            right: 'prev,next'
          },
        };
      }
    }, (error) => {
      console.log(error.error.Message);
    });
  }


  addEmployee() {
    $("#add-excel-upload-modal").modal({ backdrop: 'static', keyboard: false});;
    $("#add-excel-upload-modal").modal('show');

    this.myInputVariable.nativeElement.value = "";
  }

  cancelEmployee() {
    $("#add-excel-upload-modal").modal("hide");
  }

  onDocumentChange(event: any) {

    this.resultofDocument = event.target.files[0];
    this.myInputVariable.nativeElement.value = "";
  }

  removeDocument() {
    this.resultofDocument = "";
    this.myInputVariable.nativeElement.value = "";
  }

  saveExcelFile() {
    let excelUploadModal: FormData = new FormData();
    excelUploadModal.append('xlsxDocument', this.resultofDocument);

    this.adminLayoutService.uploadHolidayExcelFile(excelUploadModal).subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        // window.location.reload();
        this.getHolidayList();
        $("#add-excel-upload-modal").modal("hide");
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message)
      }
    });

  }

  calenderViewFlag: boolean = false;
  tableViewFlag: boolean = false;

  tapView(btn_name: any) {

    if (btn_name === 'calenderView') {
      this.calenderViewFlag = true;
      this.tableViewFlag = false;
      setTimeout(() => {
        this.evoCalender();
      }, 500);
    }
    else if (btn_name === 'tableView') {
      this.tableViewFlag = true
      this.calenderViewFlag = false;
    }
  }


  deleteHolidayData(id: any) {
    let obj = {
      _id: id
    }

    this.adminLayoutService.deleteHoliday(obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.getHolidayList();
        // this.commonService.notifier.notify('success', 'Holiday Data Deleted Successfully.');
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    })
  }

  // holiday data add one by one
  holidayDataForm!: FormGroup;
  get fHolidayData() { return this.holidayDataForm.controls; };
  submittedHolidayData: boolean = false;
  holidayTypeArray = [
    { value: 1, name: 'Public' },
    { value: 2, name: 'Regular' },
  ]

  defaultHolidayForm() {
    this.holidayDataForm = this.fb.group({
      HolidayType: [null, [Validators.required]],
      Day: ['', [Validators.required]],
      Holiday: ['', [Validators.required]],
      date: ['', [Validators.required]],
    })
  }

  addHolidayData() {
    this.defaultHolidayForm();
    this.submittedHolidayData = false;
    $("#add-holiday-data-modal").modal({ backdrop: 'static', keyboard: false, show: true });
    $("#add-holiday-data-modal").modal('show');

  }

  cancelHolidayModal() {
    this.defaultHolidayForm();
    this.submittedHolidayData = false;
    $("#add-holiday-data-modal").modal("hide");
  }

  getDayByDate() {
    let dayName = moment(this.holidayDataForm.controls['date'].value).format('dddd');
    this.holidayDataForm.controls['Day'].setValue(dayName)
  }

  saveHolidayData() {
    if (this.holidayDataForm.invalid) {
      this.submittedHolidayData = true;
      return
    }

    let holidayObj = {
      HolidayType: this.holidayDataForm.value.HolidayType,
      Day: this.holidayDataForm.value.Day,
      Holiday: this.holidayDataForm.value.Holiday,
      date: moment(this.holidayDataForm.value.date).format("yyyy-MM-DDTHH:mm:ss") + "Z",
    }
    // return
    this.adminLayoutService.saveHolidayData(holidayObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.defaultHolidayForm();
        this.submittedHolidayData = false;
        this.getHolidayList();
        $("#add-holiday-data-modal").modal("hide");
        // this.commonService.notifier.notify('success', 'Holiday Data Saved Successfully.');
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    })
  }

  sortingList(sort: Sort) {

    const data = this.allholidayTableWiseData.slice();
    if (!sort.active || sort.direction === '') {
      this.holidayTableWiseData = data;
      return;
    }

    this.holidayTableWiseData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'date': return compare(new Date(a.date), b.date, isAsc);
        case 'Holiday': return compare(a.Holiday, b.Holiday, isAsc);
        case 'Day': return compare(a.Day, b.Day, isAsc);
        default: return 0;
      }
    });
  }


}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}