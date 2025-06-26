import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { NgxPaginationModule } from 'ngx-pagination';
import { Router, RouterModule } from '@angular/router';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, GroupByPipe, NiceTimePipe } from '../../../../shared/pipe/common.pipe';
declare const $: any;
import moment from 'moment';
import { CommonService } from '../../../../shared/common.service';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { StorageService } from '../../../../shared/storage.service';

@Component({
  selector: 'app-company-doc-master',
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
  templateUrl: './company-doc-master.component.html',
  styleUrl: './company-doc-master.component.scss'
})
export class CompanyDocMasterComponent implements OnInit {
    ISeditDocumentMaster = false;
    documentmasterList: any[] = [];
    alldocumentmaster: any[] = [];
    documentMasterList: any[] = [];
    l: number = 0;
    p: number = 1;
    itemsPage: any;
    mySelect = 0;
    documentmasterForm!: FormGroup;
    x: number = 0;
    t: number = 0;
    searchDocument: string = '';
    listindex: number = 0;
    documentmasterListlength: any;
    allimageList: any;

    get fDocumentnameData() { return this.documentmasterForm.controls; }
    submitteddocumentMasterData = false;
    public imagePath: any;
    imgURL: any;
    message: string = '';
    noData: any;
    noimageData: any;

    activeTab: number = 0;
    imageList: any;
    //image: any;
    file: any;
    Image: any;
    isView: boolean = false;
    isCreated: boolean = false;
    isUpdated: boolean = false;
    isDeleted: boolean = false;
    searchTerm: any;


    constructor(public commonService: CommonService, public adminLayoutService: AdminLayoutService, public storageService: StorageService, private fb: FormBuilder, private router: Router) {
        let pagePermission = { module: "DocumentMaster" }
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
        this.ISeditDocumentMaster = false;
        this.getDocumentmasterList();
        this.defaultForm();
    }

    defaultForm() {
        this.documentmasterForm = this.fb.group({
            _id: [''],
            documentName: ['', [Validators.required]],
        });
    }

    itemsPerPage(): void {
        this.l = this.mySelect;
    }


    addDocumentmaster() {
        $("#add-document-modal").modal({ backdrop: 'static', keyboard: false });
        $("#add-document-modal").modal("show");
        this.ISeditDocumentMaster = false;
    }

    cancelDocumentmaster() {
        $("#add-document-modal").modal("hide");
        this.defaultForm();
        this.ISeditDocumentMaster = false;
    }
    saveDocumentmaster() {


        if (this.documentmasterForm.invalid) {
            this.submitteddocumentMasterData = true;
            return;
        }
        let documentmasterModelObj = {
            "documentName": this.documentmasterForm.controls['documentName'].value,

        };


        this.adminLayoutService.SavedocumentMaster(documentmasterModelObj).subscribe((Response: any) => {

            if (Response.meta.code == 200) {
                this.submitteddocumentMasterData = false;
                this.getDocumentmasterList();
                this.defaultForm();
                this.ISeditDocumentMaster = false;
                // this.commonService.notifier.notify('success', "Document Master Uploaded Successfully", Response.meta.message);
                $("#add-document-modal").modal("hide");
            }
            else {
                // this.commonService.notifier.notify('error', Response.meta.message);
            }
        }, (error) => {
            console.log(error);
        });
    }

    search(value: string): void {
        this.documentmasterList = this.alldocumentmaster.filter((val: any) => val.documentName.toLowerCase().includes(value.toLowerCase()));
        this.p = 1;
        if (this.documentmasterList.length == 0) {
            this.noData = true;
        } else {
            this.noData = false;
        }
    }

    getDocumentmasterList() {

        this.adminLayoutService.getdocumentMaster().subscribe((Response: any) => {

            if (Response.meta.code == 200) {
                this.documentMasterList = Response.data;
                this.documentmasterList = this.documentMasterList
                this.alldocumentmaster = this.documentmasterList
                this.documentmasterList = this.documentMasterList.slice();
                this.documentmasterListlength = Response.data.length;
                this.sortingList({ active: 'documentName', direction: 'asc' });
                this.noData = false;
            } else {
                this.noData = true;
            }
            //for select sub industry step
        }, (error) => {
            console.log(error.error.Message);
        });
    }


    editDocumentmaster(paramsObj: any) {

        this.ISeditDocumentMaster = true;
        let Id: any = { '_id': paramsObj.id }
        this.adminLayoutService.getdocumentMasterId(Id).subscribe((Response: any) => {

            this.documentmasterForm.controls['_id'].setValue(Response.data._id)
            this.documentmasterForm.controls['documentName'].setValue(Response.data.documentName)
            $("#add-document-modal").modal({ backdrop: 'static', keyboard: false });
            $("#add-document-modal").modal("show");

        }, (error) => {
            ////console.log(error);
            //this.commonService.notifier.notify('error', error.error.Message);
        });
    }
    updateDocumentmaster() {


        if (this.documentmasterForm.invalid) {
            this.submitteddocumentMasterData = true;
            return;
        }
        let documentmasterModelObj = {
            "_id": this.documentmasterForm.controls['_id'].value,
            "documentName": this.documentmasterForm.controls['documentName'].value,
        };

        this.adminLayoutService.UpdatedocumentMaster(documentmasterModelObj).subscribe((Response: any) => {

            if (Response.meta.code == 200) {
                this.submitteddocumentMasterData = false;
                this.getDocumentmasterList();
                this.defaultForm();
                this.ISeditDocumentMaster = false;
                // this.commonService.notifier.notify('success', "Document Master Updated Successfully", Response.meta.message);
                $("#add-document-modal").modal("hide");
            }
            else {
                // this.commonService.notifier.notify('error', Response.meta.message);
            }
        }, (error) => {
            console.log(error);
        });
    }

    statusDocumentmaster(paramsObj: any) {


        let statusdocumentmasterModelObj = {
            "_id": paramsObj.id,
            "status": paramsObj.status
        };


        this.adminLayoutService.StatusdocumentMaster(statusdocumentmasterModelObj).subscribe((Response: any) => {

            if (Response.meta.code == 200) {
                this.submitteddocumentMasterData = false;
                this.getDocumentmasterList();
                this.defaultForm();
                this.ISeditDocumentMaster = false;
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

        const data = this.alldocumentmaster.slice();
        if (!sort.active || sort.direction === '') {
            this.documentmasterList = data;
            return;
        }



        this.documentmasterList = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';

            switch (sort.active) {
                case 'documentName': return compare(a.documentName, b.documentName, isAsc);
                default: return 0;
            }
        });
    }

}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
