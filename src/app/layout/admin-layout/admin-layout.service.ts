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
    return this.http.post(this.commonService.rootData.rootUrl + 'admin/login', loginCred);
  }

  adminAPIStructre(loginCred: any) {
    let myToken = localStorage.getItem("myToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    })
    return this.http.post(this.commonService.rootData.rootUrl + 'admin/login', loginCred, { headers: headers });
  }

  // =====================================================================================================================================================================
  // -----------------------------------------------------------------------| Languages Page APIs |-----------------------------------------------------------------------
  // =====================================================================================================================================================================

  getAllLanguages(language: any) {
    let myToken = localStorage.getItem("myToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    })
    return this.http.get(this.commonService.rootData.rootUrl + 'admin/language/getAllLanguages', { params: language, headers: headers });
  }

  getAllResources(languageId: any) {
    let myToken = localStorage.getItem("myToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    })
    return this.http.get(this.commonService.rootData.rootUrl + 'admin/resource/getResources', { params: languageId, headers: headers });
  }

  getLanguageDetailsById(languageId: any) {
    let myToken = localStorage.getItem("myToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    })
    return this.http.get(this.commonService.rootData.rootUrl + 'admin/language/getLanguageById/' + languageId, { headers: headers });
  }

  createNewLanguage(resourceObj: any) {
    let myToken = localStorage.getItem("myToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    })
    return this.http.post(this.commonService.rootData.rootUrl + 'admin/language/addLanguage', resourceObj, { headers: headers });
  }

  createNewResource(resourceObj: any) {
    let myToken = localStorage.getItem("myToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    })
    return this.http.post(this.commonService.rootData.rootUrl + 'admin/resource/addResource', resourceObj, { headers: headers });
  }

  updateLanguage(resourceObj: any) {
    let myToken = localStorage.getItem("myToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    })
    return this.http.post(this.commonService.rootData.rootUrl + 'admin/language/updateLanguage', resourceObj, { headers: headers });
  }


  LanguageActiveDeActive(resourceObj: any) {
    let myToken = localStorage.getItem("myToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    })
    return this.http.post(this.commonService.rootData.rootUrl + 'admin/language/LanguageActiveDeActive', resourceObj, { headers: headers });
  }

  updateResource(resourceObj: any) {
    let myToken = localStorage.getItem("myToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    })
    return this.http.post(this.commonService.rootData.rootUrl + 'admin/resource/updateResource', resourceObj, { headers: headers });
  }


  resourceActiveDeActive(resourceData: any) {
    let myToken = localStorage.getItem("myToken")
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${myToken}`
    })
    return this.http.post<any>(
      this.commonService.rootData.rootUrl + 'admin/resource/ResourceActiveDeActive', resourceData, { headers });
  }
}