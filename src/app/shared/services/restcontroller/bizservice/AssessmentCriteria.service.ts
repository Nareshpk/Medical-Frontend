import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplierregistration001mb } from "../entities/supplierRegistration001mb";


@Injectable()
export class AssessmentCriteriaManager extends BaseService {
    private AssessCriteriaUrl: string = `${environment.apiUrl}/criteria`

    allcriteria(unitslno:number) {
        let data: any={};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.AssessCriteriaUrl}` + "/findAll",data);
    }

   findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.AssessCriteriaUrl}`, data);
    }

    criteriaSave(supplierreg001mb: Supplierregistration001mb) {
        return this.postCallService(`${this.AssessCriteriaUrl}` + "/save", {}, supplierreg001mb);
    }

    criteriaUpdate(supplierreg001mb: Supplierregistration001mb) {
        return this.putCallService(`${this.AssessCriteriaUrl}` + "/update", {}, supplierreg001mb);
    }

    criteriaDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.AssessCriteriaUrl}` + "/delete", data);
    }



    asscrtPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.AssessCriteriaUrl}` + "/pdf",data)
    }
    asscrtExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;        
        return this.getCallService1(`${this.AssessCriteriaUrl}` + "/excel",data)
    }



}