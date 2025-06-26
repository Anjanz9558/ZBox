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
import { StorageService } from '../../../../shared/storage.service';
// import { GroupByPipe } from 'ngx-pipes';
// import { StorageService, StorageKey } from '../../../shared/storage.service';
declare const $: any;


@Component({
  selector: 'app-ip-address-master',
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
  templateUrl: './ip-address-master.component.html',
  styleUrl: './ip-address-master.component.scss'
})
export class IpAddressMasterComponent implements OnInit {


  ISeditIpAddress = false;
  ipAddressList: any[] = [];
  alliPaddress: any[] = [];
  IpAddressList: any[] = [];
  l: number = 0;
  p: number = 1;
  itemsPage: any;
  mySelect: any;
  ipAddressForm!: FormGroup;
  x: number = 0;
  t: number = 0;
  listindex: number = 0;
  ipAddressListLength: any;

  get fTitleData() { return this.ipAddressForm.controls; }
  get fPathData() { return this.ipAddressForm.controls; }
  submittedMenuData = false;
  noData: any;
  perentList: any;
  isView: boolean = false;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;
  searchTerm: any;

  constructor(public commonService: CommonService, public storageService: StorageService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private spinner: NgxSpinnerService) {
    let pagePermission = { module: "IPAddressMaster" }
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
    this.ISeditIpAddress = false;
    this.getIpAddressList();
    this.defaultForm();
  }
  defaultForm() {
    this.ipAddressForm = this.fb.group({
      _id: ['0'],
      ipAddress: ['', [Validators.required]],
      description: [''],
    });
  }

  itemsPerPage(): void {
    this.l = this.mySelect;
  }

  addIpAddress() {
    $("#add-menu-modal").modal({ backdrop: 'static', keyboard: false });
    $("#add-menu-modal").modal('show');

    this.ISeditIpAddress = false;
  }

  cancelIpAddress() {
    $("#add-menu-modal").modal("hide");
    this.defaultForm();
    this.ISeditIpAddress = false;
  }

  saveIpAddress() {

    if (this.ipAddressForm.invalid) {
      this.submittedMenuData = true;
      return;
    }
    let ipAddressObj = {
      "ipAddress": this.ipAddressForm.controls['ipAddress'].value,
      "description": this.ipAddressForm.controls['description'].value,
    };
    this.adminLayoutService.saveIpAddress(ipAddressObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        $("#add-menu-modal").modal("hide");
        this.submittedMenuData = false;
        this.getIpAddressList();
        this.defaultForm();
        this.ISeditIpAddress = false;
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  search(value: string): void {
    this.ipAddressList = this.alliPaddress.filter((val: any) => JSON.stringify(val).toLowerCase().includes(value.toLowerCase()));
    this.p = 1;
    if (this.ipAddressList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  getIpAddressList() {

    this.adminLayoutService.getIpAddressList().subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.IpAddressList = Response.data;
        this.ipAddressList = this.IpAddressList.sort((a: any, b: any) => a.order - b.order)
        this.alliPaddress = this.ipAddressList
        this.ipAddressList = this.IpAddressList.slice();
        this.ipAddressListLength = Response.data.length;
        this.noData = false;
      } else {
        this.noData = true;
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  editIpAddress(paramsObj: any) {

    this.ISeditIpAddress = true;
    let Id: any = { '_id': paramsObj.id }
    this.adminLayoutService.getIpAddressById(Id).subscribe((Response: any) => {

      this.ipAddressForm.controls['_id'].setValue(Response.data._id)
      this.ipAddressForm.controls['ipAddress'].setValue(Response.data.ipAddress)
      this.ipAddressForm.controls['description'].setValue(Response.data.description)
      $("#add-menu-modal").modal({ backdrop: 'static', keyboard: false });
      $("#add-menu-modal").modal('show');
    }, (error) => {
      ////console.log(error);
      //this.commonService.notifier.notify('error', error.error.Message);
    });
  }
  updateIpAddress() {

    if (this.ipAddressForm.invalid) {
      this.submittedMenuData = true;
      return;
    }
    let ipAddressModelObj = {
      "_id": this.ipAddressForm.controls['_id'].value,
      "ipAddress": this.ipAddressForm.controls['ipAddress'].value,
      "description": this.ipAddressForm.controls['description'].value,
    };

    this.adminLayoutService.updateIpAddress(ipAddressModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        $("#add-menu-modal").modal("hide");
        this.submittedMenuData = false;
        this.getIpAddressList();
        this.defaultForm();
        this.ISeditIpAddress = false;
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  statusIP(paramsObj: any) {

    let statusmenuModelObj = {
      "_id": paramsObj.id,
      "status": paramsObj.status
    };

    this.adminLayoutService.statusIpAddress(statusmenuModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submittedMenuData = false;
        this.getIpAddressList();
        this.defaultForm();
        this.ISeditIpAddress = false;
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  numberOnly(event: any): any {

    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 45 || charCode > 57)) {
      return false;
    }
  }
}
