import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgSelectModule } from '@ng-select/ng-select';
import { EditorModule } from '@tinymce/tinymce-angular';
declare const $: any;
import moment from 'moment';
import { NgOtpInputComponent } from 'ng-otp-input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ConfirmDirective } from '../../../shared/directives/common.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, GroupByPipe, NiceTimePipe } from '../../../shared/pipe/common.pipe';
import { environment } from '../../../../environments/environment';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FrontLayoutService } from '../../../layout/front-layout/front-layout.service';
import { CommonService } from '../../../shared/common.service';

@Component({
  selector: 'app-my-profile',
  standalone:true,
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
    // FullCalendarModule,
    // NgbModule,
    // NgbDatepickerModule,
    // NgxMaskModule,
    NiceTimePipe,
    GroupByPipe,
    ArraySortPipeDesc,
    ArraySortPipeAsc,
    ArraySortPipeSimple,
    FilterPipe,
  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  resumeInfoForm!: FormGroup;

  colour:any;
  ISeditEmployee = false;
  employeeForm!: FormGroup;
  emergencyContactInforForm!: FormGroup;
  companyInfoForm!: FormGroup;
  educationDetailsForm!: FormGroup;
  experienceDetailsForm!: FormGroup;
  bankDetailsForm!: FormGroup;
  salaryDetailsForm!: FormGroup;
  monthlySalaryDetailsForm!: FormGroup;
  monthWiseLeaveForm!: FormGroup;
  documentUploadForm!: FormGroup;
  leaveBalanceForm!: FormGroup;
  submitteduserData = false;
  submittedEmergencyInfoData = false;
  submittedCompanyInfoData = false;
  submittedDocumentUploadInfoData = false;
  submittedEducationDetailsData = false;
  submittedExperienceDetailsData = false;
  submittedBankDetailsData = false;
  submittedSalaryDetailsData = false;
  submittedResumeInfoData = false;
  userId:any;
  file: any;
  imgURL: any;
  public imagePath:any;
  signatureImageFile: any;
  signatureImageURL: any;
  public signatureImagePath:any;
  message: string='';
  signatureMessage: string='';
  activeroleList: []=[];
  profileDetails: boolean = false;
  hide1 = false;
  roleList: any[] = [];
  designationList: any[] = [];
  technologyList: any[] = [];
  documentTypeMasterList: any[] = [];
  emergencyContactInformationList: any[] = [];
  educationDetailsList: any[] = [];
  documentUploadId: any;
  uplodedDocumentList: any[] = [];
  experienceDetailsList: any[] = [];
  employeeCompanyList: any;
  empBasicInfoList = new EmpBasicInfoListModel();
  resultofShowDocument: any;
  resultofExpShowDocument: any;

  empResumeDetailsList: any;
  competenciesList: any[] = [];
  technicalProfileList: any[] = [];
  languageList: any[] = [];
  softwareList: any[] = [];
  projectName: any[] = [];
  ProjectMasterlist: any[] = [];
  resumeList: any;
  get fuserData(): { [key: string]: AbstractControl } {
    return this.employeeForm.controls;
  }
  get fEmerContactInfoData(): { [key: string]: AbstractControl } {
    return this.emergencyContactInforForm.controls;
  }
  get fCompanyInfoData(): { [key: string]: AbstractControl } {
    return this.companyInfoForm.controls;
  }
  get fEducationData(): { [key: string]: AbstractControl } {
    return this.educationDetailsForm.controls;
  }
  get fExperienceData(): { [key: string]: AbstractControl } {
    return this.experienceDetailsForm.controls;
  }
  get fBankData(): { [key: string]: AbstractControl } {
    return this.bankDetailsForm.controls;
  }
  get fSalaryData(): { [key: string]: AbstractControl } {
    return this.salaryDetailsForm.controls;
  }
  get fMonthSalaryData(): { [key: string]: AbstractControl } {
    return this.monthlySalaryDetailsForm.controls;
  }
  get fMonthWiseLeaveData(): { [key: string]: AbstractControl } {
    return this.monthWiseLeaveForm.controls;
  }
  get fDocumentUploadData(): { [key: string]: AbstractControl } {
    return this.documentUploadForm.controls;
  }
  get fLeaveBalanceData(): { [key: string]: AbstractControl } {
    return this.leaveBalanceForm.controls;
  }
  get fResumeData(): { [key: string]: AbstractControl } {
    return this.resumeInfoForm.controls;
}
  isView:  boolean=false;
  isCreated:  boolean=false;
  isUpdated:  boolean=false;
  isDeleted: boolean=false;
  selectedDataType:any;
  resultofExpDocument: any;

@ViewChild('file') myInputVariable!: ElementRef;
@ViewChild('fileDoc') myInputVariableDoc!: ElementRef;
@ViewChild('file1') myInputVariableForSignatureImage!: ElementRef;
@ViewChild('Expfile') myInputExpVariable!: ElementRef;

  resultofDocument: any;
  keepOriginal: boolean = false;
  selectedDocumentTypeId:any;
  l: number=0;
  p: number = 1;
  itemsPage: any;
  mySelect:any;
  alwaysShowCalendars: boolean=false;
  leaveListForBalance: any;

  itemsPerPage(): void {
    this.l = this.mySelect;
    this.p = 1;
  }
  get competenciesArray() {
  return this.resumeInfoForm.get('competencies') as FormArray;
}
get languageArray() {
  return this.resumeInfoForm.get('language') as FormArray;
}
get softwareArray() {
  return this.resumeInfoForm.get('software') as FormArray;
}
get technicalProfileArray() {
  return this.resumeInfoForm.get('technicalProfile') as FormArray;
}


  constructor(private http: HttpClient, private fb: FormBuilder, private route: ActivatedRoute, private router: Router, public commonService: CommonService, public frontLayoutService: FrontLayoutService) {

    let pagePermission = { module: "employeelist" }
    this.frontLayoutService.getpagePermission(pagePermission).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.isView = Response.data.isView;
        this.isCreated = Response.data.isCreated;
        this.isUpdated = Response.data.isUpdated;
        this.isDeleted = Response.data.isDeleted;
        if (this.isCreated === false) {
          this.router.navigate(['admin/employee-list']);
        }
      }
    }, (error:any) => {
      //console.log(error.error.Message);
    });

    const currentUrl = this.router.url
    if (currentUrl.includes('profile')) {
      this.route.params.subscribe((params: Params) => {
        this.userId = params['id'];
      });
      this.profileDetails = true;
    }
    if (currentUrl.includes('add-new-employee')) {
      this.userId = "0";
      this.ISeditEmployee = false;
    } else {
      this.route.params.subscribe((params: Params) => {
        this.userId = params['id'];
      });
      this.ISeditEmployee = true;
      this.editEmployeeDetails();
    }
  }

  dataTypeList: any[] = [];

  ngOnInit() {
    this.mySelect = 5;
    this.getYear();
    this.l = 10;
    this.getrolelist();
    this.getdesignationlist();
    this.getTechnologylist();
    this.getDocumentTypeMasterlist();
    this.getProjectMasterlist();
    this.getEmpResumeInformationDetailsByEmpId();
    this.defaultForm();
    this.defualtEmergencyContactInfoForm();
    this.defaultExperienceDetailsForm();
    this.defaultEducationDetailsForm();
    this.defaultResumeInfoForm();

    this.leaveListForBalance = this.leaveBalanceForm.get('leaveList') as FormArray
    this.file = "";
  }

  isNullOrUndefined<T>(tObj: T): boolean {
    return tObj === null || tObj === undefined;
  }

  editEmployeeDetails() {

    let userId = { 'employeeId': this.userId }
    
    this.frontLayoutService.getuserMasterId(userId).subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        this.employeeCompanyList = Response.data;
        this.getBasicInformationDetailsByEmpId();
        this.getCompanyInformationDetailsByEmpId();
        this.getBankDetailsByEmployeeID();
        this.getEmergencyContactInformationListByEmployeeID();
        this.getEducationDetailsByEmployeeID();
        this.getExperienceDetailsByEmployeeID();
        this.getDocumentListAfterUpload();
        this.getSalaryDetailsByEmployeeID();

      }
    });
  }

  openBasicInfoModel() {
    this.getBasicInformationById();
    $("#add-user-basic-details-modal").modal({ backdrop: 'static', keyboard: false });
    $("#add-user-basic-details-modal").modal('show');

  }
  closeBasicInfoModel() {
    $("#add-user-basic-details-modal").modal("hide");
  }

  cancelUser() {
    if (this.ISeditEmployee === true && this.profileDetails === false) {
      this.defaultForm();
      this.ISeditEmployee = false;
      this.router.navigate(['/admin/employee-list']);
    }
    else if (this.ISeditEmployee === false && this.profileDetails === false) {
      this.defaultForm();
      this.ISeditEmployee = false;
      this.router.navigate(['/admin/employee-list']);
    }
    else {
      this.profileDetails = false;
      this.router.navigate(['/admin/dashboard']);
    }
  }
  yearArray = new Array<number>();
  monthArray = [
    { value: '01', month: 'January' },
    { value: '02', month: 'February' },
    { value: '03', month: 'March' },
    { value: '04', month: 'April' },
    { value: '05', month: 'May' },
    { value: '06', month: 'June' },
    { value: '07', month: 'July' },
    { value: '08', month: 'August' },
    { value: '09', month: 'September' },
    { value: '10', month: 'October' },
    { value: '11', month: 'November' },
    { value: '12', month: 'December' },
  ];

  getYear() {
    this.yearArray = new Array<number>();
    let d = new Date();

    for (let index = 0; index < 50; index++) {
      let prYear = d.getFullYear();
      let arr = prYear - index;
      this.yearArray.push(arr)
    }
    return this.yearArray;
  }

  getrolelist() {

    this.frontLayoutService.getRoleList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.roleList = Response.data;
      }
    });
  }
  getdesignationlist() {

    this.frontLayoutService.getDesignationList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.designationList = Response.data;
      }
    });
  }
  getTechnologylist() {

    this.frontLayoutService.getTechnologyList().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.technologyList = Response.data;
      }
    });
  }
  getDocumentTypeMasterlist() {

    this.frontLayoutService.getDocumentTypeMasterslist().subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.documentTypeMasterList = Response.data;
      }
    });
  }
  getProjectMasterlist() {

    this.frontLayoutService.getProjectMasterslist().subscribe((Response: any) => {
        if (Response.meta.code == 200) {
            this.ProjectMasterlist = Response.data;
        }
    });
}


  // only add number in input filed
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  letterOnly(event:any): Boolean {

    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }
  numberAndletterOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }
  letterSpaceOnly(event:any): Boolean {
    debugger
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) && (charCode != 32)) {
      return false;
    }
    return true;
  }


  // start
  // basic information save
  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }
  bloodGroupArray = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  defaultForm() {
    this.employeeForm = this.fb.group({
      _id: [''],
      EmpId: [''],
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      p_Mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      p_Email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/)]],
      gender: ['', [Validators.required]],
      permenentAddress: [''],
      currentAddress: [''],
      bloodGroup: [],
      linkedInId: [''],
    });
  }
  UpdateUser() {

    if (this.employeeForm.invalid) {
      this.submitteduserData = true;
      return;
    }
    let usermasterModelObj: FormData = new FormData();
    usermasterModelObj.append('_id', this.employeeForm.value._id);
    usermasterModelObj.append('EmpId', this.employeeForm.value.EmpId);
    usermasterModelObj.append('firstName', this.employeeForm.value.firstName);
    usermasterModelObj.append('middleName', this.employeeForm.value.middleName);
    usermasterModelObj.append('lastName', this.employeeForm.value.lastName);
    usermasterModelObj.append('dob', moment(this.employeeForm.value.dob).format('DD-MM-yyyy'));
    usermasterModelObj.append('p_Mobile', this.employeeForm.value.p_Mobile);
    usermasterModelObj.append('p_Email', this.employeeForm.value.p_Email);
    usermasterModelObj.append('gender', this.employeeForm.value.gender);
    usermasterModelObj.append('permenentAddress', this.employeeForm.value.permenentAddress);
    usermasterModelObj.append('currentAddress', this.employeeForm.value.currentAddress);
    usermasterModelObj.append('bloodGroup', this.employeeForm.value.bloodGroup);
    usermasterModelObj.append('linkedInId', this.employeeForm.value.linkedInId);
    usermasterModelObj.append('profile_image', this.file);
    usermasterModelObj.append('signature', this.signatureImageFile);

    this.frontLayoutService.UpdateUserBasicInfoMaster(usermasterModelObj).subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.submitteduserData = false;
        this.getBasicInformationDetailsByEmpId();
        $("#add-user-basic-details-modal").modal("hide");
        // this.commonService.notifier.notify('success', "User Basic Information Updated Successfully.");
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    }, (error:any) => {
      //console.log(error);
    });
  }
  preview(files:any) {
    this.file = files[0];
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType == "image/jpeg" || mimeType == "image/png") {
      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
      this.message = "";
    } else {
      this.message = "Only JPEG and PNG image is supported.";
      this.imgURL = "";
      this.file = "";
      this.myInputVariable.nativeElement.value = "";
      return;
    }
  }
  removeuploadFile() {

    this.imgURL = "";
    this.file = "";
    this.myInputVariable.nativeElement.value = "";
  }
  previewSignatureImage(files:any) {
    this.signatureImageFile = files[0];
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType == "image/jpeg" || mimeType == "image/png") {
      var reader = new FileReader();
      this.signatureImagePath = files;
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.signatureImageURL = reader.result;
      }
      this.signatureMessage = "";
    } else {
      this.signatureMessage = "Only JPEG and PNG image is supported.";
      this.signatureImageURL = "";
      this.signatureImageFile = "";
      this.myInputVariableForSignatureImage.nativeElement.value = "";
      return;
    }
  }
  todayDate = new Date();
  maxDate = this.todayDate
  minDobDate: NgbDateStruct = { year: 1700, month: 1, day: 1 };
  removeSignatureImageFile() {

    this.signatureImageURL = "";
    this.signatureImageFile = "";
    this.myInputVariableForSignatureImage.nativeElement.value = "";
  }
  getBasicInformationById() {
    let EducationDetailsObj = {
      _id: this.userId
    }
    this.frontLayoutService.getBasicDetailsByID(EducationDetailsObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        this.employeeForm.controls['_id'].setValue(Response.data._id);
        this.employeeForm.controls['EmpId'].setValue(Response.data.EmpId);
        this.employeeForm.controls['firstName'].setValue(Response.data.firstName);
        this.employeeForm.controls['middleName'].setValue(Response.data.middleName);
        this.employeeForm.controls['lastName'].setValue(Response.data.lastName);
        this.employeeForm.controls['p_Mobile'].setValue(Response.data.p_Mobile);
        this.employeeForm.controls['gender'].setValue(Response.data.gender.toString());

        if (Response.data.dob.includes('-')) {
          this.employeeForm.controls['dob'].setValue(new Date(Response.data.dob.split('-')[2] + '-' + Response.data.dob.split('-')[1] + '-' + Response.data.dob.split('-')[0]));
        }
        else {
          this.employeeForm.controls['dob'].setValue(new Date(Response.data.dob.split('/')[2] + '-' + Response.data.dob.split('/')[1] + '-' + Response.data.dob.split('/')[0]));
        }


        this.employeeForm.controls['permenentAddress'].setValue(Response.data.permenentAddress);
        this.employeeForm.controls['currentAddress'].setValue(Response.data.currentAddress);
        this.employeeForm.controls['bloodGroup'].setValue(Response.data.bloodGroup);
        this.employeeForm.controls['linkedInId'].setValue(Response.data.linkedInId);
        this.employeeForm.controls['p_Email'].setValue(Response.data.p_Email);
        this.imgURL = environment.uploadedUrl + Response.data.profile_image;
        this.signatureImageURL = environment.uploadedUrl + Response.data.signature;
        this.file = Response.data.profile_image;
        this.signatureImageFile = Response.data.signature;
        // $("#add-education-details-modal").modal({ backdrop: 'static', keyboard: false, show: true });;
      }
    });
  }
  getBasicInformationDetailsByEmpId() {
    let empId = {
      _id: this.userId
    }
    this.frontLayoutService.getBasicDetailsByEmployeeID(empId).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.empBasicInfoList._id = Response.data._id;
        this.empBasicInfoList.firstName = Response.data.firstName + ' ' + Response.data.middleName + ' ' + Response.data.lastName;
        // this.empBasicInfoList.middleName = Response.data.middleName;
        // this.empBasicInfoList.lastName = Response.data.lastName;
        this.empBasicInfoList.p_Mobile = Response.data.p_Mobile;
        this.empBasicInfoList.gender = Response.data.gender;
        this.empBasicInfoList.dob = Response.data.dob;
        this.empBasicInfoList.permenentAddress = Response.data.permenentAddress;
        this.empBasicInfoList.currentAddress = Response.data.currentAddress;
        this.empBasicInfoList.bloodGroup = Response.data.bloodGroup;
        this.empBasicInfoList.linkedInId = Response.data.linkedInId;
        this.empBasicInfoList.p_Email = Response.data.p_Email;
        this.empBasicInfoList.profile_image = environment.uploadedUrl + Response.data.profile_image;
        this.empBasicInfoList.signature = environment.uploadedUrl + Response.data.signature;
      }
    });
  }
  // end


  // Emergency Contact Information Form Array Add and remove function
  IsEmergencyContact: boolean = false
  defualtEmergencyContactInfoForm() {
    this.emergencyContactInforForm = this.fb.group({
      _id: [''],
      contactPersonName: ['', [Validators.required]],
      contactPersonPhone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contactPersonEmailId: [''],
      relationship: ['', [Validators.required]],
    })
  }
  addEmergencyContactInformation() {
    this.IsEmergencyContact = false;
    this.submittedEmergencyInfoData = false;
    this.defualtEmergencyContactInfoForm();
    $("#add-emergency-contact-information-modal").modal({ backdrop: 'static', keyboard: false });;
    $("#add-emergency-contact-information-modal").modal('show');
  }
  cancelEmergencyContactInformation() {
    this.defualtEmergencyContactInfoForm();
    this.submittedEmergencyInfoData = false;
    $("#add-emergency-contact-information-modal").modal("hide");
  }
  saveEmergencyContactInfo() {
    this.submittedEmergencyInfoData = true;
    if (this.emergencyContactInforForm.invalid) {
      return;
    }

    let emergencyContactInfoObj = {
      contactPersonName: this.emergencyContactInforForm.value.contactPersonName,
      contactPersonPhone: this.emergencyContactInforForm.value.contactPersonPhone,
      contactPersonEmailId: this.emergencyContactInforForm.value.contactPersonEmailId,
      relationship: this.emergencyContactInforForm.value.relationship,
      employeeId: this.userId
    }

    this.frontLayoutService.SaveEmergencyContactInfo(emergencyContactInfoObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.IsEmergencyContact = false;
        this.submittedEmergencyInfoData = false;
        this.defualtEmergencyContactInfoForm();
        $("#add-emergency-contact-information-modal").modal("hide");
        this.getEmergencyContactInformationListByEmployeeID();
        // this.commonService.notifier.notify('success', "Emergency Contact Information Saved Successfully.");
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    })
  }
  getEmergencyContactInfoById(id:any) {
    let EmergencyContactInfodObj = {
      _id: id
    }
    this.frontLayoutService.getEmergencyContactInfoById(EmergencyContactInfodObj).subscribe((Res: any) => {
      if (Res.meta.code == 200) {

        this.emergencyContactInforForm.controls['_id'].setValue(Res.data._id);
        this.emergencyContactInforForm.controls['contactPersonName'].setValue(Res.data.contactPersonName);
        this.emergencyContactInforForm.controls['contactPersonPhone'].setValue(Res.data.contactPersonPhone);
        this.emergencyContactInforForm.controls['contactPersonEmailId'].setValue(Res.data.contactPersonEmailId);
        this.emergencyContactInforForm.controls['relationship'].setValue(Res.data.relationship);
        this.IsEmergencyContact = true;
        $("#add-emergency-contact-information-modal").modal({ backdrop: 'static', keyboard: false});
        $("#add-emergency-contact-information-modal").modal('show');
      }
    });
  }
  updateEmergencyContactInfo() {
    this.submittedEmergencyInfoData = true;
    if (this.emergencyContactInforForm.invalid) {
      return;
    }

    let emergencyContactInfoObj = {
      _id: this.emergencyContactInforForm.value._id,
      contactPersonName: this.emergencyContactInforForm.value.contactPersonName,
      contactPersonPhone: this.emergencyContactInforForm.value.contactPersonPhone,
      contactPersonEmailId: this.emergencyContactInforForm.value.contactPersonEmailId,
      relationship: this.emergencyContactInforForm.value.relationship,
    }

    this.frontLayoutService.UpdateEmergencyContactInfo(emergencyContactInfoObj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.IsEmergencyContact = false;
        this.submittedEmergencyInfoData = false;
        this.defualtEmergencyContactInfoForm();
        $("#add-emergency-contact-information-modal").modal("hide");
        this.getEmergencyContactInformationListByEmployeeID();
        // this.commonService.notifier.notify('success', "Emergency Contact Information Updated Successfully.");
      }
      else {
        // this.commonService.notifier.notify('error', Response.meta.message);
      }
    })
  }
  getEmergencyContactInformationListByEmployeeID() {
    let Obj = {
      employeeId: this.userId
    }
    this.frontLayoutService.getEmergencyContactInfoByEmployeeID(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.emergencyContactInformationList = Response.data.filter((x: any) => x.isDeleted == false)
      }
    });

  }
  deleteEmergencyContactInformationById(id: any) {
    let Obj = {
      _id: id
    }
    this.frontLayoutService.deleteContactInfoById(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.getEmergencyContactInformationListByEmployeeID();
        // this.commonService.notifier.notify('success', "Emergency Contact Information Deleted Successfully.");
      }
      else {
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
    });
  }

  // start (Complete)
  // document upload form

  getDocumentListAfterUpload() {
    let employeeIdObj = {
      employeeId: this.userId
    }
    this.frontLayoutService.getDocumentUploadList(employeeIdObj).subscribe((Res: any) => {
      if (Res.meta.code == 200) {
        this.uplodedDocumentList = Res.data
      }
    })
  }
  //END


  // START (COMPLETE)
  // Company Information Form
  userMasterList: any[] = [];

  getCompanyInformationDetailsByEmpId() {
    let empId = {
      employeeId: this.userId
    }
    this.frontLayoutService.getCompanyDetailsByEmployeeID(empId).subscribe((Response: any) => {
      if (Response.meta.code == 200) {

        this.employeeCompanyList = Response.data;
      }
      else {
        this.employeeCompanyList = '';
      }
    });
  }



  //END


  // education details form
  IsEducationDetails: boolean = false;
  toyearArray = new Array<number>();
  from(e:any) {

    if (!e) {
      this.educationDetailsForm.controls['toYear'].setValue(null);
    }
    this.toyearArray = new Array<number>();
    let d = new Date();

    for (let index = 0; index < 50; index++) {
      let prYear = d.getFullYear();
      let arr = prYear - index;
      if (arr > e) {
        this.toyearArray.push(arr)
      }

    }
    this.educationDetailsForm.controls['toYear'].setValue(null);
    return this.toyearArray;
  }
  defaultEducationDetailsForm() {
    this.educationDetailsForm = this.fb.group({
      _id: [],
      qualification: ['', [Validators.required]],
      universityName: ['', [Validators.required]],
      fromYear: [, [Validators.required]],
      toYear: [, [Validators.required]],
      fromMonth: [, [Validators.required]],
      toMonth: [, [Validators.required]],
      grade: ['', [Validators.required]],
    })
  }
  addEducationDetails() {
    this.IsEducationDetails = false;
    this.submittedEducationDetailsData = false;
    this.defaultEducationDetailsForm();
    $("#add-education-details-modal").modal({ backdrop: 'static', keyboard: false});
    $("#add-education-details-modal").modal('show');
  }
  cancelEducationDetails() {
    this.defaultEducationDetailsForm();
    this.submittedEducationDetailsData = false;
    $("#add-education-details-modal").modal("hide");
  }
  saveEducationDetails() {
    this.submittedEducationDetailsData = true;
    if (this.educationDetailsForm.invalid) {
      return;
    }
    let educationDetailsObj = {
      qualification: this.educationDetailsForm.value.qualification,
      universityName: this.educationDetailsForm.value.universityName,
      fromYear: this.educationDetailsForm.value.fromYear.toString(),
      toYear: this.educationDetailsForm.value.toYear.toString(),
      fromMonth: this.educationDetailsForm.value.fromMonth,
      toMonth: this.educationDetailsForm.value.toMonth,
      grade: this.educationDetailsForm.value.grade,
      employeeId: this.userId,
    }
    this.frontLayoutService.SaveEducationDetailsData(educationDetailsObj).subscribe((Res: any) => {
      if (Res.meta.code == 200) {
        this.IsEducationDetails = false;
        this.submittedEducationDetailsData = false;
        this.defaultEducationDetailsForm();
        $("#add-education-details-modal").modal("hide");
        this.getEducationDetailsByEmployeeID();
        // this.commonService.notifier.notify('success', "Education Details Saved Successfully.");
      }
      else {
        // this.commonService.notifier.notify('error', Res.meta.message);
      }
    });
  }
  updateEducationDetails() {
    this.submittedEducationDetailsData = true;
    if (this.educationDetailsForm.invalid) {
      return;
    }
    let educationDetailsObj = {
      qualification: this.educationDetailsForm.value.qualification,
      universityName: this.educationDetailsForm.value.universityName,
      fromYear: this.educationDetailsForm.value.fromYear.toString(),
      toYear: this.educationDetailsForm.value.toYear.toString(),
      fromMonth: this.educationDetailsForm.value.fromMonth,
      toMonth: this.educationDetailsForm.value.toMonth,
      grade: this.educationDetailsForm.value.grade,
      _id: this.educationDetailsForm.value._id,
    }
    this.frontLayoutService.UpdateEducationDetailsData(educationDetailsObj).subscribe((Res: any) => {
      if (Res.meta.code == 200) {
        this.IsEducationDetails = false;
        this.submittedEducationDetailsData = false;
        this.defaultEducationDetailsForm();
        $("#add-education-details-modal").modal("hide");
        this.getEducationDetailsByEmployeeID();
        // this.commonService.notifier.notify('success', "Education Details Updated Successfully.");
      }
      else {
        // this.commonService.notifier.notify('error', Res.meta.message);
      }
    });
  }
  getEducationDetailsById(id: any) {
    let EducationDetailsObj = {
      _id: id
    }
    this.frontLayoutService.getEducationDetailsById(EducationDetailsObj).subscribe((Res: any) => {
      if (Res.meta.code == 200) {

        this.educationDetailsForm.controls['_id'].setValue(Res.data._id);
        this.educationDetailsForm.controls['qualification'].setValue(Res.data.qualification);
        this.educationDetailsForm.controls['universityName'].setValue(Res.data.universityName);
        this.educationDetailsForm.controls['fromYear'].setValue(Res.data.fromYear);
        this.educationDetailsForm.controls['toYear'].setValue(Res.data.toYear);
        this.educationDetailsForm.controls['fromMonth'].setValue(Res.data.fromMonth);
        this.educationDetailsForm.controls['toMonth'].setValue(Res.data.toMonth);
        this.educationDetailsForm.controls['grade'].setValue(Res.data.grade);
        this.IsEducationDetails = true;
        $("#add-education-details-modal").modal({ backdrop: 'static', keyboard: false});
        $("#add-education-details-modal").modal('show');

      }
    });
  }
  getEducationDetailsByEmployeeID() {
    let Obj = {
      employeeId: this.userId
    }
    this.frontLayoutService.getEducationDetailsByEmployeeID(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.educationDetailsList = Response.data.filter((x: any) => x.isDeleted == false)
      }
    });

  }
  deleteEducationDetailsById(id: any) {
    let Obj = {
      _id: id
    }
    this.frontLayoutService.deleteEducationDetailsById(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.getEducationDetailsByEmployeeID();
        // this.commonService.notifier.notify('success', "Education Details Deleted Successfully.");
      }
      else {
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
    });
  }

  // Experience details form
  IsExperienceDetails: boolean = false;
  IsDocumentError: boolean = false;
  IsFromToDateError: boolean = false;
  // IsFromDateError: boolean = false;
  // IsToDateError: boolean = false;
  defaultExperienceDetailsForm() {
    this.experienceDetailsForm = this.fb.group({
      _id: [],
      companyName: ['', [Validators.required]],
      totalExperience: [''],
      // Date: ['', [Validators.required]],
      fromDate: ['', [Validators.required]],
      toDate: ['', [Validators.required]],
      designation: [, [Validators.required]],
    })
  }
minToDate: Date | null = null;
  showInvalidToDate: boolean = false;
  onFromDateChange() {
    if (this.experienceDetailsForm.controls['fromDate'].value) {
      this.minToDate = new Date(this.experienceDetailsForm.controls['fromDate'].value)
      this.experienceDetailsForm.controls['toDate'].setValue('');
    }
  }

  // toMinDate: any;
  addExperienceDetails() {
    this.IsExperienceDetails = false;
    this.submittedExperienceDetailsData = false;
    this.defaultExperienceDetailsForm();
    this.resultofExpDocument = "";
    this.resultofExpShowDocument = "";

    this.myInputExpVariable.nativeElement.value = "";
    $("#add-experience-details-modal").modal({ backdrop: 'static', keyboard: false });;
    $("#add-experience-details-modal").modal('show');

  }
  cancelExperienceDetails() {
    this.defaultExperienceDetailsForm();
    this.submittedExperienceDetailsData = false;
    this.myInputExpVariable.nativeElement.value = "";
    this.resultofExpDocument = "";
    this.resultofExpShowDocument = "";
    this.IsDocumentError = false;
    $("#add-experience-details-modal").modal("hide");
  }
  dateAgo(s_date:any, e_date:any) {
    var startDate: any = new Date(s_date);
    var endDate: any = new Date(e_date);
    var diffDate: any = new Date(endDate - startDate);
    return ((diffDate.toISOString().slice(0, 4) - 1970) + " Years " +
      diffDate.getMonth() + " Months " + (diffDate.getDate() - 1) + " Days");
  }
  saveExperienceDetails() {

    this.submittedExperienceDetailsData = true;
    if (this.resultofExpDocument == '' || !this.resultofExpDocument) {
      this.IsDocumentError = true;
    }

    if (this.experienceDetailsForm.invalid || this.IsDocumentError === true) {
      return;
    }


    var diff = Math.floor(new Date(this.experienceDetailsForm.value.toDate).getTime() - new Date(this.experienceDetailsForm.value.fromDate).getTime());
    var day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);
    let totalExperience = months + " Months " + years + " Years";

    let experienceDetailsObj: FormData = new FormData();
    experienceDetailsObj.append('companyName', this.experienceDetailsForm.value.companyName);
    experienceDetailsObj.append('totalExperience', totalExperience);
    experienceDetailsObj.append('fromDate', moment(this.experienceDetailsForm.value.fromDate).format('DD-MM-yyyy'));
    experienceDetailsObj.append('toDate', moment(this.experienceDetailsForm.value.toDate).format('DD-MM-yyyy'));
    experienceDetailsObj.append('designation', this.experienceDetailsForm.value.designation);
    experienceDetailsObj.append('experienceFile', this.resultofExpDocument);
    experienceDetailsObj.append('employeeId', this.userId);
    // return
    this.frontLayoutService.SaveExperienceDetailsData(experienceDetailsObj).subscribe((Res: any) => {
      if (Res.meta.code == 200) {
        this.IsExperienceDetails = false;
        this.submittedExperienceDetailsData = false;
        this.defaultExperienceDetailsForm();
        $("#add-experience-details-modal").modal("hide");
        this.resultofExpDocument = "";
        this.resultofExpShowDocument = "";
        this.IsFromToDateError = false;
        // this.IsFromDateError = false;
        // this.IsToDateError = false;
        this.IsDocumentError = false;
        this.getExperienceDetailsByEmployeeID();
        // this.commonService.notifier.notify('success', "Experience Details Saved Successfully.");
      }
      else {
        // this.commonService.notifier.notify('error', Res.meta.message);
      }
    });
  }
  updateExperienceDetails() {
    debugger
    this.submittedExperienceDetailsData = true;
    if (this.resultofExpDocument == '' || !this.resultofExpDocument) {
      this.IsDocumentError = true;
    }

    if (this.experienceDetailsForm.invalid || this.IsDocumentError === true) {
      return;
    }


    var diff = Math.floor(new Date(this.experienceDetailsForm.value.toDate).getTime() - new Date(this.experienceDetailsForm.value.fromDate).getTime());
    var day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);
    let totalExperience = months + " Months " + years + " Years";


    let experienceDetailsObj: FormData = new FormData();
    experienceDetailsObj.append('companyName', this.experienceDetailsForm.value.companyName);
    experienceDetailsObj.append('totalExperience', totalExperience);
    experienceDetailsObj.append('fromDate', moment(this.experienceDetailsForm.value.fromDate).format('DD-MM-yyyy'));
    experienceDetailsObj.append('toDate', moment(this.experienceDetailsForm.value.toDate).format('DD-MM-yyyy'));
    experienceDetailsObj.append('designation', this.experienceDetailsForm.value.designation);
    experienceDetailsObj.append('experienceFile', this.resultofExpDocument);
    experienceDetailsObj.append('_id', this.experienceDetailsForm.value._id);
    // return
    this.frontLayoutService.UpdateExperienceDetailsData(experienceDetailsObj).subscribe((Res: any) => {
      if (Res.meta.code == 200) {
        this.IsExperienceDetails = false;
        this.submittedExperienceDetailsData = false;
        this.defaultExperienceDetailsForm();
        $("#add-experience-details-modal").modal("hide");
        this.resultofExpDocument = "";
        this.resultofExpShowDocument = "";
        this.IsFromToDateError = false;
        // this.IsFromDateError = false;
        // this.IsToDateError = false;
        this.IsDocumentError = false;
        this.getExperienceDetailsByEmployeeID();
        // this.commonService.notifier.notify('success', "Experience Details Updated Successfully.");
      }
      else {
        // this.commonService.notifier.notify('error', Res.meta.message);
      }
    });
  }
  getExperienceDetailsById(id: any) {
    let EducationDetailsObj = {
      _id: id
    }
    this.frontLayoutService.getExperienceDetailsById(EducationDetailsObj).subscribe((Res: any) => {
      if (Res.meta.code == 200) {

        this.experienceDetailsForm.controls['_id'].setValue(Res.data._id);
        this.experienceDetailsForm.controls['companyName'].setValue(Res.data.companyName);
        this.experienceDetailsForm.controls['fromDate'].setValue(new Date(Res.data.fromDate.split('-')[2] + '-' + Res.data.fromDate.split('-')[1] + '-' + Res.data.fromDate.split('-')[0]));
        this.experienceDetailsForm.controls['toDate'].setValue(new Date(Res.data.toDate.split('-')[2] + '-' + Res.data.toDate.split('-')[1] + '-' + Res.data.toDate.split('-')[0]));
        this.experienceDetailsForm.controls['totalExperience'].setValue(Res.data.totalExperience);
        this.experienceDetailsForm.controls['designation'].setValue(Res.data.designation);
        this.resultofExpShowDocument = {
          name: Res.data.experienceFile
        };
        this.resultofExpDocument = Res.data.experienceFile;
        this.IsExperienceDetails = true;
        $("#add-experience-details-modal").modal({ backdrop: 'static', keyboard: false});
        $("#add-experience-details-modal").modal('show');
      }
    });
  }
  getExperienceDetailsByEmployeeID() {
    this.experienceDetailsList = [];
    let Obj = {
      employeeId: this.userId
    }
    this.frontLayoutService.getExperienceDetailsByEmployeeID(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        Response.data.forEach((x: any) => {
          let Obj = {
            _id: x._id,
            companyName: x.companyName,
            designation: x.designation,
            designationName: x.designationName,
            employeeId: x.employeeId,
            experienceFile: x.experienceFile,
            isDeleted: x.isDeleted,
            status: x.status,
            totalExperience: x.totalExperience,
            fromDate: new Date(x.fromDate.split('-')[2] + '-' + x.fromDate.split('-')[1] + '-' + x.fromDate.split('-')[0]),
            toDate: new Date(x.toDate.split('-')[2] + '-' + x.toDate.split('-')[1] + '-' + x.toDate.split('-')[0]),
          }
          let arr = []
          arr.push(Obj);
          this.experienceDetailsList = arr.filter((x: any) => x.isDeleted == false);
        });
        // this.experienceDetailsList = Response.data
      }
    });

  }
  onExpDocumentChange(event: any) {

    this.resultofExpDocument = event.target.files[0];
    this.resultofExpShowDocument = event.target.files[0];
    if (this.resultofExpDocument.name) {
      this.IsDocumentError = false;
    }
    this.myInputExpVariable.nativeElement.value = "";
  }
  removeExpDocument() {
    this.resultofExpDocument = "";
    this.resultofExpShowDocument = "";
    this.IsDocumentError = true;
    this.myInputExpVariable.nativeElement.value = "";
  }
  deleteExperienceDetailsById(id:any) {
    let Obj = {
      _id: id
    }
    this.frontLayoutService.deleteExperienceDetailsById(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.getExperienceDetailsByEmployeeID();
        // this.commonService.notifier.notify('success', "Experience Details Deleted Successfully.");
      }
      else {
        // this.commonService.notifier.notify('success', Response.meta.message);
      }
    });
  }

    // Resume Information Form
    resumeDetailsList: any;

    addResumeDetails() {
        // this.defaultResumeInfoForm();
        this.submittedResumeInfoData = false;

        $("#add-resume-information-modal").modal({ backdrop: 'static', keyboard: false });
        $("#add-resume-information-modal").modal('show');
    }
    cancelResumeDetails() {
        // this.defaultResumeInfoForm();
        this.submittedResumeInfoData = false;
        this.getEmpResumeInformationDetailsByEmpId()
        $("#add-resume-information-modal").modal("hide");
    }
    defaultResumeInfoForm() {
        this.resumeInfoForm = this.fb.group({
            _id: [''],
            projectId: [''],
            professionalSummary: ['', [Validators.required]],
            competencies: this.fb.array([]),
            technicalProfile: this.fb.array([]),
            software: this.fb.array([]),
            language: this.fb.array([])
        })
    }

    createCompetenciesData(oItem?: any) {
        let competenciesArray: any;
        competenciesArray = this.resumeInfoForm.get('competencies') as FormArray;
        let obj = this.fb.group({
            competenciesData: [(oItem ? oItem['competenciesData'] : '')]
        })
        competenciesArray.push(obj);
    }
    removeCompentencies(index: any) {
        (this.resumeInfoForm.controls['competencies'] as FormArray).removeAt(index);
    }
    createtechnicalProfile(oItem?: any) {
        let technicalProfileArray: any;
        technicalProfileArray = this.resumeInfoForm.get('technicalProfile') as FormArray;
        let obj = this.fb.group({
            technicalProfileData: [(oItem ? oItem['technicalProfileData'] : '')]
        })
        technicalProfileArray.push(obj);
    }
    removetechnicalProfile(index: any) {
        (this.resumeInfoForm.controls['technicalProfile'] as FormArray).removeAt(index);
    }
    createsoftware(oItem?: any) {
        let softwareArray: any;
        softwareArray = this.resumeInfoForm.get('software') as FormArray;
        let obj = this.fb.group({
            softwareData: [(oItem ? oItem['softwareData'] : '')]
        })
        softwareArray.push(obj);
    }
    removesoftware(index: any) {
        (this.resumeInfoForm.controls['software'] as FormArray).removeAt(index);
    }
    createlanguage(oItem?: any) {
        let languageArray: any;
        languageArray = this.resumeInfoForm.get('language') as FormArray;
        let obj = this.fb.group({
            languageData: [(oItem ? oItem['languageData'] : '')]
        })
        languageArray.push(obj);
    }
    removelanguage(index: any) {
        (this.resumeInfoForm.controls['language'] as FormArray).removeAt(index);
    }


    saveResumeInformationDetails() {
        debugger
        this.submittedResumeInfoData = true;
        if (this.resumeInfoForm.invalid) {
            return;
        }
        let resumeInformationDetailsObj = {
            professionalSummary: this.resumeInfoForm.value.professionalSummary,
            competencies: this.resumeInfoForm.value.competencies,
            technicalProfile: this.resumeInfoForm.value.technicalProfile,
            software: this.resumeInfoForm.value.software,
            language: this.resumeInfoForm.value.language,
            projectId: this.resumeInfoForm.value.projectId,
            employeeId: this.userId
        }
        this.frontLayoutService.SaveResumeInformationData(resumeInformationDetailsObj).subscribe((Res: any) => {
            if (Res.meta.code == 200) {
                this.submittedResumeInfoData = false;
                this.defaultResumeInfoForm();
                this.getEmpResumeInformationDetailsByEmpId();
                $("#add-resume-information-modal").modal("hide");
                // this.commonService.notifier.notify('success', "Resume Information Saved Successfully.");
            }
            else {
                // this.commonService.notifier.notify('error', Res.meta.message);
            }
        });
    }
    updateResumeInformationDetails() {
        debugger
        this.submittedResumeInfoData = true;
        if (this.resumeInfoForm.invalid) {
            return;
        }
        let resumeInformationDetailsObj = {
            professionalSummary: this.resumeInfoForm.value.professionalSummary,
            competencies: this.resumeInfoForm.value.competencies,
            technicalProfile: this.resumeInfoForm.value.technicalProfile,
            software: this.resumeInfoForm.value.software,
            language: this.resumeInfoForm.value.language,
            projectId: this.resumeInfoForm.value.projectId,
            employeeId: this.userId
        }
        this.frontLayoutService.UpdateResumeInformationData(resumeInformationDetailsObj).subscribe((Res: any) => {
            if (Res.meta.code == 200) {
                this.submittedResumeInfoData = false;
                this.defaultResumeInfoForm();
                this.getEmpResumeInformationDetailsByEmpId();
                $("#add-resume-information-modal").modal("hide");
                // this.commonService.notifier.notify('success', "Resume Information Updated Successfully.");
            }
            else {
                // this.commonService.notifier.notify('error', Res.meta.message);
            }
        });
    }
    getEmpResumeInformationDetailsByEmpId() {
        this.empResumeDetailsList = ''
        let empResumeId = {
            empId: this.userId
        }
        this.frontLayoutService.getResumeDetailsByEmpID(empResumeId).subscribe((Response: any) => {
            if (Response.meta.code == 200) {
                this.empResumeDetailsList = Response.data;
            }
        });
    }
    getResumeInformationDetailsById() {
        debugger
        this.resumeInfoForm.controls['professionalSummary'].setValue(this.empResumeDetailsList.professionalSummary);

        this.empResumeDetailsList.competencies.map((x: any) => {
            this.createCompetenciesData(x);
        })
        this.empResumeDetailsList.technicalProfile.map((x: any) => {
            this.createtechnicalProfile(x);
        })
        this.empResumeDetailsList.software.map((x: any) => {
            this.createsoftware(x);
        })
        this.empResumeDetailsList.language.map((x: any) => {
            this.createlanguage(x);
        })
        this.resumeInfoForm.controls['projectId'].setValue(this.empResumeDetailsList.projectId)
        $("#add-resume-information-modal").modal({ backdrop: 'static', keyboard: false, show: true });

    }



  // Bank Information Form
  bankDetailsList: any;

  getBankDetailsByEmployeeID() {
    let Obj = {
      employeeId: this.userId
    }

    this.frontLayoutService.getBankDetailsByEmployeeID(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.bankDetailsList = Response.data;

      }
    });

  }

  // Salary Information Form
  salaryDetailsList: any;

  getSalaryDetailsByEmployeeID() {
    this.salaryDetailsList = [];
    let Obj = {
      employeeId: this.userId
    }

    this.frontLayoutService.getSalaryDetailsByEmployeeID(Obj).subscribe((Response: any) => {
      if (Response.meta.code == 200) {
        this.salaryDetailsList = Response.data.filter((x: any) => x.isLatest == true);
      }
    });

  }

}
export class EmpBasicInfoListModel {
  _id: any;
  firstName: any;
  middleName: any;
  lastName: any;
  p_Mobile: any;
  gender: any;
  dob: any;
  permenentAddress: any;
  currentAddress: any;
  bloodGroup: any;
  linkedInId: any;
  p_Email: any;
  profile_image: any;
  signature: any;
}

export class EmployeeListModel {
  designationName: string='';
  technologyName: string='';
  roleName: string='';
  empNumber: any;
  joiningDate: any;
  EmailID: any;
  SkypeID: any
}