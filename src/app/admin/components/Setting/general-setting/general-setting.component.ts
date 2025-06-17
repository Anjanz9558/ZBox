import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../../../shared/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
declare const $: any;

@Component({
    selector: 'app-general-setting',
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],

    standalone: true,
    templateUrl: './general-setting.component.html',
    styleUrl: './general-setting.component.scss'
})
export class GeneralSettingComponent implements OnInit {
    commonInfoForm!: FormGroup;
    pdfInfoForm!: FormGroup;

    submitteduserData = false;
    message = '';

    imgURLLogo: any = '';
    imgURLFavicon: any = '';
    fileLogo: File | null = null;
    fileFavicon: File | null = null;


    fileWatermark: File | null = null;
    filePdfLogo: File | null = null;
    fileHeaderLine: File | null = null;
    imgURLWatermark: string | null = null;
    imgURLPdfLogo: string | null = null;
    imgURLHeaderLine: string | null = null;
mobileNumbers!: FormArray;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        public commonService: CommonService,
        public adminLayoutService: AdminLayoutService
    ) { }

    ngOnInit(): void {
        this.defaultForm();
        this.pdfForm();

    }

    defaultForm() {
        this.commonInfoForm = this.fb.group({
            title: ['', Validators.required],
            companyname: ['', Validators.required]
        });
    }

  pdfForm() {
  this.pdfInfoForm = this.fb.group({
    gstNo: ['', Validators.required],
    panNo: ['', Validators.required],
    website: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    properiterCompany: ['', Validators.required],
    properiterName: ['', Validators.required],
    mobileNumbers: this.fb.array([this.createMobileField()])
  });
}

allowOnlyNumbers(event: KeyboardEvent): boolean {
  const charCode = event.charCode;
  // Allow only digits (0–9)
  if (charCode >= 48 && charCode <= 57) {
    return true;
  }
  event.preventDefault();
  return false;
}


get mobileNumbersControls(): FormControl[] {
  return (this.pdfInfoForm.get('mobileNumbers') as FormArray).controls as FormControl[];
}
createMobileField(): FormControl {
  return this.fb.control('', [Validators.required, Validators.pattern('^[0-9]{10}$')]);
}

addMobileField(): void {
  const mobiles = this.pdfInfoForm.get('mobileNumbers') as FormArray;
  if (mobiles.length < 3) {
    mobiles.push(this.createMobileField());
  }
}

removeMobileField(index: number): void {
  const mobiles = this.pdfInfoForm.get('mobileNumbers') as FormArray;
  if (mobiles.length > 1) {
    mobiles.removeAt(index);
  }
}

    letterOnly(event: any): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        return ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122));
    }

    preview(event: Event, type: 'logo' | 'favicon'): void {
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        const mimeType = file.type;

        if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
            const reader = new FileReader();
            reader.onload = () => {
                if (type === 'logo') {
                    this.imgURLLogo = reader.result;
                    this.fileLogo = file;
                } else {
                    this.imgURLFavicon = reader.result;
                    this.fileFavicon = file;
                }
            };
            reader.readAsDataURL(file);
            this.message = '';
        } else {
            this.message = 'Only JPEG and PNG image is supported.';
            if (type === 'logo') {
                this.imgURLLogo = '';
                this.fileLogo = null;
            } else {
                this.imgURLFavicon = '';
                this.fileFavicon = null;
            }
        }
    }

    removeUploadedFile(type: 'logo' | 'favicon'): void {
        if (type === 'logo') {
            this.imgURLLogo = '';
            this.fileLogo = null;
        } else {
            this.imgURLFavicon = '';
            this.fileFavicon = null;
        }
    }

    onImageError(event: Event): void {
        (event.target as HTMLImageElement).src = '../assets/img/no-image-available.jpg';
    }

    SaveUser(btnName: string): void {
        this.submitteduserData = true;
        if (this.commonInfoForm.invalid || !this.fileLogo || !this.fileFavicon) {
            if (!this.fileLogo) this.message = 'Logo is required.';
            else if (!this.fileFavicon) this.message = 'Favicon is required.';
            return;
        }

        const formData: FormData = new FormData();
        formData.append('title', this.commonInfoForm.value.title);
        formData.append('companyname', this.commonInfoForm.value.companyname);

        if (this.fileLogo) {
            formData.append('profile_image', this.fileLogo);
        }
        if (this.fileFavicon) {
            formData.append('favicon_image', this.fileFavicon);
        }

        this.adminLayoutService.SaveUserBasicInfoMaster(formData).subscribe(
            (response: any) => {
                if (response.meta.code === 200) {
                    this.submitteduserData = false;
                    // Optionally reset form or show a success message
                }
            },
            (error: any) => {
                console.error(error);
            }
        );
    }

  previewPdfFile(event: Event, type: string) {
    const target = event.target as HTMLInputElement;
    if (target?.files?.length) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (type === 'watermark') {
          this.imgURLWatermark = reader.result as string;
          this.fileWatermark = file;
        } else if (type === 'pdfLogo') {
          this.imgURLPdfLogo = reader.result as string;
          this.filePdfLogo = file;
        } else if (type === 'headerLine') {
          this.imgURLHeaderLine = reader.result as string;
          this.fileHeaderLine = file;
        }
      };
      reader.readAsDataURL(file);
    }
  }


  removeUploadedPdfFile(type: string) {
    if (type === 'watermark') {
      this.fileWatermark = null;
      this.imgURLWatermark = null;
    } else if (type === 'pdfLogo') {
      this.filePdfLogo = null;
      this.imgURLPdfLogo = null;
    } else if (type === 'headerLine') {
      this.fileHeaderLine = null;
      this.imgURLHeaderLine = null;
    }
  }

SavePdfData(btnName: string): void {
  this.submitteduserData = true;

  if (
    this.pdfInfoForm.invalid ||
    !this.fileWatermark ||
    !this.filePdfLogo ||
    !this.fileHeaderLine
  ) {
    return;
  }

  const formData = new FormData();
  const mobileArray = this.pdfInfoForm.get('mobileNumbers') as FormArray;

  formData.append('gstNo', this.pdfInfoForm.value.gstNo);
  formData.append('panNo', this.pdfInfoForm.value.panNo);
  formData.append('website', this.pdfInfoForm.value.website);
  formData.append('email', this.pdfInfoForm.value.email);
  formData.append('properiterCompany', this.pdfInfoForm.value.properiterCompany);
  formData.append('properiterName', this.pdfInfoForm.value.properiterName);

  mobileArray.controls.forEach((ctrl, i) => {
    formData.append(`mobileNo[${i}]`, ctrl.value);
  });

  formData.append('watermark', this.fileWatermark!);
  formData.append('pdfLogo', this.filePdfLogo!);
  formData.append('headerLine', this.fileHeaderLine!);
}
}