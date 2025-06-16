import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonService } from '../../../../shared/common.service';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSortModule, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgOtpInputComponent } from 'ng-otp-input';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ConfirmDirective } from '../../../../shared/directives/confirm.directive';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, GroupByPipe, NiceTimePipe } from '../../../../shared/pipe/common.pipe';
declare const $: any;

interface userMasterData {
  userName: string;
  email: string;
  roleName: string;
  status: string;
}

@Component({
  selector: 'app-employee-list',
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
    RouterModule,
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
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnInit {
  usermasterList!: userMasterData[];
  allusermaster!: userMasterData[];
  userMasterList!: userMasterData[];
  l: number = 0;
  p: any = 1;
  itemsPage: any;
  mySelect: any;
  usermasterListlength: any;
  noData: any;
  searchTerm: string = '';
  isView: boolean = false;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;
  imgUrl = environment.uploadedUrl;
  selectedActiveDeActive = 1;

  constructor(
    private http: HttpClient,
    public commonService: CommonService,
    public adminLayoutService: AdminLayoutService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    let pagePermission = { module: "employeelist" }
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

  ngOnInit() {
    // this.getUserList();
    this.noData = false;
    this.mySelect = 8;
    this.l = 8;
    this.onChangeStatus(this.selectedActiveDeActive)
  }


  itemsPerPage(): void {
    this.l = this.mySelect;
    this.p = 1;
  }

  addEmployee() {
    this.router.navigate(['/admin/employee-management/add-new-employee']);
  }

  activeDeactiveDataList = [
    {
      name: "All",
      value: 0
    },
    {
      name: "Active",
      value: 1
    },
    {
      name: "Deactive",
      value: 2
    }
  ]

  onChangeStatus(value: any) {
    this.p = 1
    this.adminLayoutService.getuserMaster().subscribe((Response: any) => {

      if (Response.meta.code == 200) {

        if (value == 0) {
          this.userMasterList = Response.data;
          this.allusermaster = this.userMasterList;
          this.usermasterList = this.userMasterList
        }
        else if (value == 1) {
          this.userMasterList = Response.data.filter((x: any) => {
            return x.empCompanyInfoData?.status === 1;
          });
          this.allusermaster = this.userMasterList;
          this.usermasterList = this.userMasterList
        }
        else if (value == 2) {
          this.userMasterList = Response.data.filter((x: any) => {
            return x.empCompanyInfoData == null || x.empCompanyInfoData?.status == 2
          });
          this.allusermaster = this.userMasterList;
          this.usermasterList = this.userMasterList
        }
      }
    })

    // this.usermasterList = 
  }

  getUserList() {

    this.adminLayoutService.getuserMaster().subscribe((Response: any) => {

      if (Response.meta.code == 200) {

        this.userMasterList = Response.data;
        this.allusermaster = this.userMasterList;
        this.usermasterList = this.userMasterList;
        this.noData = false;
      } else {
        this.noData = true;
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  generateLedger() {
    this.adminLayoutService.generateLedger().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        // this.commonService.notifier.notify('success', 'Ledger Created Successfully.')
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message)
      }
    })
  }

  statusUser(paramsObj: any) {

    let statususerModelObj = {
      "_id": paramsObj.id,
      "status": paramsObj.status
    };


    this.adminLayoutService.Statususer(statususerModelObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        // this.getUserList();
        this.onChangeStatus(this.selectedActiveDeActive)
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
      else {
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });



  }

  search(value: string): void {

    this.usermasterList = this.allusermaster.filter((val) => JSON.stringify(val).toLowerCase().includes(value.toLowerCase()));
    this.userMasterList = this.usermasterList
    this.p = 1;
    if (this.usermasterList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  sortData(sort: Sort) {

    const data = this.userMasterList.slice();
    if (!sort.active || sort.direction === '') {
      this.usermasterList = data;
      return;
    }

    this.usermasterList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'userName': return compare(a.userName, b.userName, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'roleName': return compare(a.roleName, b.roleName, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}