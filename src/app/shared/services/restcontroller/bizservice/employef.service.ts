import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Employef001mb } from "../entities/employef001mb";


@Injectable()
export class EmployeFecilityManager extends BaseService {
    private employfUrl: string = `${environment.apiUrl}/employef`

    allemployef(unitslno: any) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.employfUrl}` + "/findAll",data);
    }

    findOne(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.getCallService(`${this.employfUrl}`, data);
    }

    employefsave(employef001mb: Employef001mb) {
        return this.postCallService(`${this.employfUrl}` + "/save", {}, employef001mb);
    }

    employefupdate(employef001mb: Employef001mb) {
        return this.putCallService(`${this.employfUrl}` + "/update", {}, employef001mb);
    }
    
    employefdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.employfUrl}`+"/delete", data);
    }



    empfclPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.employfUrl}` + "/pdf",data)
    }
    empfclExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.employfUrl}` + "/excel",data)
    }

}