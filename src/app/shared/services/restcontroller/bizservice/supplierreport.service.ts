import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplierreport001wb } from "../entities/supplierreport001wb";



@Injectable()
export class SupplierReportManager extends BaseService {

    private supplierreportUrl: string = `${environment.apiUrl}/supreport`

    allreport() {
        return this.getCallService(`${this.supplierreportUrl}` + "/findAll");
    }

    reportsave(supplierreport001wb: Supplierreport001wb) {
        return this.postCallService(`${this.supplierreportUrl}` + "/save", {}, supplierreport001wb);
    }

    findAllBySupplierId(supreglNo: any,unitslno:number) {
        let data: any = {};
        data['supregslno'] = supreglNo;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.supplierreportUrl}` + "/findAllBySupplierId", data);
    }

    reportupdate(supplierreport001wb: Supplierreport001wb) {
        return this.putCallService(`${this.supplierreportUrl}` + "/update", {}, supplierreport001wb);
    }

    reportdelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.supplierreportUrl}` + "/delete", data);
    }

    supReportPdf(supreglNo: any) {
        let supregslno: any = {};
        supregslno['supregslno'] = supreglNo;
        return this.getCallService1(`${this.supplierreportUrl}` + "/pdf", supregslno)
    }
    supReportExcel(supreglNo: any) {
        let supregslno: any = {};
        supregslno['supregslno'] = supreglNo;
        return this.getCallService1(`${this.supplierreportUrl}` + "/excel", supregslno)
    }
}