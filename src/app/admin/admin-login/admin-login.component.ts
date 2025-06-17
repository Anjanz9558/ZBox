import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidatorFn, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutService } from '../../layout/admin-layout/admin-layout.service';
import { CommonService } from './../../shared/common.service';
import { CookieService } from 'ngx-cookie-service';
// import * as Chartist from 'chartist';
import { Router } from '@angular/router';
import { StorageService, StorageKey } from '../../shared/storage.service';
// import { CoreHelperService } from '../../Providers/core-helper/core-helper.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { CardBodyComponent, CardComponent, CardGroupComponent, ColComponent, ContainerComponent, InputGroupComponent, InputGroupTextDirective, RowComponent, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';



@Component({
  selector: 'app-admin-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective
],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit {
    loginForm!: FormGroup;

    userId: any;

    hide1 = false;

    get fLoginData() { return this.loginForm.controls; }

    submittedLoginData = false;

    constructor(private fb: FormBuilder, private router: Router, public commonService: CommonService,  private cookieService: CookieService, public storageService: StorageService, public adminLayoutService: AdminLayoutService, ) {

    }

    ngOnInit() {
        if (localStorage.getItem('myToken')) {
            this.router.navigate(['/admin/dashboard']);
        }
        this.defaultloginForm();
    }
    defaultloginForm() {
        this.loginForm = this.fb.group({

            email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
            pwd: ['', [Validators.required]],
        });
    }


    handleKeyUp(e:any) {
        if (e.keyCode === 13) {
            this.login();
        }
    }

    login() {

        this.submittedLoginData = true;
        if (this.loginForm.invalid) {
            return;
        }
        let loginObj = {
            c_Email: this.loginForm.value.email,
            pwd: this.loginForm.value.pwd
        };
        this.adminLayoutService.adminLogin(loginObj).subscribe((Response: any) => {

            if (Response.meta.code == 200) {
                localStorage.setItem('LoginUserData', JSON.stringify(Response.data))
                this.storageService.setValue(StorageKey.myToken, Response.data.myToken);
                this.storageService.setValue(StorageKey._id, Response.data._id);
                this.storageService.setValue(StorageKey.employeeId, Response.data.employeeId);
                this.storageService.setValue(StorageKey.firstName, Response.data.firstName);
                this.storageService.setValue(StorageKey.middleName, Response.data.middleName);
                this.storageService.setValue(StorageKey.lastName, Response.data.lastName);
                this.storageService.setValue(StorageKey.email, Response.data.c_Email);
                this.storageService.setValue(StorageKey.p_Email, Response.data.p_Email);
                this.storageService.setValue(StorageKey.profileImage, Response.data.profile_image);
                this.storageService.setValue(StorageKey.accountType, Response.data.accountType);
                this.storageService.setValue(StorageKey.roleType, Response.data.roleName);
                this.storageService.setValue(StorageKey.IsDiyanLogin, 'true');
                // this.commonService.notifier.notify('success', Response.meta.message);
                this.router.navigate(['/admin/dashboard']);
                // this.commonService.notifier.notify('success', Response.meta.message);
            }
            else if (Response.meta.code === 1012) {
                // this.commonService.notifier.notify('error', Response.meta.message);
            }
            else {
                // this.commonService.notifier.notify('error', Response.meta.message);
            }
        }, (error:any) => {
            console.log(error);
        });
    }

}
