import { Component, OnInit } from '@angular/core';
import{FrontLayoutService} from'.././front-layout.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../../shared/common.service';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-front-footer',
  standalone: true, 
  templateUrl: './front-footer.component.html',
  styleUrl: './front-footer.component.scss',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule,
    FormsModule,
    ReactiveFormsModule],})
    
export class FrontFooterComponent implements OnInit {
  allCategoriesList:any=[];
  generalSettingData: any;
  selectedImageForfooterLogo:  any ;
  newsLatterForm!: FormGroup;

   constructor(
      private frontLayoutService: FrontLayoutService,
      private fb: FormBuilder,private router: Router,
      public commonService: CommonService,
      private toastr: ToastrService,
  
    ) { }
  
    ngOnInit(): void {
  

      this.newsLatterForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      });
    }



    
  isLoggedIn(): boolean {
    const customerLoginData = localStorage.getItem('customerLoginData');
    const userToken = localStorage.getItem('usertoken');
    return customerLoginData !== null || userToken !== null;
  }

 
}
