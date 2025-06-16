import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { ConfirmDirective } from '../../../../shared/directives/common.directive';
import { Router, RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { CommonService } from '../../../../shared/common.service';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from "ngx-spinner";
import { ArraySortPipeDesc, ArraySortPipeAsc, GroupByPipe, NiceTimePipe, ArraySortPipeSimple ,FilterPipe} from '../../../../shared/pipe/common.pipe';
declare const $: any;
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-role-master',
    standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ConfirmDirective, 
    RouterModule,
    MatSortModule,
    FilterPipe
  ],
  templateUrl: './role-master.component.html',
  styleUrl: './role-master.component.scss'
})
export class RoleMasterComponent implements OnInit {


    ISeditRoleMaster = false;
    rolemasterList: any[]=[];
    allrolemaster: any[] = [];
    roleMasterList: any[] =[];
    l: number=0;
    p: number = 1;
    itemsPage: any;
    mySelect:any;
    rolemasterForm!: FormGroup;
    x!: number;
    t!: number;
    listindex!: number;
    rolemasterListlength: any;
    allimageList: any;

    get fRolenameData() { return this.rolemasterForm.controls; }
    submittedroleMasterData = false;
    public imagePath:any;
    imgURL: any;
    message!: string;
    noData:any;
    noimageData:any
    activeTab:  any;
    imageList: any;
    //image: any;
    file: any;
    Image: any;
    isView: boolean = false;
    isCreated: boolean = false;
    isUpdated: boolean = false;
    isDeleted: boolean = false;
    searchTerm!: string;

    constructor(public commonService: CommonService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private spinner: NgxSpinnerService) {
        let pagePermission = { module: "rolemaster" }
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
        this.ISeditRoleMaster = false;
        this.getRolemasterList();
        this.defaultForm();
    }
    defaultForm() {
        this.rolemasterForm = this.fb.group({
            _id: [''],
            roleName: ['', [Validators.required]],
        });
    }
    search(value: any): void {

        this.rolemasterList = this.allrolemaster.filter((val) => val.roleName.toLowerCase().includes(value.toLowerCase()));
        this.p = 1;
        if (this.rolemasterList.length == 0) {
            this.noData = true;
        } else {
            this.noData = false;
        }
    }

    itemsPerPage(): void {
        this.l = this.mySelect;
    }


    addRolemaster() {
     $("#add-role-modal").modal({ backdrop: 'static', keyboard: false });
$("#add-role-modal").modal('show');
        this.ISeditRoleMaster = false;
    }

    cancelRolemaster() {
        $("#add-role-modal").modal("hide");
        this.defaultForm();
        this.ISeditRoleMaster = false;
    }
    saveRolemaster() {


        if (this.rolemasterForm.invalid) {
            this.submittedroleMasterData = true;
            return;
        }
        let rolemasterModelObj = {
            "roleName": this.rolemasterForm.controls['roleName'].value,

        };


        this.adminLayoutService.SaveroleMaster(rolemasterModelObj).subscribe((Response: any) => {

            if (Response.meta.code == 200) {
                this.submittedroleMasterData = false;
                this.getRolemasterList();
                this.defaultForm();
                this.ISeditRoleMaster = false;
                // this.commonService.notifier.notify('success', Response.meta.message);
                $("#add-role-modal").modal("hide");
            }
            else {
                // this.commonService.notifier.notify('error', Response.meta.message);
            }
        }, (error) => {
            console.log(error);
        });
    }

    getRolemasterList() {

        this.adminLayoutService.getroleMaster().subscribe((Response: any) => {

            if (Response.meta.code == 200) {
                this.roleMasterList = Response.data;
                this.rolemasterList = this.roleMasterList
                this.allrolemaster = this.rolemasterList
                this.rolemasterList = this.roleMasterList.slice();
                this.rolemasterListlength = Response.data.length;
                this.sortingList({ active: 'roleName', direction: 'asc' })
                this.noData = false;
            } else {
                this.noData = true;
            }
            //for select sub industry step
        }, (error) => {
            console.log(error.error.Message);
        });
    }


    editRolemaster(paramsObj:any) {

        this.ISeditRoleMaster = true;
        let Id: any = { '_id': paramsObj.id }
        this.adminLayoutService.getroleMasterId(Id).subscribe((Response: any) => {

            this.rolemasterForm.controls['_id'].setValue(Response.data._id)
            this.rolemasterForm.controls['roleName'].setValue(Response.data.roleName)
            // $("#add-role-modal").modal({ backdrop: 'static', keyboard: false, show: true });;
$("#add-role-modal").modal({ backdrop: 'static', keyboard: false });
$("#add-role-modal").modal('show');

        }, (error) => {
            ////console.log(error);
            //this.commonService.notifier.notify('error', error.error.Message);
        });
    }
    updateRolemaster() {


        if (this.rolemasterForm.invalid) {
            this.submittedroleMasterData = true;
            return;
        }
        let rolemasterModelObj = {
            "_id": this.rolemasterForm.controls['_id'].value,
            "roleName": this.rolemasterForm.controls['roleName'].value,
        };

        this.adminLayoutService.UpdateroleMaster(rolemasterModelObj).subscribe((Response: any) => {

            if (Response.meta.code == 200) {
                this.submittedroleMasterData = false;
                this.getRolemasterList();
                this.defaultForm();
                this.ISeditRoleMaster = false;
                // this.commonService.notifier.notify('success', Response.meta.message);
                $("#add-role-modal").modal("hide");
            }
            else {
                // this.commonService.notifier.notify('error', Response.meta.message);
            }
        }, (error) => {
            console.log(error);
        });
    }

    statusRolemaster(paramsObj:any) {


        let statusrolemasterModelObj = {
            "_id": paramsObj.id,
            "status": paramsObj.status
        };


        this.adminLayoutService.StatusroleMaster(statusrolemasterModelObj).subscribe((Response: any) => {

            if (Response.meta.code == 200) {
                this.submittedroleMasterData = false;
                this.getRolemasterList();
                this.defaultForm();
                this.ISeditRoleMaster = false;
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

        const data = this.allrolemaster.slice();
        if (!sort.active || sort.direction === '') {
            this.rolemasterList = data;
            return;
        }

        this.rolemasterList = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';

            switch (sort.active) {
                case 'roleName': return compare(a.roleName, b.roleName, isAsc);
                default: return 0;
            }
        });
    }

}


function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
