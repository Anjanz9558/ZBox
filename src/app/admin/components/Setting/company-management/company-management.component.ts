import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgOtpInputComponent } from 'ng-otp-input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ConfirmDirective } from '../../../../shared/directives/common.directive';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, GroupByPipe, NiceTimePipe } from '../../../../shared/pipe/common.pipe';
declare const $: any;
import moment from 'moment';
import { StorageService } from '../../../../shared/storage.service';
import { CoreHelperService } from '../../../../Providers/core-helper/core-helper.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonService } from '../../../../shared/common.service';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-company-management',
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
    FilterPipe
  ],
  standalone: true,
  templateUrl: './company-management.component.html',
  styleUrl: './company-management.component.scss'
})
export class CompanyManagementComponent implements OnInit {
  allEmployeeCompanyList: any[] = [];
  employeeCompanyList: any[] = [];
  l: number = 0;
  p: any = 1;
  itemsPage: any;
  mySelect: any;
  noData: Boolean = false;
  searchTerm: any;
  isView: Boolean = false;
  isCreated: Boolean = false;
  isUpdated: Boolean = false;
  isDeleted: Boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder, public storageService: StorageService, private coreHelper: CoreHelperService, private route: ActivatedRoute, private router: Router, public commonService: CommonService, public adminLayoutService: AdminLayoutService) {
    let pagePermission = { module: "CompanyManagement" }
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
    this.getCompanyInformationDetailsList();
    this.mySelect = 5;
    this.l = 5;
  }

  itemsPerPage(): void {
    this.l = this.mySelect;
  }

  getCompanyInformationDetailsList() {
    this.adminLayoutService.getCompanyDetailsList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.allEmployeeCompanyList = Response.data;
        this.employeeCompanyList = this.allEmployeeCompanyList;
        this.sortingList({ active: 'companyName', direction: 'asc' });
        if (this.employeeCompanyList.length == 0) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      }
      else {
        this.noData = true;
        this.employeeCompanyList = [];
      }
    });
  }

  search(value: any): void {
    this.employeeCompanyList = this.allEmployeeCompanyList.filter((val: any) => JSON.stringify(val).toLowerCase().includes(value.toLowerCase()));
    this.p = 1;
    if (this.employeeCompanyList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  statusCompanymaster(paramsObj: any) {


    let statusCompanyObj = {
      "_id": paramsObj.id,
      "status": paramsObj.status
    };


    this.adminLayoutService.StatusCompanyMaster(statusCompanyObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.getCompanyInformationDetailsList();
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  sortingList(sort: Sort) {

    const data = this.allEmployeeCompanyList.slice();
    if (!sort.active || sort.direction === '') {
      this.employeeCompanyList = data;
      return;
    }

    this.employeeCompanyList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'companyName': return compare(a.companyName, b.companyName, isAsc);
        case 'companyEmail': return compare(a.companyEmail, b.companyEmail, isAsc);
        case 'companyMobile': return compare(a.companyMobile, b.companyMobile, isAsc);
        case 'companyTelephone': return compare(a.companyTelephone, b.companyTelephone, isAsc);
        case 'companyWebsite': return compare(a.companyWebsite, b.companyWebsite, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
