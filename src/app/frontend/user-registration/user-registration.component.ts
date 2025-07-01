import { Component, OnInit } from '@angular/core';
import { FrontLayoutService } from '../../layout/front-layout/front-layout.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-registration',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule,
    FormsModule,NgbModule,
    ReactiveFormsModule],
      templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
    
  registrationForm!: FormGroup;
  todayDate: any;
  // Tooltip state
  showPasswordTooltip = false;

  // Password condition flags
  hasUppercase = false;
  hasNumber = false;
  hasSpecialChar = false;
  hasMinLength = false;

  constructor(private fb: FormBuilder,
   private frontLayoutService:FrontLayoutService,
   private router: Router,
  private toastr: ToastrService,
  

  ) {}

  defaultRegisterForm() {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required]],
      confirmpwd: ['', [Validators.required]],
      // companyName: [''],
      contact: ['', [Validators.required,Validators.maxLength(10)]],
      gender: [''],
      newsletter: [true]
    });
  }
  ngOnInit(): void {
    this.defaultRegisterForm();
    this.todayDate = new Date().toISOString().split('T')[0];

  }


  checkPasswordStrength() {
    const password = this.registrationForm.get('pwd')?.value || '';

    this.hasUppercase = /[A-Z]/.test(password);
    this.hasNumber = /\d/.test(password);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    this.hasMinLength = password.length >= 8;
  }

  createNewUser(): void {
    // const password = this.registrationForm.get('pwd')?.value;
    // const confirmNewPassword = this.registrationForm.get('confirmpwd')?.value;

    // if (password !== confirmNewPassword) {
    //     this.registrationForm.get('confirmpwd')?.setErrors({ mismatch: true });
    //     return;
    // }
    // if (this.registrationForm.valid) {


    //   const userData = this.registrationForm.value; // Get form data
  
    //   this.frontLayoutService.createNewUser(userData).subscribe(
    //     (response: any) => {
    //       this.toastr.success("Customer registration successfully");

    //       // Assuming the response structure includes 'data' and within it 'user' and 'token'
    //       const user = response.data.user;
    //       const token = response.data.token;
    //       if (user && token) {
    //         localStorage.setItem('usertoken', token); // Save token under 'usertoken'
    //         localStorage.setItem('customerLoginData',JSON.stringify(user)); 
    //           this.router.navigate(['home']);
    //       }
    //     },
    //     (error) => {
    //       this.toastr.error(error.error.meta.message);
    //     }

    //   );
    // } else {
    //   this.registrationForm.markAllAsTouched();  
    // }
  }

  limitContactLength(event: any) {
    const input = event.target as HTMLInputElement;
    if (input.value.length > 10) {
      input.value = input.value.slice(0, 10);
    }
  }
  
}