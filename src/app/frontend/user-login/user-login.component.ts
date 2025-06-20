import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FrontLayoutService } from '../../layout/front-layout/front-layout.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-user-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoginView: boolean = true;
  isSignUpView: boolean = false;
  isForgotPasswordView: boolean = false;
  isResetPasswordView: boolean = false;
  isGenerateOtpView: boolean = false;
  isFromSignUp: boolean = false; // To track the context
  errorMessage: any;
  forgotPasswordEmail: any;
  resetPasswordForm!: FormGroup;

  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;

  @ViewChild('otp1Input') otp1Input!: ElementRef<HTMLInputElement>;
  @ViewChild('otp2Input') otp2Input!: ElementRef<HTMLInputElement>;
  @ViewChild('otp3Input') otp3Input!: ElementRef<HTMLInputElement>;
  @ViewChild('otp4Input') otp4Input!: ElementRef<HTMLInputElement>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private frontLayoutService: FrontLayoutService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private ElementRef: ElementRef,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {

  }
  

  // isFieldInvalid(field: string) {
  //   const control = this.signupForm.get(field);
  //   return control && (control.dirty || control.touched || this.isFormSubmitted) && control.invalid;
  // }

}
