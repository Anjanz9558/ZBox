import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../../../../shared/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { environment } from '../../../../../environments/environment';

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

    isLogoMissing = false;
    isFaviconMissing = false;


    isHeaderLineMissing = false;
    isPdfLogoMissing = false;
    isWatermarkLogoMissing = false;
    fileWatermark: File | null = null;
    filePdfLogo: File | null = null;
    fileHeaderLine: File | null = null;

    imgURLWatermark: any = '';
    imgURLPdfLogo: any = '';
    imgURLHeaderLine: any = '';
    mobileNumbers!: FormArray;
    commonInfoList: any[] = [];

      isView: boolean = false;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;
    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        public commonService: CommonService,
        public adminLayoutService: AdminLayoutService
    ) { 
            let pagePermission = { module: "generalsettings" }
    this.adminLayoutService.getpagePermission(pagePermission).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.isView = Response.data.isView;
        this.isCreated = Response.data.isCreated;
        this.isUpdated = Response.data.isUpdated;
        this.isDeleted = Response.data.isDeleted;
        if (this.isView === false || this.isCreated === false || this.isUpdated === false) {
          this.router.navigate(['admin/dashboard']);
        }
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  
    }

    ngOnInit(): void {
        this.defaultForm();
        this.pdfForm();
        this.getCommonInfoList();
        this.getpdfInfoList();



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
                    this.isLogoMissing = false;  // ✅ clear error after valid upload
                } else {
                    this.imgURLFavicon = reader.result;
                    this.fileFavicon = file;
                    this.isFaviconMissing = false;  // ✅ clear error after valid upload
                }
            };
            reader.readAsDataURL(file);
            this.message = '';
        } else {
            this.message = 'Only JPEG and PNG image is supported.';
            if (type === 'logo') {
                this.imgURLLogo = '';
                this.fileLogo = null;
                this.isLogoMissing = true;
            } else {
                this.imgURLFavicon = '';
                this.fileFavicon = null;
                this.isFaviconMissing = true;
            }
        }
    }

    removeUploadedFile(type: 'logo' | 'favicon'): void {
        if (type === 'logo') {
            this.fileLogo = null;
            this.imgURLLogo = null;
            this.isLogoMissing = true;
        } else if (type === 'favicon') {
            this.fileFavicon = null;
            this.imgURLFavicon = null;
            this.isFaviconMissing = true;
        }
    }

    onImageError(event: Event): void {
        (event.target as HTMLImageElement).src = '../assets/img/no-image-available.jpg';
    }

    getCommonInfoList() {
        this.adminLayoutService.getGeneralSettingCommonInfoList().subscribe(
            (response: any) => {
                if (response.meta.code === 200 && response.data) {
                    this.commonInfoList = response.data;

                    // Patch form fields
                    this.commonInfoForm.patchValue({
                        title: response.data.title,
                        companyname: response.data.companyname,
                    });

                    // Set image preview URLs from backend filenames
                    if (response.data.company_logo) {
                        this.imgURLLogo = this.commonService.rootData.uploadedUrl + response.data.company_logo;
                        // this.imgURLLogo = `${this.commonService.rootData.uploadsUrl}photos/${response.data.company_logo}`;

                    }
                    if (response.data.favicon_image) {
                        this.imgURLFavicon = this.commonService.rootData.uploadedUrl + response.data.favicon_image;
                    }

                    // If needed, store file names (optional)
                    // this.fileLogo = response.data.company_logo;
                    // this.fileFavicon = response.data.favicon_image;
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }


    SaveUser(btnName: string): void {
        this.submitteduserData = true;

        // Validation logic
        this.isLogoMissing = !this.fileLogo && !this.imgURLLogo;
        this.isFaviconMissing = !this.fileFavicon && !this.imgURLFavicon;

        if (this.isLogoMissing || this.isFaviconMissing) {
            return; // Prevent saving if required fields are missing
        }

        const formData: FormData = new FormData();
        formData.append('title', this.commonInfoForm.value.title);
        formData.append('companyname', this.commonInfoForm.value.companyname);

        if (this.fileLogo) {
            formData.append('company_logo', this.fileLogo);
        }
        if (this.fileFavicon) {
            formData.append('favicon_image', this.fileFavicon);
        }

        this.adminLayoutService.SaveGeneralSettingCommonInfo(formData).subscribe(
            (response: any) => {
                if (response.meta.code === 200) {
                    this.submitteduserData = false;
                    this.getCommonInfoList();
                }
            },
            (error: any) => {
                console.error(error);
            }
        );
    }

    previewPdfFile(event: Event, type: string) {
        // const target = event.target as HTMLInputElement;
        // if (target?.files?.length) {
        //     const file = target.files[0];
        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         if (type === 'watermark') {
        //             this.imgURLWatermark = reader.result as string;
        //             this.fileWatermark = file;
        //         } else if (type === 'pdfLogo') {
        //             this.imgURLPdfLogo = reader.result as string;
        //             this.filePdfLogo = file;
        //         } else if (type === 'headerLine') {
        //             this.imgURLHeaderLine = reader.result as string;
        //             this.fileHeaderLine = file;
        //         }
        //     };
        //     reader.readAsDataURL(file);
        // }
        const input = event.target as HTMLInputElement;
        if (!input.files || input.files.length === 0) return;

        const file = input.files[0];
        const mimeType = file.type;

        if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
            const reader = new FileReader();
            reader.onload = () => {
                if (type === 'watermark') {
                    this.imgURLWatermark = reader.result;
                    this.fileWatermark = file;
                    this.isWatermarkLogoMissing = false;  // ✅ clear error after valid upload
                } else if (type === 'pdfLogo') {
                    this.imgURLPdfLogo = reader.result;
                    this.filePdfLogo = file;
                    this.isPdfLogoMissing = false;  // ✅ clear error after valid upload
                } else if (type === 'headerLine') {
                    this.imgURLHeaderLine = reader.result as string;
                    this.fileHeaderLine = file;
                    this.isHeaderLineMissing = false;
                }
            };
            reader.readAsDataURL(file);
            this.message = '';
        } else {
            this.message = 'Only JPEG and PNG image is supported.';
            if (type === 'watermark') {
                this.imgURLWatermark = '';
                this.fileWatermark = null;
                this.isWatermarkLogoMissing = true;
            } else if (type === 'pdfLogo') {
                this.imgURLPdfLogo = '';
                this.filePdfLogo = null;
                this.isPdfLogoMissing = true;
            }
            else if (type === 'headerLine') {
                this.imgURLHeaderLine = '';
                this.fileHeaderLine = null;
                this.isHeaderLineMissing = true;
            }
        }

    }


    removeUploadedPdfFile(type: string) {
        if (type === 'watermark') {
            this.fileWatermark = null;
            this.imgURLWatermark = null;
            this.isWatermarkLogoMissing = true;
        } else if (type === 'pdfLogo') {
            this.filePdfLogo = null;
            this.imgURLPdfLogo = null;
            this.isPdfLogoMissing = true;
        } else if (type === 'headerLine') {
            this.fileHeaderLine = null;
            this.imgURLHeaderLine = null;
            this.isHeaderLineMissing = true;
        }
    }



    getpdfInfoList() {
        this.adminLayoutService.getGeneralSettingPdfInfoList().subscribe(
            (response: any) => {
                if (response.meta.code === 200 && response.data) {
                    this.commonInfoList = response.data;

                    // Patch regular form fields
                    this.pdfInfoForm.patchValue({
                        gstNo: response.data.gstNo,
                        panNo: response.data.panNo,
                        website: response.data.website,
                        email: response.data.email,
                        properiterCompany: response.data.properiterCompany,
                        properiterName: response.data.properiterName
                    });

                    // Mobile numbers - ensure dynamic form array is updated
                    const mobileArray = this.pdfInfoForm.get('mobileNumbers') as FormArray;
                    mobileArray.clear(); // clear existing controls

                    if (Array.isArray(response.data.mobileNumbers)) {
                        response.data.mobileNumbers.forEach((num: string) => {
                            mobileArray.push(this.fb.control(num, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]));
                        });
                    }

                    // Image previews (from filenames)
                    const basePath = this.commonService.rootData.uploadedUrl;

                    if (response.data.fileWatermark) {
                        this.imgURLWatermark = basePath + response.data.fileWatermark;
                    }

                    if (response.data.filePdfLogo) {
                        this.imgURLPdfLogo = basePath + response.data.filePdfLogo;
                    }

                    if (response.data.fileHeaderLine) {
                        this.imgURLHeaderLine = basePath + response.data.fileHeaderLine;
                    }
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }



    SavePdfData(btnName: string): void {
        this.submitteduserData = true;


        // Validation logic
        this.isWatermarkLogoMissing = !this.fileWatermark && !this.imgURLWatermark;
        this.isPdfLogoMissing = !this.filePdfLogo && !this.imgURLPdfLogo;
        this.isHeaderLineMissing = !this.fileHeaderLine && !this.imgURLHeaderLine;


        if (this.isWatermarkLogoMissing || this.isPdfLogoMissing || this.isHeaderLineMissing) {
            return; // Prevent saving if required fields are missing
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
            formData.append(`mobileNumbers[${i}]`, ctrl.value);
        });
        if (this.fileWatermark) {
            formData.append('fileWatermark', this.fileWatermark);
        }
        if (this.filePdfLogo) {

            formData.append('filePdfLogo', this.filePdfLogo);
        }
        if (this.fileHeaderLine) {

            formData.append('fileHeaderLine', this.fileHeaderLine);
        }

        this.adminLayoutService.SaveGeneralSettingPdfInfo(formData).subscribe(
            (response: any) => {
                if (response.meta.code === 200) {
                    this.submitteduserData = false;
                    this.getpdfInfoList();
                }
            },
            (error: any) => {
                console.error(error);
            }
        );
    }
}