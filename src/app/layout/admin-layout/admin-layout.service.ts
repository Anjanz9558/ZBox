import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../shared/common.service';

@Injectable({
    providedIn: 'root'
})
export class AdminLayoutService {

    constructor(private http: HttpClient, private commonService: CommonService) { }

    // =====================================================================================================================================================================
    // -------------------------------------------------------------------------| Login Page APIs |-------------------------------------------------------------------------
    // =====================================================================================================================================================================


    adminLogin(loginCred: any) {
        return this.http.post(this.commonService.rootData.rootUrl + 'adminside/login', loginCred);
    }

    adminAPIStructre(loginCred: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminside/login', loginCred, { headers: headers });
    }

    // =====================================================================================================================================================================
    // -----------------------------------------------------------------------| Languages Page APIs |-----------------------------------------------------------------------
    // =====================================================================================================================================================================

    // getAllLanguages(language: any) {
    //   let myToken = localStorage.getItem("myToken")
    //   let headers = new HttpHeaders({
    //     'Authorization': `Bearer ${myToken}`
    //   })
    //   return this.http.get(this.commonService.rootData.rootUrl + 'admin/language/getAllLanguages', { params: language, headers: headers });
    // }

    getAllResources(languageId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'admin/resource/getResources', { params: languageId, headers: headers });
    }

    // getLanguageDetailsById(languageId: any) {
    //   let myToken = localStorage.getItem("myToken")
    //   let headers = new HttpHeaders({
    //     'Authorization': `Bearer ${myToken}`
    //   })
    //   return this.http.get(this.commonService.rootData.rootUrl + 'admin/language/getLanguageById/' + languageId, { headers: headers });
    // }

    // createNewLanguage(resourceObj: any) {
    //   let myToken = localStorage.getItem("myToken")
    //   let headers = new HttpHeaders({
    //     'Authorization': `Bearer ${myToken}`
    //   })
    //   return this.http.post(this.commonService.rootData.rootUrl + 'admin/language/addLanguage', resourceObj, { headers: headers });
    // }

    // createNewResource(resourceObj: any) {
    //   let myToken = localStorage.getItem("myToken")
    //   let headers = new HttpHeaders({
    //     'Authorization': `Bearer ${myToken}`
    //   })
    //   return this.http.post(this.commonService.rootData.rootUrl + 'admin/resource/addResource', resourceObj, { headers: headers });
    // }

    // updateLanguage(resourceObj: any) {
    //   let myToken = localStorage.getItem("myToken")
    //   let headers = new HttpHeaders({
    //     'Authorization': `Bearer ${myToken}`
    //   })
    //   return this.http.post(this.commonService.rootData.rootUrl + 'admin/language/updateLanguage', resourceObj, { headers: headers });
    // }


    // LanguageActiveDeActive(resourceObj: any) {
    //   let myToken = localStorage.getItem("myToken")
    //   let headers = new HttpHeaders({
    //     'Authorization': `Bearer ${myToken}`
    //   })
    //   return this.http.post(this.commonService.rootData.rootUrl + 'admin/language/LanguageActiveDeActive', resourceObj, { headers: headers });
    // }

    // updateResource(resourceObj: any) {
    //   let myToken = localStorage.getItem("myToken")
    //   let headers = new HttpHeaders({
    //     'Authorization': `Bearer ${myToken}`
    //   })
    //   return this.http.post(this.commonService.rootData.rootUrl + 'admin/resource/updateResource', resourceObj, { headers: headers });
    // }


    // resourceActiveDeActive(resourceData: any) {
    //   let myToken = localStorage.getItem("myToken")
    //   let headers = new HttpHeaders({
    //     'Authorization': `Bearer ${myToken}`
    //   })
    //   return this.http.post<any>(
    //     this.commonService.rootData.rootUrl + 'admin/resource/ResourceActiveDeActive', resourceData, { headers });
    // }





    changePassword(updatechangepwdData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/ChangePasswordForAdmin', updatechangepwdData, { headers: headers });
    }


    //get dashboard api
    getDashboardLeaveListData(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminDashBoard/leaveList', params, { headers: headers });
    }
    getDashboardCountList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminDashBoard/adminDashBoardList', { headers: headers });
    }
    getDashboardRecentProjectList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminDashBoard/recentProject', { headers: headers });
    }
    getDashboardPendingCheckInList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminDashBoard/pendingCheckInUserStatusList', { headers: headers });
    }
    getDashboardLeaveCountList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminDashBoard/employeeLeaveCount', { headers: headers });
    }
    getAssignListDataEmp() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeDashboard/AssignDetail', { headers: headers });
    }
    startAllEmpBreak() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'dayReportMaster/startAllEmployeeLunchBreak', { headers: headers });
    }

    //get Employee list api
    getuserMaster() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getEmpInfoList', { headers: headers });
    }
    generateLedger() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/addAllEmpLedger', { headers: headers });
    }
    generateCompanyBankLedger() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/addAllComapnyBankDetailsLedger', { headers: headers });
    }
    generateSupplierLedger() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/addAllSupplierLedger', { headers: headers });
    }
    generateClientLedger() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/addAllClientLedger', { headers: headers });
    }
    // getuserMaster() {
    //     let headers = new HttpHeaders({
    //         'Authorization': `Bearer ${localStorage.getItem('myToken')}`
    //     })
    //     return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/userListForAdmin', { headers: headers });
    // }

    Statususer(updatestatususerData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        // return this.http.post(this.commonService.rootData.rootUrl + 'auth/user-active-deactive', updatestatususerData, { headers: headers });
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/companyMasterDataActiveDeActive', updatestatususerData, { headers: headers });
    }
    getRoleList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/activeRoleList', { headers: headers });
    }
    getActiveHolidayList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'auth/HolidayList', { headers: headers });
    }

    getDesignationList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'designation/ActiveDesignationList', { headers: headers });
    }

    getTechnologyList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/technologyActiveDataList', { headers: headers });
    }
    getDepartmentList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/departmentMasterDataList', { headers: headers });
    }

    getDocumentTypeMasterslist() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/documentDataList', { headers: headers });
    }
    getProjectMasterslist() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'projectMaster/ProjectMasterDataList', { headers: headers });
    }

    uploadHolidayExcelFile(uploadHolidayExcelFile: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'auth/saveHoliday', uploadHolidayExcelFile, { headers: headers });
    }

    // basic information save and update
    SaveUserBasicInfoMaster(createuserMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/empInfoSave', createuserMasterData, { headers: headers });
    }

    UpdateUserBasicInfoMaster(updateuserMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/empInfoUpdate', updateuserMasterData, { headers: headers });
    }
    getBasicDetailsByID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/basicDetailsById', { params: documentUploadByID, headers: headers });
    }
    getBasicDetailsByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/basicDetailsEmpId', { params: documentUploadByID, headers: headers });
    }
    resetPinByEmployeeId(pinDataObj: any) {
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/passwordResetForUser', pinDataObj);
    }

    // save emergency contact information save and update 
    SaveEmergencyContactInfo(emergencyContactInfo: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/empContactInfoSave', emergencyContactInfo, { headers: headers });
    }
    UpdateEmergencyContactInfo(emergencyContactInfo: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/contactDataUpdate', emergencyContactInfo, { headers: headers });
    }
    getEmergencyContactInfoById(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/contactDetailsById', { params: documentUploadByID, headers: headers });
    }
    getEmergencyContactInfoByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/contactDetailsEmpId', { params: documentUploadByID, headers: headers });
    }
    deleteContactInfoById(deleteId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/empContactInfoDelete', { params: deleteId, headers: headers });
    }


    // document upload save and update 
    SaveDocumentUploadData(emergencyContactInfo: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/documentDetails-Save', emergencyContactInfo, { headers: headers });
    }
    getDocumentUploadById(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/documentDetailsById', { params: documentUploadByID, headers: headers });
    }
    getDocumentUploadList(employeeId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/documentDetailsList', { params: employeeId, headers: headers });
    }
    UpdateDocumentUploadData(emergencyContactInfo: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/documentDetails-Update', emergencyContactInfo, { headers: headers });
    }
    deleteDocumentDetailsById(deleteId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/documentDetailsDelete', { params: deleteId, headers: headers });
    }

    // Resume information save and update
    SaveResumeInformationData(resumeInformationObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'empResumeInfo/empResumeSave', resumeInformationObj, { headers: headers });
    }
    UpdateResumeInformationData(resumeInformationObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'empResumeInfo/empResumeUpdate', resumeInformationObj, { headers: headers });
    }
    getResumeDetailsByEmpID(empResumeDetailsByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'empResumeInfo/empResumeDetailsByempId', { params: empResumeDetailsByID, headers: headers });
    }
    getProjectDetailsByEmployeeId(id: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/EmpWiseProjectListData', { params: id, headers: headers });
    }
    removeTeamAssign(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'projectMaster/removeTeamAssign', params, { headers: headers });
    }
    saveTeamAssignData(emergencyContactInfo: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'projectMaster/teamAssign', emergencyContactInfo, { headers: headers });
    }



    // company information save and update
    SaveCompanyInformationData(companyInformationObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/companyInfoSaveupdate', companyInformationObj, { headers: headers });
    }
    UpdateCompanyInformationData(companyInformationObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/companyInfoUpdate', companyInformationObj, { headers: headers });
    }
    getCompanyDetailsByID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/companyInfoDetailsEmpId', { params: documentUploadByID, headers: headers });
    }
    getCompanyDetailsByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/companyDetailsEmpId', { params: documentUploadByID, headers: headers });
    }
    sendLoginCredential(obj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/sendUserCredentials', { params: obj, headers: headers });
    }


    // education details save and update
    SaveEducationDetailsData(companyInformationObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/educationDetails-Save', companyInformationObj, { headers: headers });
    }
    UpdateEducationDetailsData(companyInformationObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/educationDetail-Update', companyInformationObj, { headers: headers });
    }
    getEducationDetailsById(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/educationDetailsById', { params: documentUploadByID, headers: headers });
    }
    getEducationDetailsByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/educationDetailsEmpId', { params: documentUploadByID, headers: headers });
    }
    deleteEducationDetailsById(deleteId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/educationDetailDelete', { params: deleteId, headers: headers });
    }

    // Experience details save and update
    SaveExperienceDetailsData(companyInformationObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/experienceDetails-Save', companyInformationObj, { headers: headers });
    }
    UpdateExperienceDetailsData(companyInformationObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/experienceDetails-Update', companyInformationObj, { headers: headers });
    }
    getExperienceDetailsById(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/experienceDetailsById', { params: documentUploadByID, headers: headers });
    }
    getExperienceDetailsByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/experienceDetailsByEmpId', { params: documentUploadByID, headers: headers });
    }
    deleteExperienceDetailsById(deleteId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/experienceDetailsDelete', { params: deleteId, headers: headers });
    }

    // Bank details save and update
    SaveBankDetailsData(bankInfoObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'bankDetails/bankDetailsSave', bankInfoObj, { headers: headers });
    }
    UpdateBankDetailsData(bankInfoObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'bankDetails/bankDetailsUpdate', bankInfoObj, { headers: headers });
    }
    getBankDetailsById(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'bankDetails/bankDetailsBankById', { params: documentUploadByID, headers: headers });
    }
    getBankDetailsByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'bankDetails/bankDetailsById', { params: documentUploadByID, headers: headers });
    }

    // Salary details save and update
    SaveSalaryDetailsData(bankInfoObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'salaryDetails/SalaryDetailsSave', bankInfoObj, { headers: headers });
    }
    UpdateSalaryDetailsData(bankInfoObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'salaryDetails/SalaryDetailsUpdate', bankInfoObj, { headers: headers });
    }
    getSalaryDetailsById(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/SalaryDetailsBySalaryId', { params: documentUploadByID, headers: headers });
    }
    getSalaryDetailsByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/SalaryDetailsById', { params: documentUploadByID, headers: headers });
    }
    getMonthlySalaryDetailsByMonthYear(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/monthWiseSalaryData', { params: params, headers: headers });
    }

    //Monthly Salary details save and update
    SaveMonthlySalaryDetailsData(bankInfoObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'monthlysalarysave/monthlysalaryDetailsSave', bankInfoObj, { headers: headers });
    }
    UpdateMonthlySalaryDetailsData(bankInfoObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'monthlysalarysave/monthlysalaryDetailsUpdate', bankInfoObj, { headers: headers });
    }
    getMonthlySalaryDetailsById(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'monthlysalarysave/salarydetailsbyID', { params: documentUploadByID, headers: headers });
    }
    getMonthlySalaryDetailsByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'monthlysalarysave/SalaryDetailsByemployeeId', { params: documentUploadByID, headers: headers });
    }

    //Month wise leave save and update
    SaveMonthWiseLeaveData(bankInfoObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'monthviseleavetype/monthviseleavetypesave', bankInfoObj, { headers: headers });
    }
    UpdateMonthWiseLeaveData(bankInfoObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'monthviseleavetype/monthviseleavetypeUpdate', bankInfoObj, { headers: headers });
    }
    getMonthWiseLeaveById(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'monthviseleavetype/leavetypedetailsbyID', { params: documentUploadByID, headers: headers });
    }
    getMonthWiseLeaveByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'monthviseleavetype/leavetypeDetailsByemployeeId', { params: documentUploadByID, headers: headers });
    }

    // leave list balance
    UpdateLeaveBalanceData(bankInfoObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'employeeLeave/updateLeaveCount', bankInfoObj, { headers: headers });
    }
    getLeaveBalanceByEmployeeID(leaveObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeLeave/monthWiseLeaveCount', { params: leaveObj, headers: headers });
    }
    getLeaveBalanceByEmployeeIDRemainingCount(leaveObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeLeave/empLeaveCountYearWise', { params: leaveObj, headers: headers });
    }


    downloadEmployeeAppraisalLetter(id: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/AppraisalLetterSlipPdfGenerate', { params: id, headers: headers });
    }
    downloadEmployeeAppoinmentLetter(id: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/appoinmentLetterGenerate', { params: id, headers: headers });
    }
    downloadEmployeeExperiance(id: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/experienceLatterSlipPdfGenerate', { params: id, headers: headers });
    }
    downloadSalarySlipZip(id: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'salaryDetails/salarySlipZip', id, { headers: headers });
    }
    downloadEmployeeTrainingExpLetter(id: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/appoinmentLetterGenerate', { params: id, headers: headers });
    }
    downloadOfferLetter(id: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/OFFERLetterSlipPdfGenerate', { params: id, headers: headers });
    }

    getSalaryGenerationList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/salaryReportSaveMonthWise', { params: params, headers: headers });
    }
    downloadSalaryGenerationReportByEmployeeID(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/salarySlipPdfGenerate', { params: params, headers: headers });
    }



    getuserMasterId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getEmployeeDetails', { params: params, headers: headers });
    }


    SaveroleMaster(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminAuth/Role-create', createroleMasterData, { headers: headers });
    }

    getroleMaster() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/roleList', { headers: headers });
    }

    getroleMasterId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/roleDetailsById', { params: params, headers: headers });
    }

    UpdateroleMaster(updateroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminAuth/roleUpdate', updateroleMasterData, { headers: headers });
    }

    StatusroleMaster(updatestatusroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminAuth/roleActiveDeactive', updatestatusroleMasterData, { headers: headers });
    }

    SaveDesignationMaster(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'designation/DesignationCreate', createroleMasterData, { headers: headers });
    }

    UpdateDesignationMaster(updateroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'designation/DesignationUpdate', updateroleMasterData, { headers: headers });
    }

    getDesignationMasterId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'designation/DesignationDetailsById', { params: params, headers: headers });
    }

    getDesignationMaster() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'designation/DesignationList', { headers: headers });
    }

    StatusDesignationMaster(updatestatusroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'designation/DesignationActiveDeactive', updatestatusroleMasterData, { headers: headers });
    }

    Savemenu(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminAuth/menuMaster-Save', createroleMasterData, { headers: headers });
    }

    applyForLeave(leaveData: any) {
        // let headers = new HttpHeaders({
        //     'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        // })
        return this.http.post(this.commonService.rootData.rootUrl + 'auth/userWiseLeaveSave', leaveData);
    }

    // technology master api 
    // start
    SaveTechnologyMaster(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/technologySave', createroleMasterData, { headers: headers });
    }
    UpdateTechnologyMaster(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/technologyData-Update', createroleMasterData, { headers: headers });
    }
    getTechnologyMaster() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/technologyDataList', { headers: headers });
    }
    getTechnologyMasterId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/technologyDetailsById', { params: params, headers: headers });
    }
    StatusTechnologyMaster(updatestatusroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/technologyActiveDeactive', updatestatusroleMasterData, { headers: headers });
    }


      // Department master api 
    // start
    SaveDepartmentMaster(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/departmentSave', createroleMasterData, { headers: headers });
    }
    UpdateDepartmentMaster(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/departmentDataUpdate', createroleMasterData, { headers: headers });
    }
    getDepartmentMaster() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/departmentDataList', { headers: headers });
    }
    getDepartmentMasterId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/departmentDetailsById', { params: params, headers: headers });
    }
    StatusDepartmentMaster(updatestatusroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/departmentActiveDeactive', updatestatusroleMasterData, { headers: headers });
    }


    // Document Type master api 
    // start
    SaveDocumentTypeMaster(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/documentTypeMaster-Save', createroleMasterData, { headers: headers });
    }
    UpdateDocumentTypeMaster(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/DocumentTypeMasterData-Update', createroleMasterData, { headers: headers });
    }
    getDocumentTypeMaster() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/documnetList', { headers: headers });
    }
    getDocumentTypeMasterId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/documentTypeDetailsById', { params: params, headers: headers });
    }
    StatusDocumentTypeMaster(updatestatusroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/DocumentactiveDeactive', updatestatusroleMasterData, { headers: headers });
    }


    getWorkFromHomeList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'workFromHome/appliedWorkFromHomeAllList', { params: params, headers: headers });
    }
    workFromHomeStatusUpdate(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'workFromHome/approveWorkFromHome', data, { headers: headers });
    }


    getmenuId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/get-menuInfo-Byid', { params: params, headers: headers });
    }

    getmenu() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/getmenuList', { headers: headers });
    }

    getUserWiseLeaveList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'mobileSide/LeaveListForAdmin', { params: params, headers: headers });
    }
    getLeaveListByEmpLeaveId(Obj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'mobileSide/leaveListByLeaveID', { params: Obj, headers: headers });
    }
    updateLeaveStatus(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'employeeLeave/updateLeaveStatus', data, { headers: headers });
    }

    getPerentList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/get-perentlist', { headers: headers });
    }

    Updatemenu(updatemenuData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminAuth/update-menudetails', updatemenuData, { headers: headers });
    }

    Statusmenu(updatestatusmenuData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminAuth/update-menustatus', updatestatusmenuData, { headers: headers });
    }

    //save role wise menu
    SaverolewiseMenu(rolewisemenuData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminAuth/save-rolewisemenu', rolewisemenuData, { headers: headers });
    }

    SaveuserwiseMenu(userwisemenuData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminAuth/save-userwisemenu', userwisemenuData, { headers: headers });
    }

    getRolewisemenuList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/roleWiseMenuList', { params: params, headers: headers });
    }

    getUserActiveList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/userListroleWise', { params: params, headers: headers });
    }

    getUserwisemenuList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/userWiseMenuList', { params: params, headers: headers });
    }

    getSidemenuList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/get-sidemenulist', { headers: headers });
    }



    // task - list 
    getTaskLists(Data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getWorkReportByEmployeeId', { params: Data, headers: headers });
    }
    getEmployeeLists() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getemployeeListForDropDown', { headers: headers });
    }


    //Setting: Role Master
    getRoleActiveList() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/roleActiveList', { headers: headers });
    }


    //Setting: general-setting

    getsettinggeneralsetting() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminGeneralSetting/get-adminGeneralSettingList', { headers: headers });
    }

    Updatesettinggeneralsetting(UpdategeneralettingData: any) {
        let headers = new HttpHeaders({
            //'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminGeneralSetting/Update-AdminGeneralSetting', UpdategeneralettingData, { headers: headers });
    }

    //general setting

    getgeneralsetting() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'generalSetting/get-generalSettingList', { headers: headers });
    }

    Updategeneralsetting(UpdategeneralettingData: any) {
        let headers = new HttpHeaders({
            //'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'generalSetting/get-generalSettingUpdate', UpdategeneralettingData, { headers: headers });
    }

    // Attendance APIs

    getAttendanceMasterList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getattendanceList', { params, headers: headers });
    }
    getDateWiseAttendanceData(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getAttendanceReportByEmployeeId', { params, headers: headers });
    }
    getMonthWiseAttendanceData(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'attendance/attendanceReport', { params: params, headers: headers });
    }
    getConsolidateReport(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'attendance/consolidateReport', { params: params, headers: headers });
    }
    getTotalLeavebyEmployeeId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'attendance/totalLeaveDescription', { params: params, headers: headers });
    }
    getTotalHoliday(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'attendance/totalHolidayDescription', { params: params, headers: headers });
    }
    getTotalPresentDays(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'attendance/totalPresentDaysDescription', { params: params, headers: headers });
    }
    getDateForAttendanceMasterList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getHeaderForAttendanceList', { params, headers: headers });
    }

    // Manual attendance list
    getpendingManualAttendanceList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        // return this.http.get(this.commonService.rootData.rootUrl + 'attendance/allPenddingManualAttendanceList', { params: date, headers: headers });
        return this.http.get(this.commonService.rootData.rootUrl + 'dayReportMaster/allPenddingManualAttendanceList', { params: params, headers: headers });
    }

    updateAttendanceStatus(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'dayReportMaster/aproveManualAttendance', { params: params, headers: headers });
    }

    getpagePermission(params: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/pagePermission', { params: params, headers: headers });
    }

    getIpAddressList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'ipAddress/IpAddressList', { headers: headers });
    }

    saveIpAddress(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'ipAddress/IpAddressCreate', createroleMasterData, { headers: headers });
    }

    updateIpAddress(updatemenuData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'ipAddress/IpAddressListUpdate', updatemenuData, { headers: headers });
    }

    getIpAddressById(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'ipAddress/IpAddressDetailsById', { params: params, headers: headers });
    }

    statusIpAddress(updatestatusmenuData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'ipAddress/IpAddressActiveDeactive', updatestatusmenuData, { headers: headers });
    }

    //holiday data api calling 
    deleteHoliday(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/holidayDelete', { params: params, headers: headers });
    }

    saveHolidayData(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/addHoliday', data, { headers: headers });
    }

    // interview save and update
    SaveInterview(createuserMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/interviewInfoSave', createuserMasterData, { headers: headers });
    }
    UpdateInterview(updateuserMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/interviewInfoUpdate', updateuserMasterData, { headers: headers });
    }
    StatusInterview(updateuserMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/interviewDetailsActiveDeActive', updateuserMasterData, { headers: headers });
    }
    getInterviewByID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getinterviewListById', { params: documentUploadByID, headers: headers });
    }
    getInterviewDetailsList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getinterviewList', { headers: headers });
    }
    saveInterviewCompanyInfo(updateuserMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/interviewStageUpdate', updateuserMasterData, { headers: headers });
    }

    updateShortLeaveStatus(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'shortLeave/approveShortLeave', data, { headers: headers });
    }
    getShortLeaveListDataAllList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'shortLeave/appliedshortListAllList', { params: params, headers: headers });
    }


    forTokenApiCall() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/assignPersonDetailsByEmpId', { headers: headers });
    }



 SaveCompanyInformation(companyInformationObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'companyDocumentType/companyMasterSave', companyInformationObj, { headers: headers });
  }
  UpdateCompanyInformation(companyInformationObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'companyDocumentType/companyMasterUpdate', companyInformationObj, { headers: headers });
  }
  getCompanyDetailsByIDS(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'companyDocumentType/companyDetailsById', { params: documentUploadByID, headers: headers });
  }
  getCompanyDetailsList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'companyDocumentType/companyMasterList', { headers: headers });
  }
  StatusCompanyMaster(companyMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'companyDocumentType/companyMasterActiveDeActive', companyMasterData, { headers: headers });
  }


  getCountryMasterList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'supplierMaster/countryList', { headers: headers });
  }
  getStateMasterListByCountryID(countryId:any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'supplierMaster/stateListByCountryId', { params: countryId, headers: headers });
  }
  getCityMasterListByStateID(stateId:any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'supplierMaster/cityistByCityId', { params: stateId, headers: headers });
  }


  // document Master
  SavedocumentMaster(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'companyDocumentType/companyDocumentTypeSave', createroleMasterData, { headers: headers });
  }

  getdocumentMaster() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'companyDocumentType/companyDocumentTypeList', { headers: headers });
  }

  getdocumentMasterId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'companyDocumentType/companyDocumentTypeById', { params: params, headers: headers });
  }

  UpdatedocumentMaster(updateroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'companyDocumentType/companyDocumentTypeUpdate', updateroleMasterData, { headers: headers });
  }

  StatusdocumentMaster(updatestatusroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'companyDocumentType/companyDocumentTypeActiveDeActive', updatestatusroleMasterData, { headers: headers });
  }

  // document master
  getDocumentMasterActiveList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'companyDocumentType/activecompanyDocumentTypeList', { headers: headers });
  }
  SavedocumentMasterDetails(saveDocumentMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'companyDocumentMaster/companydocumentMasterSave', saveDocumentMasterData, { headers: headers });
  }
  updateDocumentMasterDetails(updateDocumentMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'companyDocumentMaster/companyDocumentMasterUpdate', updateDocumentMasterData, { headers: headers });
  }
  getDocumentMasterByID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'companyDocumentMaster/companydocumentMasterById', { params: documentUploadByID, headers: headers });
  }
  getDocumentMasterList(companyId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'companyDocumentMaster/companyDocumentMasterBycompanyId', { params: companyId, headers: headers });
  }

  // bank details
  SaveBankDetails(saveDocumentMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'companyBankDetails/companyBankDetailsSave', saveDocumentMasterData, { headers: headers });
  }
  updateBankDetails(updateDocumentMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'companyBankDetails/companybankDetailsUpdate', updateDocumentMasterData, { headers: headers });
  }
  getBankDetailsByID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'companyBankDetails/companyBankDetailsById', { params: documentUploadByID, headers: headers });
  }
  getBankDeleteDetailsByID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'companyBankDetails/deleteCompanyBankDetails', { params: documentUploadByID, headers: headers });
  }
  getBankDetailsList(companyId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'companyBankDetails/companybankDetailsBycompanyId', { params: companyId, headers: headers });
  }


  // template master
  SaveTempleteMaster(createTemplete: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'TemplateMaster/templateMasterSave', createTemplete, { headers: headers });
  }
  getTempleteList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'TemplateMaster/templateList', { headers: headers });
  }
  UpdateTempleteMaster(createTemplete: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'TemplateMaster/templateDetailsUpdate', createTemplete, { headers: headers });
  }
  getTempleteListById(templeteId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'TemplateMaster/templateById', { params: templeteId, headers: headers });
  }


  // generate invoice 
  getCompanyActiveList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/companyActiveDataList', { headers: headers });
  }
  getTempleteActiveList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/templateActiveDataList', { headers: headers });
  }
  getCurrencyActiveList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/currencyActiveDataList', { headers: headers });
  }
  getClientActiveList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/clientActiveDataList', { headers: headers });
  }
  getClientActiveByListByComapany(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'clientMaster/clientListCompanyWise', { params: params, headers: headers });
  }
  getFinancialActiveList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/finacialActiveDataList', { headers: headers });
  }
  SaveCreatedInvoiceData(invoiceInformation: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'BillMaster/billMasterSave', invoiceInformation, { headers: headers });
  }
  UpdateCreatedInvoiceData(invoiceInformation: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'BillMaster/billMasterUpdate', invoiceInformation, { headers: headers });
  }
  getInvoiceMasterList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/billMasterList', { headers: headers });
  }
  getInvoiceMasterListById(invoiceId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/billMasterListById', { params: invoiceId, headers: headers });
  }
  invoiceDetailsPdfAdminSide(downloadInvoiceByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/invoiceDetailsPdfAdminSide', { params: downloadInvoiceByID, headers: headers });
  }


  

  
  // General setting
  SaveGeneralSettingCommonInfo(settingInfo: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/generalSettingInfoSave', settingInfo, { headers: headers });
  }
  getGeneralSettingCommonInfoList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/generalSettingInfoGet', { headers: headers });
  }

  SaveGeneralSettingPdfInfo(settingInfo: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/pdfInfoSave', settingInfo, { headers: headers });
  }
  getGeneralSettingPdfInfoList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
    return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/pdfInfoGet', { headers: headers });
  }
}