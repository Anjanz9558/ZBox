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
import { StorageService, StorageKey } from '../../../../shared/storage.service';
declare const $: any;


@Component({
  selector: 'app-document-type-master',
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
  templateUrl: './document-type-master.component.html',
  styleUrl: './document-type-master.component.scss'
})
export class DocumentTypeMasterComponent implements OnInit {

  ISeditDocumentTypeMaster = false;
  documenttypemasterList: any[] = [];
  alldocumenttypemaster: any[] = [];
  documenttypeMasterList: any[] = [];
  l: number = 0;
  p: number = 1;
  itemsPage: any;
  mySelect:any;
  documenttypemasterForm!: FormGroup;
 x: any;
  t: any;
  listindex: any;
  documenttypemasterListlength: any;
  allimageList: any;

  get fDocumenttypenameData() { return this.documenttypemasterForm.controls; }
  submittedDocumenttypeMasterData = false;
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


  constructor(public commonService: CommonService, public storageService: StorageService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private spinner: NgxSpinnerService) {
    let pagePermission = { module: "documenttypemaster" }
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
    this.ISeditDocumentTypeMaster = false;
    this.getDocumenttypeMasterList();
    this.defaultForm();
  }
  defaultForm() {
    this.documenttypemasterForm = this.fb.group({
      _id: [''],
      documentType: ['', [Validators.required]],
    });
  }

  itemsPerPage(): void {
    this.l = this.mySelect;
  }


  addDocumenttypeMaster() {
    $("#add-documenttype-modal").modal({ backdrop: 'static', keyboard: false });
    $("#add-documenttype-modal").modal('show');

    this.ISeditDocumentTypeMaster = false;
  }

  cancelDocumentTypeMaster() {
    $("#add-documenttype-modal").modal("hide");
    this.defaultForm();
    this.ISeditDocumentTypeMaster = false;
  }
  saveDocumenttypemaster() {


    if (this.documenttypemasterForm.invalid) {
      this.submittedDocumenttypeMasterData = true;
      return;
    }
    let documenttypemasterModelObj = {
      "documentType": this.documenttypemasterForm.controls['documentType'].value,
    };

    this.adminLayoutService.SaveDocumentTypeMaster(documenttypemasterModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submittedDocumenttypeMasterData = false;
        this.getDocumenttypeMasterList();
        this.defaultForm();
        this.ISeditDocumentTypeMaster = false;
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
    this.documenttypemasterList = this.alldocumenttypemaster.filter((val: any) => val.documentType.toLowerCase().includes(value.toLowerCase()));
    this.p = 1;
    if (this.documenttypemasterList.length == 0) {
      this.noData = true;
    } else {
      this.noData = false;
    }
  }

  getDocumenttypeMasterList() {

    this.adminLayoutService.getDocumentTypeMaster().subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.documenttypeMasterList = Response.data;
        this.documenttypemasterList = this.documenttypeMasterList
        this.alldocumenttypemaster = this.documenttypemasterList
        this.documenttypemasterList = this.documenttypeMasterList.slice();
        this.documenttypemasterListlength = Response.data.length;
        this.sortingList({ active: 'documentType', direction: 'asc' })
        this.noData = false;
      } else {
        this.noData = true;
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }


  editDocumentTypeMaster(paramsObj:any) {

    this.ISeditDocumentTypeMaster = true;
    let Id: any = { '_id': paramsObj.id }

    this.adminLayoutService.getDocumentTypeMasterId(Id).subscribe((Response: any) => {

      this.documenttypemasterForm.controls['_id'].setValue(Response.data._id)
      this.documenttypemasterForm.controls['documentType'].setValue(Response.data.documentType)
    $("#add-documenttype-modal").modal({ backdrop: 'static', keyboard: false });
    $("#add-documenttype-modal").modal('show');
    }, (error) => {
      ////console.log(error);
      //this.commonService.notifier.notify('error', error.error.Message);
    });
  }
  updateDocumenttypemaster() {


    if (this.documenttypemasterForm.invalid) {
      this.submittedDocumenttypeMasterData = true;
      return;
    }
    let documenttypemasterModelObj = {
      "_id": this.documenttypemasterForm.controls['_id'].value,
      "documentType": this.documenttypemasterForm.controls['documentType'].value,
    };

    this.adminLayoutService.UpdateDocumentTypeMaster(documenttypemasterModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submittedDocumenttypeMasterData = false;
        this.getDocumenttypeMasterList();
        this.defaultForm();
        this.ISeditDocumentTypeMaster = false;
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

  statusDocumentTypeMaster(paramsObj:any) {


    let statusDocumentTypeMasterModelObj = {
      "_id": paramsObj.id,
      "status": paramsObj.status
    };


    this.adminLayoutService.StatusDocumentTypeMaster(statusDocumentTypeMasterModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submittedDocumenttypeMasterData = false;
        this.getDocumenttypeMasterList();
        this.defaultForm();
        this.ISeditDocumentTypeMaster = false;
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

    const data = this.alldocumenttypemaster.slice();
    if (!sort.active || sort.direction === '') {
      this.documenttypemasterList = data;
      return;
    }

    this.documenttypemasterList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'documentType': return compare(a.documentType, b.documentType, isAsc);
        default: return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
