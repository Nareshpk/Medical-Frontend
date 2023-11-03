import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Suppliertrainingplan001wb } from "../entities/suppliertrainingplan001wb";

@Injectable()
export class SupplierTrainingPlanManager extends BaseService {

    private supTrainingPlanUrl: string = `${environment.apiUrl}/suptraining`

    suppTrainingAll() {
        return this.getCallService(`${this.supTrainingPlanUrl}` + "/findAll");
    }

    suppTrainingsave(suppliertrainingplan001wb: Suppliertrainingplan001wb) {
        return this.postCallService(`${this.supTrainingPlanUrl}` + "/save", {}, suppliertrainingplan001wb);
    }

    NotificationAll(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.supTrainingPlanUrl}` + "/NotificationAll",data);
    }

    findAll(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.supTrainingPlanUrl}` + "/findAll", data);
    }

    findAllBySupplierId(supreglNo: any,unitslno:number) {
        let data: any = {};
        data['supregslno'] = supreglNo;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.supTrainingPlanUrl}` + "/findAllBySupplierId", data);
    }



    suppTrainingupdate(suppliertrainingplan001wb: Suppliertrainingplan001wb) {
        return this.putCallService(`${this.supTrainingPlanUrl}` + "/update", {}, suppliertrainingplan001wb);
    }

    suppTrainingdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.supTrainingPlanUrl}` + "/delete", data);
    }

    suppTrainingPlanPdf(supreglNo: any) {
        let supregslno: any = {};
        supregslno['supregslno'] = supreglNo;
        return this.getCallService1(`${this.supTrainingPlanUrl}` + "/pdf", supregslno)
    }
    suppTrainingPlanExcel(supreglNo: any) {
        let supregslno: any = {};
        supregslno['supregslno'] = supreglNo;
        return this.getCallService1(`${this.supTrainingPlanUrl}` + "/excel", supregslno)
    }
}