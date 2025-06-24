import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidatorFn, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FrontLayoutService } from '../../layout/front-layout/front-layout.service';
import { response } from 'express';
import { CommonService } from '../../shared/common.service';
import swal from 'sweetalert';
import { CommonModule } from '@angular/common';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-user-login',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule,NgOtpInputModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  otp: any;
  otpMessage: string='';
  pinReset: any;
  pinResetMessage: string='';
  cpinReset: any;
  cpinResetMessage: string='';
  c_Email: string='';

  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '45px',
      'height': '45px',
      'margin-right': '0',
      'border-radius': '10px'
    }
  };

  loginForm!: FormGroup;
  otpForm!: FormGroup;
  otpVerifyForm!: FormGroup;
  newPinForm!: FormGroup;

  get fLoginData() { return this.loginForm.controls; }
  get fotpData() { return this.otpForm.controls; }
  get fotpVerifyData() { return this.otpVerifyForm.controls; }
  get fnewPinData() { return this.newPinForm.controls; }

  submittedLoginData = false;
  submittedOtpData = false;
  submittedOtpVerifyData = false;
  submittedNewPinData = false;

  isLoginFlag: boolean = false;
  isOTPSendFlag: boolean = false;
  isOTPVerifyFlag: boolean = false;
  isNewPINFlag: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private frontLayoutService: FrontLayoutService, public commonService: CommonService,) { }

  ngOnInit(): void {
    localStorage.clear()
    this.defaultloginForm();
    this.loginPage();
    // this.newPinSetPage();
  }

  loginPage() {
    this.defaultloginForm();
    this.submittedLoginData = false;
    this.isLoginFlag = true;
    this.isOTPSendFlag = false;
    this.isOTPVerifyFlag = false;
    this.isNewPINFlag = false;
  }
  forgotPinPage() {
    this.defaultOTPForm();
    this.submittedOtpData = false;
    this.isLoginFlag = false;
    this.isOTPSendFlag = true;
    this.isOTPVerifyFlag = false;
    this.isNewPINFlag = false;
  }
  otpVerificationPage() {
    this.defaultOTPVerifyForm();
    this.submittedOtpVerifyData = false;
    this.isLoginFlag = false;
    this.isOTPSendFlag = false;
    this.isOTPVerifyFlag = true;
    this.isNewPINFlag = false;
  }
  newPinSetPage() {
    this.defaultNewPINForm();
    this.submittedNewPinData = false;
    this.isLoginFlag = false;
    this.isOTPSendFlag = false;
    this.isOTPVerifyFlag = false;
    this.isNewPINFlag = true;
  }

  defaultloginForm() {
    this.loginForm = this.fb.group({
      c_Email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
    });
  }
  defaultOTPForm() {
    this.otpForm = this.fb.group({
      c_Email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
    });
  }
  defaultOTPVerifyForm() {
    this.otpVerifyForm = this.fb.group({
      employeeId: ['', [Validators.required]],
    });
  }
  defaultNewPINForm() {
    this.newPinForm = this.fb.group({
      employeeId: ['', [Validators.required]],
    });
  }


  onOtpChange(otp:any) {
    this.otp = otp;
    if (this.otp.length == 4) {
      this.otpMessage = ""
      this.login()
    }
  }
  onOTPChangeFromOtpPinVerify(otp:any) {
    this.otp = otp;
    if (this.otp.length == 4) {
      this.otpMessage = ""
    }
  }
  onPINChange(otp:any) {
    this.pinReset = otp;
    if (this.pinReset.length == 4) {
      this.pinResetMessage = ""
    }
  }
  onCPINChange(otp:any) {
    this.cpinReset = otp;
    if (this.cpinReset.length == 4) {
      this.cpinResetMessage = ""
    }
  }

  login() {
    this.submittedLoginData = true;
    this.loginForm.controls['c_Email'].setValue(this.loginForm.value.c_Email.trim().toLowerCase())
    // let ipCheck = false;
    // for (let i = 0; i < this.ipAddressList.length; i++) {
    //   if (this.ipAddressList[i].ipAddress == this.ipAddress) {
    //     ipCheck = true;
    //     break;
    //   }
    // }
    // if (ipCheck === true) {
    if (this.otp.length != 4) {
      this.otpMessage = "OTP is Required."
    }
    if (this.otp.length == 4) {
      this.otpMessage = ""
    }
    if (this.otp == "" || !this.otp || this.otp.length != 4 || this.loginForm.invalid) {
      return;
    }
    let obj = {
      "c_Email": this.loginForm.value.c_Email,
      "PIN": this.otp
    }
    this.frontLayoutService.loginwithPin(obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        localStorage.setItem('LoginUserData', JSON.stringify(Response.data));
        localStorage.setItem('myToken', JSON.stringify(Response.data.myToken));
        localStorage.setItem('IsDiyanLogin', 'true');
        this.otp = "";
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 1000);
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    })
  }
  // }

  otpSend() {
    if (this.otpForm.invalid) {
      this.submittedOtpData = true;
      return
    }
    let Obj = {
      c_Email: this.otpForm.value.c_Email
    }
    this.frontLayoutService.otpSendInEmail(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.otpVerificationPage();
        this.otpVerifyForm.controls['employeeId'].setValue(Response.data.employeeId);
        swal({
          // title: "Break Start",
          text: "OTP send successfully.",
          icon: "success",
          timer: 1500,
          buttons: [false]
        });
      }
      else {
        swal({
          // title: "Break Start",
          text: Response.meta.message,
          icon: "error",
          timer: 1500,
          buttons: [false]
        });
      }
    })
  }
  otpVerification() {
    if (this.otp == "" || !this.otp || this.otp.length != 4 || this.otpVerifyForm.invalid) {
      this.submittedOtpVerifyData = true;
      return
    }
    if (this.otp.length != 4) {
      this.otpMessage = "OTP is Required."
    }
    if (this.otp.length == 4) {
      this.otpMessage = ""
    }

    let Obj = {
      employeeId: this.otpVerifyForm.value.employeeId,
      OTP: this.otp
    }
    this.frontLayoutService.otpVerificationWithEmployeeId(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.otp = '';
        this.newPinSetPage();
        this.newPinForm.controls['employeeId'].setValue(Response.data.employeeId);
        swal({
          // title: "Break Start",
          text: "OTP Verified successfully.",
          icon: "success",
          timer: 1500,
          buttons: [false]
        });
      }
      else {
        swal({
          // title: "Break Start",
          text: Response.meta.message,
          icon: "error",
          timer: 1500,
          buttons: [false]
        });
      }
    })
  }

  resetPin() {

    if (this.pinReset.length != 4) {
      this.pinResetMessage = "PIN is Required."
    }
    if (this.pinReset.length == 4) {
      this.pinResetMessage = ""
    }
    if (this.cpinReset.length != 4) {
      this.cpinResetMessage = "Confirm PIN is Required."
    }
    if (this.pinReset != this.cpinReset && this.cpinReset.length == 4) {
      this.cpinResetMessage = "Confirm PIN is not match."
    }
    if (this.cpinReset.length == 4 && this.pinReset == this.cpinReset) {
      this.cpinResetMessage = "";
    }

    if (this.pinReset == "" || !this.pinReset || this.pinReset.length != 4 || this.cpinReset == "" || this.pinReset != this.cpinReset || !this.cpinReset || this.cpinReset.length != 4 || this.newPinForm.invalid) {
      this.submittedOtpVerifyData = true;
      return;
    }

    let Obj = {
      employeeId: this.newPinForm.value.employeeId,
      PIN: this.pinReset
    }
    this.frontLayoutService.resetPinByEmployeeId(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.otp = '';
        this.loginPage();
        swal({
          // title: "Break Start",
          text: "PIN reset successfully.",
          icon: "success",
          timer: 1500,
          buttons: [false]
        });
      }
      else {
        swal({
          // title: "Break Start",
          text: Response.meta.message,
          icon: "error",
          timer: 1500,
          buttons: [false]
        });
      }
    })
  }


}
