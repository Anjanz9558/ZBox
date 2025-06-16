import { Component, OnInit } from '@angular/core';
import { AdminLayoutService } from '../../../../layout/admin-layout/admin-layout.service';
import { CommonService } from '../../../../shared/common.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, ValidatorFn, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
// import * as Chartist from 'chartist';
import { NgxSpinnerService } from "ngx-spinner";
import { MatSortModule, Sort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmDirective } from '../../../../shared/directives/confirm.directive';
import { ArraySortPipeAsc, ArraySortPipeDesc, ArraySortPipeSimple, FilterPipe, NiceTimePipe } from '../../../../shared/pipe/common.pipe';
// import { GroupByPipe } from 'ngx-pipes';
// import { StorageService, StorageKey } from '../../../shared/storage.service';
declare const $: any;
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-role-wise-menu',
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
    FilterPipe,
    NgSelectModule,
    MatCheckboxModule

  ],
  templateUrl: './role-wise-menu.component.html',
  styleUrl: './role-wise-menu.component.scss'
})
export class RoleWiseMenuComponent implements OnInit {


  // new Code start
  // rolewisemenuForm: FormGroup;
  // submittedMenuData = false;
  // menuList: any;
  // activeroleList: any;
  // selectedRole;
  // isView: boolean;
  // isCreated: boolean;
  // isUpdated: boolean;
  // isDeleted: boolean;
  // constructor(public adminLayoutService: AdminLayoutService, private router: Router, private fb: FormBuilder, public commonService: CommonService, public storageService: StorageService) {
  //     let pagePermission = { module: "rolewisemenu" }
  //     this.adminLayoutService.getpagePermission(pagePermission).subscribe((Response: any) => {
  //         if (Response.meta.code == 200) {
  //             this.isView = Response.data.isView;
  //             this.isCreated = Response.data.isCreated;
  //             this.isUpdated = Response.data.isUpdated;
  //             this.isDeleted = Response.data.isDeleted;
  //             if (this.isView === false || this.isCreated === false || this.isUpdated === false) {
  //                 this.router.navigate(['admin/dashboard']);
  //             }
  //         }
  //         //for select sub industry step
  //     }, (error) => {
  //         console.log(error.error.Message);
  //     });
  // }
  // ngOnInit(): void {
  //     this.getRoleActiveList();
  //     this.selectedRole = null;
  //     this.defaultForm();
  //     this.menuList = this.rolewisemenuForm.get('menuList') as FormArray;
  // }
  // defaultForm() {
  //     this.rolewisemenuForm = this.fb.group({
  //         menuList: this.fb.array([]),
  //     });
  // }
  // addMenuItem(oItem?: any) {

  //     let IG = this.fb.group({
  //         menuId: [(oItem['_id'] ? oItem['_id'] : ''),],
  //         title: [(oItem['title'] ? oItem['title'] : ''),],
  //         isSelectedMainData: [(oItem['isSelectedMainData'] ? oItem['isSelectedMainData'] : false),],
  //         isCreated: [(oItem['isCreated'] ? oItem['isCreated'] : false),],
  //         isUpdated: [(oItem['isUpdated'] ? oItem['isUpdated'] : false),],
  //         isView: [(oItem['isView'] ? oItem['isView'] : false),],
  //         isDeleted: [(oItem['isDeleted'] ? oItem['isDeleted'] : false),],
  //         isShowChildrenList: [(oItem['isShowChildrenList'] ? oItem['isShowChildrenList'] : false),],
  //         childrenData: this.fb.array([]),
  //     });
  //     (this.rolewisemenuForm.get('menuList') as FormArray).push(IG);
  //     let menuIndex = (this.rolewisemenuForm.get('menuList') as FormArray).length - 1;
  //     oItem.childrenData.forEach(cItem => {
  //         this.addChildrenItem(menuIndex, cItem);
  //     });
  // }
  // addChildrenItem(oItem: number, cItem?: any) {
  //     let cd = this.fb.group({
  //         menuId: [(cItem['_id'] ? cItem['_id'] : ''),],
  //         title: [(cItem['title'] ? cItem['title'] : ''),],
  //         isMainMenuSelected: [(cItem['isMainMenuSelected'] ? cItem['isMainMenuSelected'] : false),],
  //         isCreated: [(cItem['isCreated'] ? cItem['isCreated'] : false),],
  //         isUpdated: [(cItem['isUpdated'] ? cItem['isUpdated'] : false),],
  //         isView: [(cItem['isView'] ? cItem['isView'] : false),],
  //         isDeleted: [(cItem['isDeleted'] ? cItem['isDeleted'] : false),],
  //     });
  //     (((this.rolewisemenuForm.controls['menuList'] as FormArray)
  //         .controls[oItem] as FormGroup).controls['childrenData'] as FormArray).push(cd);
  // }
  // onRoleChange() {

  //     this.menuList.clear();
  //     let roleId = { RoleId: this.selectedRole }
  //     this.adminLayoutService.getRolewisemenuList(roleId).subscribe((Response: any) => {

  //         if (Response.meta.code == 200) {
  //             Response.data.forEach((oItem, index) => {
  //                 this.addMenuItem(oItem);
  //                 if (oItem.isCreated == true && oItem.isUpdated == true && oItem.isView == true && oItem.isDeleted == true) {
  //                     (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[index] as FormGroup).get('isSelectedMainData').setValue(true));
  //                     oItem.childrenData.forEach((xItem, dindex) => {
  //                         if (xItem.isCreated == true && xItem.isUpdated == true && xItem.isView == true && xItem.isDeleted == true) {
  //                             ((((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[index] as FormGroup).controls['childrenData'] as FormArray).controls[dindex] as FormGroup).get('isMainMenuSelected').setValue(true);
  //                         }
  //                         else {
  //                             (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[index] as FormGroup).get('isSelectedMainData').setValue(false));
  //                             ((((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[index] as FormGroup).controls['childrenData'] as FormArray).controls[dindex] as FormGroup).get('isMainMenuSelected').setValue(false);
  //                         }
  //                     })
  //                 }
  //                 else {
  //                     (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[index] as FormGroup).get('isSelectedMainData').setValue(false));
  //                 }

  //             });

  //         } else {
  //         }
  //         //for select sub industry step
  //     }, (error) => {
  //         console.log(error.error.Message);
  //     });
  // }
  // getRoleActiveList() {
  //     this.adminLayoutService.getRoleActiveList().subscribe(
  //         (Response: any) => {
  //             if (Response.meta.code == 200) {
  //                 this.activeroleList = Response.data;
  //             } else {
  //             }
  //             //for select sub industry step
  //         },
  //         (error) => {
  //             console.log(error.error.Message);
  //         }
  //     );
  // }
  // isSelectedAllData(paramsObj: any) {

  //     let menuListDataFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[paramsObj.index] as FormGroup)

  //     if (paramsObj.checked === true) {
  //         (menuListDataFormGroup.get('isCreated').setValue(true));
  //         (menuListDataFormGroup.get('isView').setValue(true));
  //         (menuListDataFormGroup.get('isUpdated').setValue(true));
  //         (menuListDataFormGroup.get('isDeleted').setValue(true));
  //         (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map(value => value.get('isMainMenuSelected').setValue(true));
  //         this.isCreatedAllchildrenData({ checked: true, index: paramsObj.index });
  //         this.isViewAllchildrenData({ checked: true, index: paramsObj.index });
  //         this.isUpdatedchildrenData({ checked: true, index: paramsObj.index });
  //         this.isDeletedchildrenData({ checked: true, index: paramsObj.index });
  //         (menuListDataFormGroup.get('isSelectedMainData').setValue(true));
  //     }
  //     else {
  //         (menuListDataFormGroup.get('isCreated').setValue(false));
  //         (menuListDataFormGroup.get('isView').setValue(false));
  //         (menuListDataFormGroup.get('isUpdated').setValue(false));
  //         (menuListDataFormGroup.get('isDeleted').setValue(false));
  //         (menuListDataFormGroup.get('isSelectedMainData').setValue(false));
  //         (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map(value => value.get('isMainMenuSelected').setValue(false));
  //         this.isCreatedAllchildrenData({ checked: false, index: paramsObj.index });
  //         this.isViewAllchildrenData({ checked: false, index: paramsObj.index });
  //         this.isUpdatedchildrenData({ checked: false, index: paramsObj.index });
  //         this.isDeletedchildrenData({ checked: false, index: paramsObj.index });
  //     }
  // }
  // isSelectedMainChildrenData(paramsObj) {
  //     let menuIndex = paramsObj.menuIndex;
  //     let index = paramsObj.index;

  //     let childrenDataFormArrayFormGroup = ((((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls[index] as FormGroup);

  //     if (paramsObj.checked === true) {
  //         childrenDataFormArrayFormGroup.get('isCreated').setValue(true);
  //         childrenDataFormArrayFormGroup.get('isUpdated').setValue(true);
  //         childrenDataFormArrayFormGroup.get('isView').setValue(true);
  //         childrenDataFormArrayFormGroup.get('isDeleted').setValue(true);
  //     }
  //     else {
  //         childrenDataFormArrayFormGroup.get('isCreated').setValue(false);
  //         childrenDataFormArrayFormGroup.get('isUpdated').setValue(false);
  //         childrenDataFormArrayFormGroup.get('isView').setValue(false);
  //         childrenDataFormArrayFormGroup.get('isDeleted').setValue(false);
  //     }

  //     let menuListDataFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup);

  //     (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //     ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isCreated').setValue(false);
  //     ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isView').setValue(false);
  //     ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isDeleted').setValue(false);
  //     ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isUpdated').setValue(false);
  //     (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map((value) => {

  //         if (value.get('isCreated').value === true) {
  //             ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isCreated').setValue(true);
  //         }
  //         if (value.get('isView').value === true) {
  //             ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isView').setValue(true);
  //         }
  //         if (value.get('isDeleted').value === true) {
  //             ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isDeleted').setValue(true);
  //         }
  //         if (value.get('isUpdated').value === true) {
  //             ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isUpdated').setValue(true);
  //         }

  //         let isCreated = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isCreated').value;
  //         let isView = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isView').value;
  //         let isDeleted = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isDeleted').value;
  //         let isUpdated = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isUpdated').value;

  //         if (value.get('isMainMenuSelected').value === false || isCreated == false || isView === false || isDeleted == false || isUpdated == false) {
  //             (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(false));
  //         }


  //     });
  // }
  // isCreatedAllchildrenData(paramsObj) {

  //     let menuIndex = paramsObj.index
  //     let checked = paramsObj.checked

  //     let menuListFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[paramsObj.index] as FormGroup);
  //     if (checked == true) {

  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.map(value => {
  //             value.get('isCreated').setValue(true);
  //             if (value.get('isCreated').value === true && value.get('isUpdated').value === true && value.get('isView').value === true && value.get('isDeleted').value === true) {
  //                 value.get('isMainMenuSelected').setValue(true);
  //             }
  //         });

  //         if ((menuListFormGroup.get('isView').value === true) && (menuListFormGroup.get('isUpdated').value === true) && (menuListFormGroup.get('isDeleted').value === true)) {
  //             // (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));

  //             let menuListDataFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup);

  //             (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //             (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map((value) => {

  //                 if (value.get('isMainMenuSelected').value === false || value.get('isCreated').value == false || value.get('isView').value === false || value.get('isDeleted').value == false || value.get('isUpdated').value == false) {
  //                     (menuListDataFormGroup.get('isSelectedMainData').setValue(false));
  //                 }
  //             });
  //         }


  //     } else {
  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.map(value => {
  //             value.get('isCreated').setValue(false);
  //             if (value.get('isCreated').value === false || value.get('isUpdated').value === false || value.get('isView').value === false || value.get('isDeleted').value === false) {
  //                 value.get('isMainMenuSelected').setValue(false);
  //             }
  //         });

  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(false));
  //     }

  // }
  // isViewAllchildrenData(paramsObj) {

  //     let menuIndex = paramsObj.index
  //     let checked = paramsObj.checked

  //     let menuListFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[paramsObj.index] as FormGroup);
  //     if (checked == true) {

  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.map(value => {
  //             value.get('isView').setValue(true);
  //             if (value.get('isCreated').value === true && value.get('isUpdated').value === true && value.get('isView').value === true && value.get('isDeleted').value === true) {
  //                 value.get('isMainMenuSelected').setValue(true);
  //             }
  //         }
  //         );

  //         if ((menuListFormGroup.get('isView').value === true) && (menuListFormGroup.get('isUpdated').value === true) && (menuListFormGroup.get('isDeleted').value === true)) {
  //             // (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));

  //             let menuListDataFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup);

  //             (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //             (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map((value) => {

  //                 if (value.get('isMainMenuSelected').value === false || value.get('isCreated').value == false || value.get('isView').value === false || value.get('isDeleted').value == false || value.get('isUpdated').value == false) {
  //                     (menuListDataFormGroup.get('isSelectedMainData').setValue(false));
  //                 }
  //             });
  //         }


  //     } else {
  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.map(value => {
  //             value.get('isView').setValue(false);
  //             if (value.get('isCreated').value === false || value.get('isUpdated').value === false || value.get('isView').value === false || value.get('isDeleted').value === false) {
  //                 value.get('isMainMenuSelected').setValue(false);
  //             }
  //         }
  //         );

  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(false));
  //     }

  // }
  // isUpdatedchildrenData(paramsObj) {

  //     let menuIndex = paramsObj.index
  //     let checked = paramsObj.checked

  //     let menuListFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[paramsObj.index] as FormGroup);
  //     if (checked == true) {

  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray)
  //             .controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.map(value => {
  //                 value.get('isUpdated').setValue(true);
  //                 if (value.get('isCreated').value === true && value.get('isUpdated').value === true && value.get('isView').value === true && value.get('isDeleted').value === true) {
  //                     value.get('isMainMenuSelected').setValue(true);
  //                 }
  //             });

  //         if ((menuListFormGroup.get('isView').value === true) && (menuListFormGroup.get('isUpdated').value === true) && (menuListFormGroup.get('isDeleted').value === true)) {
  //             // (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));

  //             let menuListDataFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup);

  //             (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //             (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map((value) => {

  //                 if (value.get('isMainMenuSelected').value === false || value.get('isCreated').value == false || value.get('isView').value === false || value.get('isDeleted').value == false || value.get('isUpdated').value == false) {
  //                     (menuListDataFormGroup.get('isSelectedMainData').setValue(false));
  //                 }
  //             });
  //         }



  //     } else {
  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray)
  //             .controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.map(value => {
  //                 value.get('isUpdated').setValue(false);
  //                 if (value.get('isCreated').value === false || value.get('isUpdated').value === false || value.get('isView').value === false || value.get('isDeleted').value === false) {
  //                     value.get('isMainMenuSelected').setValue(false);
  //                 }
  //             }
  //             );

  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(false));
  //     }

  // }
  // isDeletedchildrenData(paramsObj) {

  //     let menuIndex = paramsObj.index
  //     let checked = paramsObj.checked

  //     let menuListFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[paramsObj.index] as FormGroup);
  //     if (checked == true) {

  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.map(value => {
  //             value.get('isDeleted').setValue(true);
  //             if (value.get('isCreated').value === true && value.get('isUpdated').value === true && value.get('isView').value === true && value.get('isDeleted').value === true) {
  //                 value.get('isMainMenuSelected').setValue(true);
  //             }
  //         }
  //         );

  //         if ((menuListFormGroup.get('isView').value === true) && (menuListFormGroup.get('isUpdated').value === true) && (menuListFormGroup.get('isDeleted').value === true)) {
  //             // (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));

  //             let menuListDataFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup);

  //             (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //             (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map((value) => {

  //                 if (value.get('isMainMenuSelected').value === false || value.get('isCreated').value == false || value.get('isView').value === false || value.get('isDeleted').value == false || value.get('isUpdated').value == false) {
  //                     (menuListDataFormGroup.get('isSelectedMainData').setValue(false));
  //                 }
  //             });
  //         }



  //     } else {
  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.map(value => {
  //             value.get('isDeleted').setValue(false);
  //             if (value.get('isCreated').value === false || value.get('isUpdated').value === false || value.get('isView').value === false || value.get('isDeleted').value === false) {
  //                 value.get('isMainMenuSelected').setValue(false);
  //             }
  //         }
  //         );

  //         (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(false));
  //     }

  // }
  // isCreatedmenuData(paramsObj) {

  //     let menuIndex = paramsObj.menuIndex;
  //     let menuListFormArray = (this.rolewisemenuForm.controls['menuList'] as FormArray);
  //     let childrenDataFormArray = ((menuListFormArray.controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray);
  //     var totalSelected = 0;
  //     (((this.rolewisemenuForm.controls['menuList'] as FormArray)
  //         .controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.forEach(value => {

  //             if (value.value.isCreated == true) {
  //                 totalSelected++;
  //             }

  //         });
  //     if (totalSelected > 0) {
  //         (this.rolewisemenuForm.get('menuList') as FormArray)
  //             .controls[menuIndex].get('isCreated').setValue(true);
  //     } else {
  //         (this.rolewisemenuForm.get('menuList') as FormArray)
  //             .controls[menuIndex].get('isCreated').setValue(false);
  //     }

  //     if ((childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isCreated').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isView').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isUpdated').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isDeleted').value == true) {
  //         // ((menuListFormArray.controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //         (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isMainMenuSelected').setValue(true);
  //     }
  //     else {
  //         // ((menuListFormArray.controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(false));
  //         (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isMainMenuSelected').setValue(false);
  //     }

  //     let menuListDataFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup);

  //     (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //     (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map((value) => {

  //         if (value.get('isMainMenuSelected').value === false || value.get('isCreated').value == false || value.get('isView').value === false || value.get('isDeleted').value == false || value.get('isUpdated').value == false) {
  //             (menuListDataFormGroup.get('isSelectedMainData').setValue(false));
  //         }
  //     });

  // }
  // isViewmenuData(paramsObj) {

  //     let menuIndex = paramsObj.menuIndex;
  //     let menuListFormArray = (this.rolewisemenuForm.controls['menuList'] as FormArray);
  //     let childrenDataFormArray = ((menuListFormArray.controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray);
  //     var totalSelected = 0;
  //     (((this.rolewisemenuForm.controls['menuList'] as FormArray)
  //         .controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.forEach(value => {

  //             if (value.value.isView == true) {
  //                 totalSelected++;
  //             }

  //         });
  //     if (totalSelected > 0) {
  //         (this.rolewisemenuForm.get('menuList') as FormArray)
  //             .controls[menuIndex].get('isView').setValue(true);
  //     } else {
  //         (this.rolewisemenuForm.get('menuList') as FormArray)
  //             .controls[menuIndex].get('isView').setValue(false);
  //     }

  //     if ((childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isCreated').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isView').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isUpdated').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isDeleted').value == true) {
  //         // ((menuListFormArray.controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //         (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isMainMenuSelected').setValue(true);
  //     }
  //     else {
  //         // ((menuListFormArray.controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(false));
  //         (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isMainMenuSelected').setValue(false);
  //     }

  //     let menuListDataFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup);

  //     (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //     (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map((value) => {

  //         if (value.get('isMainMenuSelected').value === false || value.get('isCreated').value == false || value.get('isView').value === false || value.get('isDeleted').value == false || value.get('isUpdated').value == false) {
  //             (menuListDataFormGroup.get('isSelectedMainData').setValue(false));
  //         }
  //     });

  // }
  // isUpdatedmenuData(paramsObj) {

  //     let menuIndex = paramsObj.menuIndex;
  //     let menuListFormArray = (this.rolewisemenuForm.controls['menuList'] as FormArray);
  //     let childrenDataFormArray = ((menuListFormArray.controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray);
  //     var totalSelected = 0;
  //     (((this.rolewisemenuForm.controls['menuList'] as FormArray)
  //         .controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.forEach(value => {

  //             if (value.value.isUpdated == true) {
  //                 totalSelected++;
  //             }

  //         });
  //     if (totalSelected > 0) {
  //         (this.rolewisemenuForm.get('menuList') as FormArray)
  //             .controls[menuIndex].get('isUpdated').setValue(true);
  //     } else {
  //         (this.rolewisemenuForm.get('menuList') as FormArray)
  //             .controls[menuIndex].get('isUpdated').setValue(false);
  //     }

  //     if ((childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isCreated').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isView').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isUpdated').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isDeleted').value == true) {
  //         // ((menuListFormArray.controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //         (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isMainMenuSelected').setValue(true);
  //     }
  //     else {
  //         // ((menuListFormArray.controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(false));
  //         (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isMainMenuSelected').setValue(false);
  //     }

  //     let menuListDataFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup);

  //     (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //     (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map((value) => {

  //         if (value.get('isMainMenuSelected').value === false || value.get('isCreated').value == false || value.get('isView').value === false || value.get('isDeleted').value == false || value.get('isUpdated').value == false) {
  //             (menuListDataFormGroup.get('isSelectedMainData').setValue(false));
  //         }
  //     });

  // }
  // isDeletedmenuData(paramsObj) {


  //     let menuIndex = paramsObj.menuIndex;
  //     let menuListFormArray = (this.rolewisemenuForm.controls['menuList'] as FormArray);
  //     let childrenDataFormArray = ((menuListFormArray.controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray);


  //     var totalSelected = 0;
  //     (((this.rolewisemenuForm.controls['menuList'] as FormArray)
  //         .controls[menuIndex] as FormGroup).controls['childrenData'] as FormArray).controls.forEach(value => {

  //             if (value.value.isDeleted == true) {
  //                 totalSelected++;
  //             }

  //         });
  //     if (totalSelected > 0) {
  //         (this.rolewisemenuForm.get('menuList') as FormArray)
  //             .controls[menuIndex].get('isDeleted').setValue(true);
  //     } else {
  //         (this.rolewisemenuForm.get('menuList') as FormArray)
  //             .controls[menuIndex].get('isDeleted').setValue(false);
  //     }

  //     if ((childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isCreated').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isView').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isUpdated').value == true && (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isDeleted').value == true) {
  //         // ((menuListFormArray.controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //         (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isMainMenuSelected').setValue(true);
  //     }
  //     else {
  //         // ((menuListFormArray.controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(false));
  //         (childrenDataFormArray.controls[paramsObj.index] as FormGroup).get('isMainMenuSelected').setValue(false);
  //     }

  //     let menuListDataFormGroup = ((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup);

  //     (((this.rolewisemenuForm.controls['menuList'] as FormArray).controls[menuIndex] as FormGroup).get('isSelectedMainData').setValue(true));
  //     (menuListDataFormGroup.controls['childrenData'] as FormArray).controls.map((value) => {

  //         if (value.get('isMainMenuSelected').value === false || value.get('isCreated').value == false || value.get('isView').value === false || value.get('isDeleted').value == false || value.get('isUpdated').value == false) {
  //             (menuListDataFormGroup.get('isSelectedMainData').setValue(false));
  //         }
  //     });





  // }
  // showHideMenuList(params) {

  //     if (params !== undefined && params.index !== undefined) {
  //         if ((this.rolewisemenuForm.get('menuList') as FormArray).controls[params.index].value.isShowChildrenList == false) {
  //             (this.rolewisemenuForm.get('menuList') as FormArray).controls[params.index].get('isShowChildrenList').setValue(true);
  //         } else {
  //             (this.rolewisemenuForm.get('menuList') as FormArray).controls[params.index].get('isShowChildrenList').setValue(false);
  //         }

  //     }
  // }
  // saveRolewisemenu() {

  //     if (this.rolewisemenuForm.invalid) {
  //         this.submittedMenuData = true;
  //         return;
  //     }


  //     let savemenuList = []

  //     this.rolewisemenuForm.value.menuList.forEach(obj => {
  //         var customObj = {
  //             'menuId': obj.menuId,
  //             'isCreated': obj.isCreated,
  //             'isView': obj.isView,
  //             'isUpdated': obj.isUpdated,
  //             'isDeleted': obj.isDeleted,
  //         }
  //         savemenuList.push(customObj)
  //         if (obj.childrenData.length > 0) {
  //             obj.childrenData.forEach(obj1 => {
  //                 var customObj1 = {
  //                     'menuId': obj1.menuId,
  //                     'isCreated': obj1.isCreated,
  //                     'isView': obj1.isView,
  //                     'isUpdated': obj1.isUpdated,
  //                     'isDeleted': obj1.isDeleted,
  //                 }
  //                 savemenuList.push(customObj1)
  //             });
  //         }


  //     });
  //     let rolewisemenuModelObj = {
  //         "roleId": this.selectedRole,
  //         "rolewisemenu": savemenuList
  //     };

  //     this.adminLayoutService.SaverolewiseMenu(rolewisemenuModelObj).subscribe((Response: any) => {

  //         if (Response.meta.code == 200) {
  //             this.submittedMenuData = false;
  //             this.selectedRole = null;
  //             this.onRoleChange();
  //             this.commonService.notifier.notify('success', "Role Wise Menu Updated Successfully.");
  //         }
  //         else {
  //             this.commonService.notifier.notify('error', Response.meta.message);
  //         }
  //     }, (error) => {
  //         console.log(error);
  //     });
  // }
  // new Code end






  rolewisemenuForm!: FormGroup;
  submittedMenuData = false;
  activeroleList: any;
  menuList: any;
  selectedRole: any;
  isView: boolean = false;
  isCreated: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;

  isCreatedAllSelect: boolean = false;
  isViewAllSelect: boolean = false;
  isUpdatedAllSelect: boolean = false;
  isDeletedAllSelect: boolean = false;
  // getFormArray(controlName: string): FormArray {
  //   return this.rolewisemenuForm.get(controlName) as FormArray;
  // }
getFormGroup(control: AbstractControl): FormGroup {
  return control as FormGroup;
}

// getFormArray(control: AbstractControl): FormArray {
//   return control as FormArray;
// }

get menuListControls(): AbstractControl[] {
  return this.getFormArray(this.rolewisemenuForm.get('menuList')!).controls;
}

getFormArray(control: AbstractControl | null): FormArray {
  return control as FormArray;
}



  constructor(public commonService: CommonService, public adminLayoutService: AdminLayoutService, private fb: FormBuilder, private router: Router, private cookieService: CookieService, private spinner: NgxSpinnerService) {
    let pagePermission = { module: "rolewisemenu" }
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

  ngOnInit() {
    this.getRoleActiveList();
    this.selectedRole = null;
    this.defaultForm();
    this.menuList = this.rolewisemenuForm.get('menuList')! as FormArray;
    //this.menuList.push(this.createMenuItem({}));
  }
  defaultForm() {
    this.rolewisemenuForm = this.fb.group({
      menuList: this.fb.array([]),
    });
  }

  addMenuItem(oItem?: any) {

    let IG = this.fb.group({
      menuId: [(oItem['_id'] ? oItem['_id'] : ''),],
      title: [(oItem['title'] ? oItem['title'] : ''),],
      isCreated: [(oItem['isCreated'] ? oItem['isCreated'] : false),],
      isUpdated: [(oItem['isUpdated'] ? oItem['isUpdated'] : false),],
      isView: [(oItem['isView'] ? oItem['isView'] : false),],
      isDeleted: [(oItem['isDeleted'] ? oItem['isDeleted'] : false),],
      isShowChildrenList: [(oItem['isShowChildrenList'] ? oItem['isShowChildrenList'] : false),],
      childrenData: this.fb.array([]),
    });
    (<FormArray>this.rolewisemenuForm.get('menuList')).push(IG);
    let menuIndex = (<FormArray>this.rolewisemenuForm.get('menuList')).length - 1;
    oItem.childrenData.forEach((cItem: any) => {
      this.addChildrenItem(menuIndex, cItem);
    });
  }


  addChildrenItem(oItem: number, cItem?: any) {

    //console.log('userIndex', userIndex, '-------', 'data', data);

    let cd = this.fb.group({
      menuId: [(cItem['_id'] ? cItem['_id'] : ''),],
      title: [(cItem['title'] ? cItem['title'] : ''),],
      isCreated: [(cItem['isCreated'] ? cItem['isCreated'] : false),],
      isUpdated: [(cItem['isUpdated'] ? cItem['isUpdated'] : false),],
      isView: [(cItem['isView'] ? cItem['isView'] : false),],
      isDeleted: [(cItem['isDeleted'] ? cItem['isDeleted'] : false),],
    });
    (<FormArray>(<FormGroup>(<FormArray>this.rolewisemenuForm.controls['menuList'])
      .controls[oItem]).controls['childrenData']).push(cd);

  }

  getRoleActiveList() {

    this.adminLayoutService.getRoleList().subscribe((Response: any) => {

      if (Response.meta.code == 200) {
        this.activeroleList = Response.data;
      } else {
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }

  onRoleChange() {

    this.menuList.clear();
    let roleId = { RoleId: this.selectedRole }
    this.adminLayoutService.getRolewisemenuList(roleId).subscribe((Response: any) => {

      if (Response.meta.code == 200) {

        this.isCreatedAllSelect = false;
        this.isViewAllSelect = false;
        this.isUpdatedAllSelect = false;
        this.isDeletedAllSelect = false;

        Response.data.forEach((oItem: any) => {
          this.addMenuItem(oItem);
        });

        var totalCreatedSelected = 0;
        var totalViewSelected = 0;
        var totalUpdatedSelected = 0;
        var totalDeletedSelected = 0;

        (this.rolewisemenuForm.controls['menuList'] as FormArray).controls.map((menuList: any) => {
          if (menuList.value.isCreated == false) {
            totalCreatedSelected++;
          }
          else {
            (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
              if (childrenList.value.isCreated == false) {
                totalCreatedSelected++;
              }
            })
          }

          if (menuList.value.isView == false) {
            totalViewSelected++;
          }
          else {
            (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
              if (childrenList.value.isView == false) {
                totalViewSelected++;
              }
            })
          }

          if (menuList.value.isUpdated == false) {
            totalUpdatedSelected++;
          }
          else {
            (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
              if (childrenList.value.isUpdated == false) {
                totalUpdatedSelected++;
              }
            })
          }

          if (menuList.value.isDeleted == false) {
            totalDeletedSelected++;
          }
          else {
            (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
              if (childrenList.value.isDeleted == false) {
                totalDeletedSelected++;
              }
            })
          }

        });
        if (totalCreatedSelected > 0) {
          this.isCreatedAllSelect = false
        } else {
          this.isCreatedAllSelect = true
        }

        if (totalViewSelected > 0) {
          this.isViewAllSelect = false
        } else {
          this.isViewAllSelect = true
        }

        if (totalUpdatedSelected > 0) {
          this.isUpdatedAllSelect = false
        } else {
          this.isUpdatedAllSelect = true
        }

        if (totalDeletedSelected > 0) {
          this.isDeletedAllSelect = false
        } else {
          this.isDeletedAllSelect = true
        }

      } else {
      }
      //for select sub industry step
    }, (error) => {
      console.log(error.error.Message);
    });
  }

 saveRolewisemenu() {
  if (this.rolewisemenuForm.invalid) {
    this.submittedMenuData = true;
    return;
  }

  const savemenuList: any[] = [];

  this.rolewisemenuForm.value.menuList.forEach((obj: any) => {
    const customObj = {
      menuId: obj.menuId,
      isCreated: !!obj.isCreated,
      isView: !!obj.isView,
      isUpdated: !!obj.isUpdated,
      isDeleted: !!obj.isDeleted,
    };
    savemenuList.push(customObj);

    if (Array.isArray(obj.childrenData) && obj.childrenData.length > 0) {
      obj.childrenData.forEach((child: any) => {
        const customChild = {
          menuId: child.menuId,
          isCreated: !!child.isCreated,
          isView: !!child.isView,
          isUpdated: !!child.isUpdated,
          isDeleted: !!child.isDeleted,
        };
        savemenuList.push(customChild);
      });
    }
  });

  const rolewisemenuModelObj = {
    roleId: this.selectedRole,
    rolewisemenu: savemenuList
  };

  // 💡 Optional: Log the request object safely
  console.log('Sending:', JSON.parse(JSON.stringify(rolewisemenuModelObj)));

  this.adminLayoutService.SaverolewiseMenu(rolewisemenuModelObj).subscribe({
    next: (Response: any) => {
      if (Response.meta.code === 200) {
        this.isCreatedAllSelect = false;
        this.isViewAllSelect = false;
        this.isUpdatedAllSelect = false;
        this.isDeletedAllSelect = false;
        this.submittedMenuData = false;
        this.selectedRole = null;
        this.onRoleChange();
      } else {
        console.error('Error response:', Response.meta.message);
      }
    },
    error: (error) => {
      console.error('API Error:', error);
    }
  });
}



  isCreatedAllSelectchildrenData(boolean: any) {
    if (boolean === true) {
      (this.rolewisemenuForm.controls['menuList'] as FormArray).controls.map((menuList: any) => {
        menuList.get('isCreated').setValue(true);

        (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
          childrenList.get('isCreated').setValue(true);
        })
      })
    }
    else {
      (this.rolewisemenuForm.controls['menuList'] as FormArray).controls.map((menuList: any) => {
        menuList.get('isCreated').setValue(false);

        (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
          childrenList.get('isCreated').setValue(false);
        })
      })
    }
  }
  isUpdatedAllSelectchildrenData(boolean: any) {
    if (boolean === true) {
      (this.rolewisemenuForm.controls['menuList'] as FormArray).controls.map((menuList: any) => {
        menuList.get('isUpdated').setValue(true);

        (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
          childrenList.get('isUpdated').setValue(true);
        })
      })
    }
    else {
      (this.rolewisemenuForm.controls['menuList'] as FormArray).controls.map((menuList: any) => {
        menuList.get('isUpdated').setValue(false);

        (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
          childrenList.get('isUpdated').setValue(false);
        })
      })
    }
  }
  isViewAllSelectchildrenData(boolean: any) {
    if (boolean === true) {
      (this.rolewisemenuForm.controls['menuList'] as FormArray).controls.map((menuList: any) => {
        menuList.get('isView').setValue(true);

        (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
          childrenList.get('isView').setValue(true);
        })
      })
    }
    else {
      (this.rolewisemenuForm.controls['menuList'] as FormArray).controls.map((menuList: any) => {
        menuList.get('isView').setValue(false);

        (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
          childrenList.get('isView').setValue(false);
        })
      })
    }
  }
  isDeletedAllSelectchildrenData(boolean: any) {
    if (boolean === true) {
      (this.rolewisemenuForm.controls['menuList'] as FormArray).controls.map((menuList: any) => {
        menuList.get('isDeleted').setValue(true);

        (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
          childrenList.get('isDeleted').setValue(true);
        })
      })
    }
    else {
      (this.rolewisemenuForm.controls['menuList'] as FormArray).controls.map((menuList: any) => {
        menuList.get('isDeleted').setValue(false);

        (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
          childrenList.get('isDeleted').setValue(false);
        })
      })
    }
  }


  isCreatedAllchildrenData(paramsObj: any) {
    const menuIndex = paramsObj.index;
    const checked = paramsObj.checked;

    const menuListControl = this.rolewisemenuForm.get('menuList');

    if (menuListControl instanceof FormArray) {
      const menuGroup = menuListControl.at(menuIndex) as FormGroup;
      const childrenData = menuGroup.get('childrenData');

      if (childrenData instanceof FormArray) {
        childrenData.controls.forEach(childControl => {
          const isCreatedControl = childControl.get('isCreated');
          if (isCreatedControl) {
            isCreatedControl.setValue(checked);
          }
        });
      }

      let totalCreatedSelected = 0;

      menuListControl.controls.forEach(menuControl => {
        if (menuControl.value.isCreated === false) {
          totalCreatedSelected++;
        } else {
          const children = menuControl.get('childrenData');
          if (children instanceof FormArray) {
            children.controls.forEach(child => {
              if (child.value.isCreated === false) {
                totalCreatedSelected++;
              }
            });
          }
        }
      });

      this.isCreatedAllSelect = totalCreatedSelected === 0;
    }
  }

  isViewAllchildrenData(paramsObj: any) {
    const menuIndex = paramsObj.index;
    const checked = paramsObj.checked;

    const menuListControl = this.rolewisemenuForm.get('menuList');

    if (menuListControl instanceof FormArray) {
      const menuGroup = menuListControl.at(menuIndex) as FormGroup;
      const childrenData = menuGroup.get('childrenData');

      if (childrenData instanceof FormArray) {
        childrenData.controls.forEach(childControl => {
          const isViewControl = childControl.get('isView');
          if (isViewControl) {
            isViewControl.setValue(checked);
          }
        });
      }

      let totalViewSelected = 0;

      menuListControl.controls.forEach(menuControl => {
        if (menuControl.value.isView === false) {
          totalViewSelected++;
        } else {
          const children = menuControl.get('childrenData');
          if (children instanceof FormArray) {
            children.controls.forEach(child => {
              if (child.value.isView === false) {
                totalViewSelected++;
              }
            });
          }
        }
      });

      this.isViewAllSelect = totalViewSelected === 0;
    }
  }


  isUpdatedchildrenData(paramsObj: any) {
    const menuIndex = paramsObj.index;
    const checked = paramsObj.checked;

    const menuListControl = this.rolewisemenuForm.get('menuList');

    if (menuListControl instanceof FormArray) {
      const menuGroup = menuListControl.at(menuIndex) as FormGroup;
      const childrenData = menuGroup.get('childrenData');

      if (childrenData instanceof FormArray) {
        childrenData.controls.forEach(childControl => {
          const isUpdatedControl = childControl.get('isUpdated');
          if (isUpdatedControl) {
            isUpdatedControl.setValue(checked);
          }
        });
      }

      let totalUpdatedSelected = 0;

      menuListControl.controls.forEach(menuControl => {
        if (menuControl.value.isUpdated === false) {
          totalUpdatedSelected++;
        } else {
          const children = menuControl.get('childrenData');
          if (children instanceof FormArray) {
            children.controls.forEach(child => {
              if (child.value.isUpdated === false) {
                totalUpdatedSelected++;
              }
            });
          }
        }
      });

      this.isUpdatedAllSelect = totalUpdatedSelected === 0;
    }
  }


  isDeletedchildrenData(paramsObj: any) {
    const menuIndex = paramsObj.index;
    const checked = paramsObj.checked;
    const menuListControl = this.rolewisemenuForm.get('menuList');

    if (menuListControl instanceof FormArray) {
      const menuGroup = menuListControl.at(menuIndex) as FormGroup;
      const childrenData = menuGroup.get('childrenData');

      if (childrenData instanceof FormArray) {
        childrenData.controls.forEach(childControl => {
          const isDeletedControl = childControl.get('isDeleted');
          if (isDeletedControl) {
            isDeletedControl.setValue(checked);
          }
        });
      }


      var totalDeletedSelected = 0;
      (this.rolewisemenuForm.controls['menuList'] as FormArray).controls.map((menuList: any) => {
        if (menuList.value.isDeleted == false) {
          totalDeletedSelected++;
        }
        else {
          (menuList.controls['childrenData'] as FormArray).controls.map((childrenList: any) => {
            if (childrenList.value.isDeleted == false) {
              totalDeletedSelected++;
            }
          })
        }
      });
      if (totalDeletedSelected > 0) {
        this.isDeletedAllSelect = false
      } else {
        this.isDeletedAllSelect = true
      }

    }
  }
  isCreatedmenuData(paramsObj: any) {
    const menuIndex = paramsObj.menuIndex;
    const menuListControl = this.rolewisemenuForm.get('menuList');

    if (menuListControl instanceof FormArray) {
      const menuGroup = menuListControl.at(menuIndex) as FormGroup;
      const childrenData = menuGroup.get('childrenData') as FormArray;

      let totalSelected = 0;
      if (childrenData instanceof FormArray) {
        childrenData.controls.forEach(child => {
          if (child.value.isCreated === true) {
            totalSelected++;
          }
        });
      }

      const isCreatedControl = menuGroup.get('isCreated');
      if (isCreatedControl) {
        isCreatedControl.setValue(totalSelected > 0);
      }

      let totalCreatedSelected = 0;
      menuListControl.controls.forEach(menuControl => {
        if (menuControl.value.isCreated === false) {
          totalCreatedSelected++;
        } else {
          const childArray = menuControl.get('childrenData') as FormArray;
          if (childArray instanceof FormArray) {
            childArray.controls.forEach(child => {
              if (child.value.isCreated === false) {
                totalCreatedSelected++;
              }
            });
          }
        }
      });

      this.isCreatedAllSelect = totalCreatedSelected === 0;
    }
  }

  isViewmenuData(paramsObj: any) {
    const menuIndex = paramsObj.menuIndex;
    const menuListControl = this.rolewisemenuForm.get('menuList');

    if (menuListControl instanceof FormArray) {
      const menuGroup = menuListControl.at(menuIndex) as FormGroup;
      const childrenData = menuGroup.get('childrenData') as FormArray;

      let totalSelected = 0;
      if (childrenData instanceof FormArray) {
        childrenData.controls.forEach(child => {
          if (child.value.isView === true) {
            totalSelected++;
          }
        });
      }

      const isViewControl = menuGroup.get('isView');
      if (isViewControl) {
        isViewControl.setValue(totalSelected > 0);
      }

      let totalViewSelected = 0;
      menuListControl.controls.forEach(menuControl => {
        if (menuControl.value.isView === false) {
          totalViewSelected++;
        } else {
          const childArray = menuControl.get('childrenData') as FormArray;
          if (childArray instanceof FormArray) {
            childArray.controls.forEach(child => {
              if (child.value.isView === false) {
                totalViewSelected++;
              }
            });
          }
        }
      });

      this.isViewAllSelect = totalViewSelected === 0;
    }
  }

  isUpdatedmenuData(paramsObj: any) {
    const menuIndex = paramsObj.menuIndex;
    const menuListControl = this.rolewisemenuForm.get('menuList');

    if (menuListControl instanceof FormArray) {
      const menuGroup = menuListControl.at(menuIndex) as FormGroup;
      const childrenData = menuGroup.get('childrenData');

      let totalSelected = 0;

      if (childrenData instanceof FormArray) {
        childrenData.controls.forEach(child => {
          if (child.value.isUpdated === true) {
            totalSelected++;
          }
        });
      }

      const isUpdatedControl = menuGroup.get('isUpdated');
      if (isUpdatedControl) {
        isUpdatedControl.setValue(totalSelected > 0);
      }

      let totalUpdatedSelected = 0;

      menuListControl.controls.forEach(menuControl => {
        if (menuControl.value.isUpdated === false) {
          totalUpdatedSelected++;
        } else {
          const childArray = menuControl.get('childrenData') as FormArray;
          if (childArray instanceof FormArray) {
            childArray.controls.forEach(child => {
              if (child.value.isUpdated === false) {
                totalUpdatedSelected++;
              }
            });
          }
        }
      });

      this.isUpdatedAllSelect = totalUpdatedSelected === 0;
    }
  }

  isDeletedmenuData(paramsObj: any) {
    const menuListControl = this.rolewisemenuForm.get('menuList');
    const menuIndex = paramsObj.menuIndex;
    const checked = paramsObj.checked;
    let totalSelected = 0;

    if (menuListControl instanceof FormArray) {
      const menuGroup = menuListControl.at(menuIndex) as FormGroup;
      const childrenData = menuGroup.get('childrenData');

      if (childrenData instanceof FormArray) {
        childrenData.controls.forEach(childControl => {
          if (childControl.value.isDeleted === true) {
            totalSelected++;
          }
        });
      }

      const isDeletedControl = menuGroup.get('isDeleted');
      if (isDeletedControl) {
        isDeletedControl.setValue(totalSelected > 0);
      }

      let totalDeletedSelected = 0;

      menuListControl.controls.forEach((menuControl: AbstractControl) => {
        if (menuControl.value.isDeleted === false) {
          totalDeletedSelected++;
        } else {
          const childArray = menuControl.get('childrenData') as FormArray;
          if (childArray instanceof FormArray) {
            childArray.controls.forEach(child => {
              if (child.value.isDeleted === false) {
                totalDeletedSelected++;
              }
            });
          }
        }
      });

      this.isDeletedAllSelect = totalDeletedSelected === 0;
    }
  }


  showHideMenuList(params: any) {
    const menuListControl = this.rolewisemenuForm.get('menuList');

    if (params?.index !== undefined && menuListControl instanceof FormArray) {
      const control = menuListControl.at(params.index);
      if (control) {
        const isShowChildrenList = control.get('isShowChildrenList');
        if (isShowChildrenList) {
          isShowChildrenList.setValue(!isShowChildrenList.value);
        }
      }
    }
  }

}
