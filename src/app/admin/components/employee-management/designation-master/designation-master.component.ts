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
import { ConfirmDirective } from '../../../../shared/directives/confirm.directive';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, NiceTimePipe } from '../../../../shared/pipe/common.pipe';
// import { GroupByPipe } from 'ngx-pipes';
import { StorageService, StorageKey } from '../../../../shared/storage.service';
declare const $: any;

@Component({
  selector: 'app-designation-master',
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
  templateUrl: './designation-master.component.html',
  styleUrl: './designation-master.component.scss'
})
export class DesignationMasterComponent implements OnInit {

  ISeditDesignationMaster = false;
  designationmasterList: any[] = [];
  alldesignationmaster: any[] = [];
  designationMasterList: any[] = [];
  l: number = 0;
  p: number = 1;
  itemsPage: any;
  mySelect: any;
  designationmasterForm!: FormGroup;
  x: any;
  t: any;
  listindex: any;
  designationmasterListlength: any;
  allimageList: any;

  get fDesignationnameData() { return this.designationmasterForm.controls; }
  submittedDesignationMasterData = false;
  public imagePath: any;
  imgURL: any;
  message: any;
  noData: any;
  noimageData: any
  searchTerm: string = '';

  activeTab: any;
  imageList: any;
  //image: any;
  file: any;
  Image: any;
  isView: boolean = false;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;

  constructor(public commonService: CommonService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private spinner: NgxSpinnerService, public storageService: StorageService) {
    let pagePermission = { module: "designationmaster" }
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
    this.ISeditDesignationMaster = false;
    this.getDesignationmasterList();
    this.defaultForm();
  }
  defaultForm() {
    this.designationmasterForm = this.fb.group({
      _id: [''],
      name: ['', [Validators.required]],
    });
  }

  itemsPerPage(): void {
    this.l = this.mySelect;
  }


  addDesignationMaster() {
    // $("#add-designation-modal").modal({ backdrop: 'static', keyboard: false, show: true });
    $("#add-designation-modal").modal({ backdrop: 'static', keyboard: false });
    $("#add-designation-modal").modal('show');
    this.ISeditDesignationMaster = false;
  }

  cancelDesignationmaster() {
    $("#add-designation-modal").modal("hide");
    this.defaultForm();
    this.ISeditDesignationMaster = false;
  }
  saveDesignationmaster() {


    if (this.designationmasterForm.invalid) {
      this.submittedDesignationMasterData = true;
      return;
    }
    let designationmasterModelObj = {
      "name": this.designationmasterForm.controls['name'].value,
    };

    this.adminLayoutService.SaveDesignationMaster(designationmasterModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submittedDesignationMasterData = false;
        this.getDesignationmasterList();
        this.defaultForm();
        this.ISeditDesignationMaster = false;
        // this.commonService.notifier.notify('success', Response.meta.message);
        $("#add-designation-modal").modal("hide");
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  search(value: string): void {
    this.designationmasterList = this.alldesignationmaster.filter((val: any) => val.name.toLowerCase().includes(value.toLowerCase()));
    this.p = 1;
    if (this.designationmasterList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  getDesignationmasterList() {

    this.adminLayoutService.getDesignationMaster().subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.designationMasterList = Response.data;
        this.designationmasterList = this.designationMasterList
        this.alldesignationmaster = this.designationmasterList
        this.designationmasterList = this.designationMasterList.slice();
        this.designationmasterListlength = Response.data.length;
        this.sortingList({ active: 'name', direction: 'asc' });
        this.noData = false;
      } else {
        this.noData = true;
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }


  editDesignationmaster(paramsObj: any) {

    this.ISeditDesignationMaster = true;
    let Id: any = { '_id': paramsObj.id }
    this.adminLayoutService.getDesignationMasterId(Id).subscribe((Response: any) => {

      this.designationmasterForm.controls['_id'].setValue(Response.data._id)
      this.designationmasterForm.controls['name'].setValue(Response.data.name)
      // $("#add-designation-modal").modal({ backdrop: 'static', keyboard: false, show: true });
      $("#add-designation-modal").modal({ backdrop: 'static', keyboard: false });
      $("#add-designation-modal").modal('show');

    }, (error) => {
      ////console.log(error);
      //this.commonService.notifier.notify('error', error.error.Message);
    });
  }
  updateDesignationmaster() {


    if (this.designationmasterForm.invalid) {
      this.submittedDesignationMasterData = true;
      return;
    }
    let designationmasterModelObj = {
      "_id": this.designationmasterForm.controls['_id'].value,
      "name": this.designationmasterForm.controls['name'].value,
    };

    this.adminLayoutService.UpdateDesignationMaster(designationmasterModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submittedDesignationMasterData = false;
        this.getDesignationmasterList();
        this.defaultForm();
        this.ISeditDesignationMaster = false;
        // this.commonService.notifier.notify('success', Response.meta.message);
        $("#add-designation-modal").modal("hide");
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  statusDesignationmaster(paramsObj: any) {


    let statusdesignationmasterModelObj = {
      "_id": paramsObj.id,
      "status": paramsObj.status
    };


    this.adminLayoutService.StatusDesignationMaster(statusdesignationmasterModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submittedDesignationMasterData = false;
        this.getDesignationmasterList();
        this.defaultForm();
        this.ISeditDesignationMaster = false;
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

    const data = this.alldesignationmaster.slice();
    if (!sort.active || sort.direction === '') {
      this.designationmasterList = data;
      return;
    }

    this.designationmasterList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
