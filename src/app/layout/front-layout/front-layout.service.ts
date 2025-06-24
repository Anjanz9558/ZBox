import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from '../../shared/common.service';

@Injectable({
    providedIn: 'root'
})
export class FrontLayoutService {

    environment: any;
    constructor(private commonService: CommonService, private http: HttpClient) { }

 loginwithPin(pinDataObj: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/loginWithPIN', pinDataObj);
  }
  otpSendInEmail(pinDataObj: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/forgotPinEmailVerification', pinDataObj);
  }
  otpVerificationWithEmployeeId(pinDataObj: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/forgotPinOTPVerification', pinDataObj);
  }
  resetPinByEmployeeId(pinDataObj: any) {
    return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/passwordResetForUser', pinDataObj);
  }
//   activeIpAddressList() {
//     return this.http.get(this.commonService.rootData.rootUrl + 'ipAddress/ActiveIpAddressList');
//   }

//   getIPAddress() {
//     return this.http.get('https://api.ipify.org/?format=json');
//   }
    getIPAddress() {
        return this.http.get('https://api.bigdatacloud.net/data/client-ip');
    }
    activeIpAddressList() {
        return this.http.get(this.commonService.rootData.rootUrl + 'ipAddress/ActiveIpAddressList');
    }
    //milestone
    SaveMilestoneMaster(mileStoneDataObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'assignTask/addMilestone', mileStoneDataObj, { headers: headers });
    }
    UpdateMilestoneMaster(mileStoneDataObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'assignTask/updateMilestone', mileStoneDataObj, { headers: headers });
    }
    saveAssignTask(taskObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'assignTask/addAssignTask', taskObj, { headers: headers });
    }
    saveAssignEmployeeForTask(taskObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'assignTask/addAssignTaskEmpInfo', taskObj, { headers: headers });
    }
    deleteAssignEmployeeForTask(taskObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'assignTask/deleteAssignTaskEmp', taskObj, { headers: headers });
    }
    taskCloseByTaskID(taskObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'assignTask/taskClosedTaskId', taskObj, { headers: headers });
    }
    updateAssignTask(taskObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'assignTask/updateAssignTaskEmp', taskObj, { headers: headers });
    }
    updateTaskReportStatus(taskObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'assignTask/updateEmpTaskStatus', taskObj, { headers: headers });
    }
    updateAssignTaskData(taskObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'assignTask/updateAssignTask', taskObj, { headers: headers });
    }
    getTaskBoardListApi() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/listAssignTaskByEstimatedDate', { headers: headers });
    }
    taskAssignDetailsById(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/listEmpTaskDetails', { params: params, headers: headers });
    }
    getEmployeeTaskAssign(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/employeeWisetaskList', { params: params, headers: headers });
    }
    getTaskDetailsByTaskId(projectId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/listAssignTaskById', { params: projectId, headers: headers });
    }
    getTaskListByProjectIdEmpId(projectId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/listAssignTaskProjectAndEmpWise', { params: projectId, headers: headers });
    }
    getmilestoneById(projectId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/activeMilestoneListByProjectId', { params: projectId, headers: headers });
    }
    getmilestoneObjByMilestoneId(milestoneId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/milestonegetById', { params: milestoneId, headers: headers });
    }
    deletemilestoneObjByMilestoneId(milestoneId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/deleteMilestone', { params: milestoneId, headers: headers });
    }
    deleteTaskObjByTaskId(milestoneId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/deleteAssignTask', { params: milestoneId, headers: headers });
    }
    getParentTaskByMilestoneId(milestoneId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/parentTaskList', { params: milestoneId, headers: headers });
    }
    getAssignempListByProjectId(projectId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'projectMaster/assignTeamListByProjectId', { params: projectId, headers: headers });
    }
    getMilestoneTaskListData(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/taskListByProject', { params: params, headers: headers });
    }
    //ticket api list
    saveTicket(ticketObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'ticket/createTicket', ticketObj, { headers: headers });
    }
    addAssignEmployee(ticketObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'ticket/assignEmpToTicket', ticketObj, { headers: headers });
    }
    removeAssignEmployee(ticketObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'ticket/removeEmpFromTicket', ticketObj, { headers: headers });
    }
    getTicketList(ticketObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'ticket/listTicket', { params: ticketObj, headers: headers });
    }
    getTicketDataById(ticketObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'ticket/getTicketById', { params: ticketObj, headers: headers });
    }
    updateTicketStatus(taskObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'ticket/updateTicketStatus', taskObj, { headers: headers });
    }



    // dashboard api list
    getHolidayListDataEmp(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeDashboard/Listholidays', { params: params, headers: headers });
    }

    getBirthdayListDataEmp() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeDashboard/Listbirthdays', { headers: headers });
    }

    getLeaveListDataEmp(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeDashboard/LeaveMonthWise', { params: params, headers: headers });
    }
    getAssignListDataEmp() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeDashboard/AssignDetail', { headers: headers });
    }

    getAllEmpLeaveWFH() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeDashboard/allLeaveWFHdata', { headers: headers });
    }

    getEmployeeTaskReportListByTaskId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/taskReportListForAssignTask', { params: params, headers: headers });
    }

    getAdminUser() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/isAdminOrNot', { headers: headers });
    }

    updateTaskReportData(dayreportDataObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/updateWorkReport', dayreportDataObj, { headers: headers });
    }
    SaveDayReportMaster(dayreportDataObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'dayReportMaster/addDayReport', dayreportDataObj, { headers: headers });
    }
    manuallyBreakAdd(dayreportDataObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/menualBreakManagement', dayreportDataObj, { headers: headers });
    }
    SaveManualAttendance(dayreportDataObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'dayReportMaster/addPenddingAttendance', dayreportDataObj, { headers: headers });
    }
    updateAttendanceStatus(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'dayReportMaster/aproveManualAttendance', { params: params, headers: headers });
    }
    previousDayCheckout(ipObj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'dayReportMaster/previousCheckOut', ipObj, { headers: headers });
    }

    getSummaryReportList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'dayReportMaster/getAttendanceListSummaryReport', { params: params, headers: headers });
    }
    getDailyReportList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'dayReportMaster/dateWiseAttendanceList', { params: params, headers: headers });
    }

    getProjectList(empId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'projectMaster/getProjectListByEmpId', { params: empId, headers: headers });
    }
    getProjectForTaskAssingList(empId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'assignTask/getProjectListByEmpId', { params: empId, headers: headers });
    }
    getProjectListActive() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'projectMaster/ProjectMasterDataList', { headers: headers });
    }

    downloadExcelTaskReport(downloadExcel: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getMonthviseWorkReportByEmployeeId', { params: downloadExcel, headers: headers });
    }

    downloadExcelTaskReportForAll(downloadExcel: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getMonthviseWorkReportByAssignPersonId', { params: downloadExcel, headers: headers });
    }

    downloadExcelTaskReportByDate(downloadExcel: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/assignPersonTaskReportDownload', { params: downloadExcel, headers: headers });
    }
    taskReport(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/saveWorkReport', createroleMasterData, { headers: headers });
    }
    deleteTaskReport(deleteTaskId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/workreportdeletebyID', { params: deleteTaskId, headers: headers });
    }

    workReport(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/workReport', { params: params, headers: headers });
    }
    getEmpWorkReportList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'projectMaster/assignPersontaskListEmpWise', "", { params: params, headers: headers });
    }

    saveTaskReport(createroleMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/saveNewWorkReport', createroleMasterData, { headers: headers });
    }

    workReportNew(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/GetAllAssinedPersonWorkReport', { params: params, headers: headers });
    }

    // workReportById(params: any) {
    //   let LoginUserData = JSON.parse(localStorage.getItem("LoginUserData"));
    //   let headers = new HttpHeaders({
    //     'Authorization': `Bearer ${LoginUserData.myToken}`
    //   })
    //   return this.http.get(this.commonService.rootData.rootUrl + 'mobileSide/workReport', { params: params, headers: headers });
    // }

    getInterviewListByAssignId(obj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/assignIdwiseInterviewDetails', { params: obj, headers: headers });
    }
    getInterviewByID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getinterviewListById', { params: documentUploadByID, headers: headers });
    }
    saveInterviewStageInfo(updateuserMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/interviewStageUpdate', updateuserMasterData, { headers: headers });
    }

    workReportById(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/GetWorkReportByEmpId', { params: documentUploadByID, headers: headers });
    }

    getCurrentUserActiveList(obj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/userCurrentStatus', { params: obj, headers: headers });
    }
    assignPersonListForTask() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/assignPersonDetailsByEmpId', { headers: headers });
    }
    pendingDataCount() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeDashboard/getPendingCountList', { headers: headers });
    }


    getManualAttendanceList(id: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'dayReportMaster/penddingManualAttendanceList', { params: id, headers: headers });
    }
    getTimeByStatus(obj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/getTimeByStatus', obj, { headers: headers });
    }
    updateStatusWiseTime(obj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/updateDayReportTimeById', obj, { headers: headers });
    }
    deleteBreakData(obj: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'adminSide/deleteBreak', obj, { headers: headers });
    }

    getHolidayList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/holidayList', { headers: headers });
    }

    // leave management api calling
    getLeaveCount(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeLeave/empLeaveCountYearWise', { params: data, headers: headers });
    }
    getLeaveTypeFromDateToDateWiseLeaveCount(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'employeeLeave/leaveCountFromDateToDate', { params: data, headers: headers });
    }
    getLeaveTypeList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'mobileSide/LeaveTypeList', { headers: headers });
    }
    getLeaveListByLeaveID(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'mobileSide/leaveListByLeaveID', { params: params, headers: headers });
    }
    getLeaveListByLeaveIDForEmpAssign(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/leaveListByLeaveIDForAssignPerson', { params: params, headers: headers });
    }
    getLeaveListByUserWise() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'mobileSide/userWiseLeaveList', { headers: headers });
    }
    saveLeaveDateWise(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'mobileSide/userWiseLeaveSave', data, { headers: headers });
    }
    updateLeaveCountData(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'employeeLeave/updateLeaveCount', data, { headers: headers });
    }
    updateLeaveStatus(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'employeeLeave/updateLeaveStatus', data, { headers: headers });
    }
    getMonthWiseLeaveAssignPersonList(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/assignPersonLeaveListEmpWise', { params: data, headers: headers });
    }


    // forTokenApiCall() {
    //   let LoginUserData = JSON.parse(localStorage.getItem("LoginUserData"));
    //   let token = LoginUserData?.myToken ? LoginUserData?.myToken : null
    //   let headers = new HttpHeaders({
    //     'Authorization': `Bearer ${token}`
    //   })
    //   return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/assignPersonDetailsByEmpId', { headers: headers });
    // }


    saveWorkFromHome(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'workFromHome/workFromHomeApply', data, { headers: headers });
    }
    getWFhList(id: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'workFromHome/appliedWorkFromHomeListByEmployeeId', { params: id, headers: headers });
    }
    updateWFHStatus(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'workFromHome/approveWorkFromHome', data, { headers: headers });
    }

    // short leave api
    saveShortLeave(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'shortLeave/shortLeaveApply', data, { headers: headers });
    }
    getShortLeaveList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'shortLeave/appliedShortLeaveListByEmployeeId', { headers: headers });
    }
    getShortLeaveListDataByAssingPerson(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'shortLeave/assignPersonshortLeaveListEmpWise', { params: params, headers: headers });
    }
    updateShortLeaveStatus(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'shortLeave/approveShortLeave', data, { headers: headers });
    }

    // leave approve of user
    leaveApproveFromAssignPerson(updateuserMasterData: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'employeeLeave/updateLeaveStatus', updateuserMasterData, { headers: headers });
    }

    // my profile api
    getpagePermission(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/pagePermission', { params: params, headers: headers });
    }
    getuserMasterId(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getEmployeeDetails', { params: params, headers: headers });
    }
    getRoleList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminAuth/activeRoleList', { headers: headers });
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


    // basic information 
    getuserMaster() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/getEmpInfoList', { headers: headers });
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
    getDocumentUploadList(employeeId: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/documentDetailsList', { params: employeeId, headers: headers });
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





    // company information save and update
    getCompanyDetailsByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'adminSide/companyDetailsEmpId', { params: documentUploadByID, headers: headers });
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

    getBankDetailsByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'bankDetails/bankDetailsById', { params: documentUploadByID, headers: headers });
    }

    // Salary details save and update

    getSalaryDetailsByEmployeeID(documentUploadByID: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'salaryDetails/SalaryDetailsById', { params: documentUploadByID, headers: headers });
    }




    getCompanyActiveList() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'BillMaster/companyActiveDataList', { headers: headers });
    }

    getWorkFromHomeList(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'workFromHome/assignPersonWorkFromHomeListEmpWise', { params: params, headers: headers });
    }

    workFromHomeStatusUpdate(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'workFromHome/approveWorkFromHome', data, { headers: headers });
    }


    //comment api calling
    getMessageListData(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'ticketComment/listCommentByticketId', { params: data, headers: headers });
    }
    mediaUpload(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'ticketComment/mediaMasterSave', data, { headers: headers });
    }
    mediaUploadedFileDelete(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'ticketComment/mediaMasterDelete', data, { headers: headers });
    }

    // notification api
    getNotification(data: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'notification/getNotification', { params: data, headers: headers });
    }
    isViewNotification() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'notification/viewedNotifications', { headers: headers });
    }
    isReadNotification(params: any) {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.post(this.commonService.rootData.rootUrl + 'notification/readNotification', params, { headers: headers });
    }

    startAllEmpBreak() {
        let myToken = localStorage.getItem("myToken")
        let headers = new HttpHeaders({
            'Authorization': `Bearer ${myToken}`
        })
        return this.http.get(this.commonService.rootData.rootUrl + 'dayReportMaster/startAllEmployeeLunchBreak', { headers: headers });
    }
}