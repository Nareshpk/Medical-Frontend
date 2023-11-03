import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplieraudit001wb } from "../entities/supplierAudit001mb";




@Injectable()
export class SupplierAuditManager extends BaseService {

    private supplierauditUrl: string = `${environment.apiUrl}/supaudit`

    allaudit() {
        return this.getCallService(`${this.supplierauditUrl}` + "/findAll");
    }

    auditsave(supplierAudit001wb: Supplieraudit001wb) {
        return this.postCallService(`${this.supplierauditUrl}` + "/save", {}, supplierAudit001wb);
    }

    findNotification(unitslno:number) {
        let data: any = {};
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.supplierauditUrl}` + "/findNotification",data);
    }

    findAllBySupplierId(supreglNo: any,unitslno:number) {
        let data: any = {};
        data['supregslno'] = supreglNo;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.supplierauditUrl}` + "/findAllBySupplierId", data);
    }

    auditupdate(supplierAudit001wb: Supplieraudit001wb) {
        return this.putCallService(`${this.supplierauditUrl}` + "/update", {}, supplierAudit001wb);
    }

    auditdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.supplierauditUrl}` + "/delete", data);
    }

    supPlanPdf(supreglNo: any) {
        let supregslno: any = {};
        supregslno['supregslno'] = supreglNo;
        return this.getCallService1(`${this.supplierauditUrl}` + "/pdf", supregslno)
    }
    supPlanExcel(supreglNo: any) {
        let supregslno: any = {};
        supregslno['supregslno'] = supreglNo;
        return this.getCallService1(`${this.supplierauditUrl}` + "/excel", supregslno)
    }
}