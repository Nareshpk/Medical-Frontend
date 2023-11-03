import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Emp001mb } from "../entities/employeedetails.mb";
import { Firstaidwb001 } from "../entities/firstaidmaterials.mb";


@Injectable()
export class FirstaidMaterialsManager extends BaseService {
    private FirstaidUrl: string = `${environment.apiUrl}/firstaidmaterials`

    allfirstaid(unitslno:number) {
        let data: any ={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.FirstaidUrl}` + "/findAll",data);
    }
    findeNotificationAll(unitslno:number) {
        let data: any ={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.FirstaidUrl}` + "/findeNotificationAll",data);
    }
    // findAllByEmployeId(eslNo: any) {
    //     let eslno: any = {};
    //     eslno['eslno'] = eslNo;
    //     console.log("eslNo findall", eslno);
    //     return this.getCallService(`${this.FirstaidUrl}` + "/findAllByEmployeId", eslno);
    // }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.FirstaidUrl}`, data);
    }
    // findAllSlNoAndEcode() {
    //     return this.getCallService(`${this.FirstaidUrl}` + "/findAllSlNoAndEcode");
    // }

    firstaidSave(firstaidwb001: Firstaidwb001) {
        return this.postCallService(`${this.FirstaidUrl}` + "/save", {}, firstaidwb001);
    }

    firstaidUpdate(firstaidwb001: Firstaidwb001) {
        return this.putCallService(`${this.FirstaidUrl}` + "/update", {}, firstaidwb001);
    }
    firstaidDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.FirstaidUrl}` + "/delete", data);
    }





    fstaidplanPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.FirstaidUrl}` + "/pdf",data)
    }
    fstaidplanExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.FirstaidUrl}` + "/excel",data)
    }
}


