import { Component, OnInit } from '@angular/core';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { CommonService } from '../../../../shared/common.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidatorFn, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import * as Chartist from 'chartist';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSortModule, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDirective } from '../../../../shared/directives/common.directive';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, NiceTimePipe } from '../../../../shared/pipe/common.pipe';
// import { GroupByPipe } from 'ngx-pipes';
// import { StorageService, StorageKey } from '../../../shared/storage.service';
declare const $: any;


@Component({
  selector: 'app-department-master',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ConfirmDirective,
    RouterModule,
    MatSortModule,
    NiceTimePipe,
    // GroupByPipe,
    ArraySortPipeDesc,
    ArraySortPipeAsc,
    ArraySortPipeSimple,
    FilterPipe
  ],
  templateUrl: './department-master.component.html',
  styleUrl: './department-master.component.scss'
})
export class DepartmentMasterComponent implements OnInit {

  ISeditDepartmentmaster = false;
  departmentmasterList: any[] = [];
  alldepartmentmaster: any[] = [];
  departmentMasterList: any[] = [];
  l: number = 0;
  p: number = 1;
  itemsPage: any;
  mySelect: any;
  departmentmasterForm!: FormGroup;
  x: any;
  t: any;
  listindex: any;
  departmentmasterListlength: any;
  allimageList: any;

  get fDepartmentnameData() { return this.departmentmasterForm.controls; }
  submittedDepartmentMasterData = false;
  public imagePath: any;
  imgURL: any;
  message: any;
  noData: any;
  noimageData: any

  activeTab: any;
  imageList: any;
  //image: any;
  file: any;
  Image: any;
  isView: boolean = false;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;
  searchTerm: string = '';

  constructor(public commonService: CommonService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private spinner: NgxSpinnerService) {
    let pagePermission = { module: "DepartmentMaster" }
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
    this.noData = false;
    this.mySelect = 5;
    this.l = 10;
    this.ISeditDepartmentmaster = false;
    this.getDepartmentmasterList();
    this.defaultForm();
  }
  defaultForm() {
    this.departmentmasterForm = this.fb.group({
      _id: [''],
      departmentName: ['', [Validators.required]],
    });
  }

  itemsPerPage(): void {
    this.l = this.mySelect;
  }


  addDepartmentMaster() {
    // $("#add-documenttype-modal").modal({ backdrop: 'static', keyboard: false });;
    $("#add-documenttype-modal").modal({ backdrop: 'static', keyboard: false });
    $("#add-documenttype-modal").modal('show');

    this.ISeditDepartmentmaster = false;
  }

  cancelDepartmentmaster() {
    $("#add-documenttype-modal").modal("hide");
    this.defaultForm();
    this.ISeditDepartmentmaster = false;
  }
  saveDepartmentmaster() {


    if (this.departmentmasterForm.invalid) {
      this.submittedDepartmentMasterData = true;
      return;
    }
    let documenttypemasterModelObj = {
      "departmentName": this.departmentmasterForm.controls['departmentName'].value,
    };

    this.adminLayoutService.SaveDepartmentMaster(documenttypemasterModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submittedDepartmentMasterData = false;
        this.getDepartmentmasterList();
        this.defaultForm();
        this.ISeditDepartmentmaster = false;
        // this.commonService.notifier.notify('success', Response.meta.message);
        $("#add-documenttype-modal").modal("hide");
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  search(value: string): void {
    this.departmentmasterList = this.alldepartmentmaster.filter((val: any) => val.departmentName.toLowerCase().includes(value.toLowerCase()));
    this.p = 1;
    if (this.departmentmasterList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  getDepartmentmasterList() {

    this.adminLayoutService.getDepartmentMaster().subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.departmentMasterList = Response.data;
        this.departmentmasterList = this.departmentMasterList
        this.alldepartmentmaster = this.departmentmasterList
        this.departmentmasterList = this.departmentMasterList.slice();
        this.departmentmasterListlength = Response.data.length;
        this.sortingList({ active: 'departmentName', direction: 'asc' })
        this.noData = false;
      } else {
        this.noData = true;
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }


  editDepartmentmaster(paramsObj: any) {

    this.ISeditDepartmentmaster = true;
    let Id: any = { '_id': paramsObj.id }
    this.adminLayoutService.getDepartmentMasterId(Id).subscribe((Response: any) => {

      this.departmentmasterForm.controls['_id'].setValue(Response.data._id)
      this.departmentmasterForm.controls['departmentName'].setValue(Response.data.departmentName)
      // $("#add-documenttype-modal").modal({ backdrop: 'static', keyboard: false });
      $("#add-documenttype-modal").modal({ backdrop: 'static', keyboard: false });
      $("#add-documenttype-modal").modal('show');

    }, (error) => {
      ////console.log(error);
      //this.commonService.notifier.notify('error', error.error.Message);
    });
  }
  updateDepartmentmaster() {


    if (this.departmentmasterForm.invalid) {
      this.submittedDepartmentMasterData = true;
      return;
    }
    let documenttypemasterModelObj = {
      "_id": this.departmentmasterForm.controls['_id'].value,
      "departmentName": this.departmentmasterForm.controls['departmentName'].value,
    };

    this.adminLayoutService.UpdateDepartmentMaster(documenttypemasterModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submittedDepartmentMasterData = false;
        this.getDepartmentmasterList();
        this.defaultForm();
        this.ISeditDepartmentmaster = false;
        // this.commonService.notifier.notify('success', Response.meta.message);
        $("#add-documenttype-modal").modal("hide");
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  statusDepartmentmaster(paramsObj: any) {


    let statusDepartmentmasterModelObj = {
      "_id": paramsObj.id,
      "status": paramsObj.status
    };


    this.adminLayoutService.StatusDepartmentMaster(statusDepartmentmasterModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submittedDepartmentMasterData = false;
        this.getDepartmentmasterList();
        this.defaultForm();
        this.ISeditDepartmentmaster = false;
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  sortingList(sort: any) {

    const data = this.alldepartmentmaster.slice();
    if (!sort.active || sort.direction === '') {
      this.departmentmasterList = data;
      return;
    }

    this.departmentmasterList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'departmentName': return compare(a.departmentName, b.departmentName, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
