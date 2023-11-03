import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Emp001mb } from "../entities/employeedetails.mb";
import {  Fireplan001wb } from "../entities/fireplan.mb";
import { Firstaidwb001 } from "../entities/firstaidmaterials.mb";
import { Safetyequwb001 } from "../entities/safetyequipments.mb";


@Injectable()
export class FirePlanManager extends BaseService {
   
    private FireplanUrl: string = `${environment.apiUrl}/fireplan`
    
    allfireplan(unitslno:number) {
        let data: any ={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.FireplanUrl}` + "/findAll",data);
    }
    findNotificationAll(unitslno:number) {
        let data: any ={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.FireplanUrl}` + "/findNotificationAll",data);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.FireplanUrl}`, data);
    }
   
    fireplanSave(fireplan001wb: Fireplan001wb ) {
     
        return this.postCallService(`${this.FireplanUrl}` + "/save", {}, fireplan001wb );
    }
    
    fireplanUpdate(fireplan001wb: Fireplan001wb) {
        return this.putCallService(`${this.FireplanUrl}` + "/update", {}, fireplan001wb);
    }

    fireplanDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.FireplanUrl}` + "/delete", data);
    }

    fireplPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.FireplanUrl}` + "/pdf",data)
    }
    fireplExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.FireplanUrl}` + "/excel",data)
    }

}

