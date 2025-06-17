import { Component, OnInit } from '@angular/core';
import { AdminLayoutService } from '../../../layout/admin-layout/admin-layout.service';
import { CommonService } from '../../../shared/common.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidatorFn, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import * as Chartist from 'chartist';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSortModule, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDirective } from '../../../shared/directives/common.directive';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, NiceTimePipe } from '../../../shared/pipe/common.pipe';
import { StorageKey, StorageService } from '../../../shared/storage.service';
import { environment } from '../../../../environments/environment';
// import { GroupByPipe } from 'ngx-pipes';
// import { StorageService, StorageKey } from '../../../shared/storage.service';
declare const $: any;
import { CoreHelperService } from '../../../Providers/core-helper/core-helper.service';


@Component({
  selector: 'app-change-password',
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
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup;
  profileImage: any;
  get fChangePasswordData() { return this.changePasswordForm.controls; }
  submittedChangePasswordData = false;
  hide1:any;
  hide2:any;
  hide3:any;

  constructor(private fb: FormBuilder, private router: Router, public commonService: CommonService, private coreHelper: CoreHelperService, private cookieService: CookieService, public adminLayoutService: AdminLayoutService, public storageService: StorageService) { }

  ngOnInit(): void {
    this.defaultChangePasswordForm();
    this.profileImage = environment.uploadedUrl + this.storageService.getValue(StorageKey.profileImage);
  }

  defaultChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      oldpwd: ['', [Validators.required]],
      newpwd: ['', [Validators.required, this.coreHelper.patternPasswordValidator()]],
      confirmPwd: ['', [Validators.required]],
    }, {
      validator: [this.coreHelper.MustMatch('newpwd', 'confirmPwd')]
    });
  }

  updateChangepwd() {

    this.submittedChangePasswordData = true;
    if (this.changePasswordForm.invalid) {

      return;
    }
    let changepwdObj = {
      "oldpwd": this.changePasswordForm.value.oldpwd,
      "newpwd": this.changePasswordForm.value.newpwd
    }
    this.adminLayoutService.changePassword(changepwdObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.logout();
        this.submittedChangePasswordData = false;
        this.defaultChangePasswordForm();
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error) => {
      console.log(error);
    });
  }

  logout() {
    this.storageService.removeValue(StorageKey._id);
    this.storageService.removeValue(StorageKey.firstName);
    this.storageService.removeValue(StorageKey.middleName);
    this.storageService.removeValue(StorageKey.lastName);
    this.storageService.removeValue(StorageKey.myToken);
    this.storageService.removeValue(StorageKey.employeeId);
    this.storageService.removeValue(StorageKey.roleType);
    this.storageService.removeValue(StorageKey.profileImage);
    this.storageService.removeValue(StorageKey.email);
    this.storageService.removeValue(StorageKey.p_Email);
    this.storageService.removeValue(StorageKey.accountType);
    this.storageService.removeValue(StorageKey.IsDiyanLogin);
    this.router.navigate(['/admin/admin-login']);
  }

}
