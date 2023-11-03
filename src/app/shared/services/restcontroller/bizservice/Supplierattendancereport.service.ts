import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Supplierattendancereport001wb } from "../entities/Supplierattendancereport001wb";



@Injectable()
export class SupplierAttendanceManager extends BaseService {

    private supplierattendanceUrl: string = `${environment.apiUrl}/attendanceReport`

    allattendance() {
        return this.getCallService(`${this.supplierattendanceUrl}` + "/findAll");
    }

    attendancesave(supplierattendancereport001wb: Supplierattendancereport001wb) {
        return this.postCallService(`${this.supplierattendanceUrl}` + "/save", {}, supplierattendancereport001wb);
    }

    findAllBySupplierId(supreglno: any,unitslno:number) {
        let data: any = {};
        data['supregslNo'] = supreglno;
        data['unitslno'] = unitslno;
        return this.getCallService(`${this.supplierattendanceUrl}` + "/findAllBySupplierId", data);
    }

    attendanceupdate(supplierattendancereport001wb: Supplierattendancereport001wb) {
        return this.putCallService(`${this.supplierattendanceUrl}` + "/update", {}, supplierattendancereport001wb);
    }

    attendancedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.supplierattendanceUrl}` + "/delete", data);
    }

    attendancePdf(supreglNo: any) {
        let supregslno: any = {};
        supregslno['supregslno'] = supreglNo;
        return this.getCallService1(`${this.supplierattendanceUrl}` + "/pdf", supregslno)
    }

    attendanceExcel(supreglNo: any) {
        let supregslno: any = {};
        supregslno['supregslno'] = supreglNo;
        return this.getCallService1(`${this.supplierattendanceUrl}` + "/excel", supregslno)
    }
}