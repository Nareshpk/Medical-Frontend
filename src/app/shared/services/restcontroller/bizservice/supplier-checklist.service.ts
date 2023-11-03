import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { SupplierChecklist001mb } from "../entities/supplier-checklist001mb";


@Injectable()
export class SupplierChecklistManager extends BaseService {
    private SupChecklistUrl: string = `${environment.apiUrl}/supchecklist`

    allsupchecklist(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.SupChecklistUrl}` + "/findAll",data);
    }

    findAllbyActivityId(slNo: any){
        let activityslno: any = {};
        activityslno['slNo'] = slNo;
        return this.getCallService(`${this.SupChecklistUrl}` + "/findAllbyActivityId", activityslno);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.SupChecklistUrl}`, data);
    }

    supchecklistSave(supplierChecklist001mb: SupplierChecklist001mb) {
        return this.postCallService(`${this.SupChecklistUrl}` + "/save", {}, supplierChecklist001mb);
    }

    supchecklistUpdate(supplierChecklist001mb: SupplierChecklist001mb) {
        return this.putCallService(`${this.SupChecklistUrl}` + "/update", {}, supplierChecklist001mb);
    }

    supchecklistDelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.SupChecklistUrl}` + "/delete", data);
    }


    suplchecklPdf(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.SupChecklistUrl}` + "/pdf",data)
    }
    suplchecklExcel(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService1(`${this.SupChecklistUrl}` + "/excel",data)
    }


}