import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Emp001mb } from "../entities/employeedetails.mb";
import { Firstaidwb001 } from "../entities/firstaidmaterials.mb";
import { Safetyequwb001 } from "../entities/safetyequipments.mb";


@Injectable()
export class SafetyEquipmentsManager extends BaseService {
    private SafetyUrl: string = `${environment.apiUrl}/safetyequipments`
    
    allsafety(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.SafetyUrl}` + "/findAll",data);
    }
    findNotificationAll() {
        return this.getCallService(`${this.SafetyUrl}` + "/findNotificationAll");
    }
    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.SafetyUrl}`, data);
    }
    // findAllSlNoAndEcode() {
    //     return this.getCallService(`${this.FirstaidUrl}` + "/findAllSlNoAndEcode");
    // }

    safetySave(safetyequwb001 : Safetyequwb001 ) {

        return this.postCallService(`${this.SafetyUrl}` + "/save", {}, safetyequwb001 );
    }
    
    safetyUpdate(safetyequwb001: Safetyequwb001) {
        return this.putCallService(`${this.SafetyUrl}` + "/update", {}, safetyequwb001);
    }

    // firstaidSave(firstaidwb001: Firstaidwb001, selectedFile: any) {
    //     console.log("firstaidwb001",firstaidwb001);
    //     let formData: any = new FormData();
      
    //     // formData.append("slNo", breakdownreg001wb.slNo);
    //     formData.append("fbNo", firstaidwb001.fbNo);
    //     // formData.append("mname", firstaidwb001.mname);
    //     formData.append("app", firstaidwb001.app);
    //     formData.append("loc", firstaidwb001.loc);
       
    //     formData.append("insertUser", firstaidwb001.insertUser);
    //     formData.append("insertDatetime", new Date());
    //     return this.postCallService(`${this.FirstaidUrl}` + "/save", {}, formData).pipe(
    //         catchError(this.errorMgmt)
    //     )
    // }

    // errorMgmt(error: HttpErrorResponse) {
    //     let errorMessage = '';
    //     if (error.error instanceof ErrorEvent) {
    //         errorMessage = error.error.message;
    //     } else {
    //         errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    //     }
    //     return throwError(errorMessage);
    // }

    // firstaidUpdate(firstaidwb001: Firstaidwb001, selectedFile: any) {
    //     let formData: any = new FormData();

    //     formData.append("fbNo", firstaidwb001.fbNo);
    //     // formData.append("mname", firstaidwb001.mname);
    //     formData.append("app", firstaidwb001.app);
    //     formData.append("loc", firstaidwb001.loc);
       
    //     formData.append("insertUser", firstaidwb001.insertUser);
    //     formData.append("insertDatetime", new Date());
    //     console.log("formData", formData);  
    //     return this.putCallService(`${this.FirstaidUrl}` + "/update", {}, formData).pipe(
    //         catchError(this.errorMgmt)
    //     );
    // }


    safetyDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.SafetyUrl}` + "/delete", data);
    }

    saftyeqPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.SafetyUrl}` + "/pdf",data)
    }
    saftyeqExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.SafetyUrl}` + "/excel",data)
    }

    
}